import { useState } from "react";
import server from "./server";
import { hashMsg } from "./crypt"

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);



  async function transfer(signature) {
    const {
      data: { balance },
    } = await server.post(`send`, {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
      signature,
    });
    setBalance(balance);
    alert("Funds transferred successfully!")
  }

  async function getSig(evt){
    evt.preventDefault();

    try {
      let data = {
        recipient,
        amount: parseInt(sendAmount)
      }
      let msgHex = await hashMsg(JSON.stringify(data))
      let sig = prompt(`Copy signature from the cli (run the sendMaeeage)`)
      if (sig === null){
        alert("No signature was provided!")
        return
      }
      await transfer(sig)
    } catch (ex) {
      alert(ex.response.data.message);
    }

  }

  return (
    <form className="container transfer" onSubmit={getSig}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
