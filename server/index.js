const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

//Left this for dev stage only! 
// 1
//Private key: 4107a0a4d4f4ebf07b48b96c7dd5b2b800e50a89db20c0113605caccbbef9579
//Public key: d9892ab134b153e118293846a6235ceb0cb56544
//signature: 3045022100929fff653b04841f6109831d138ad4f826ece7415605561ec9c60bbd2f1d68e302203208f22385cb6765cc71471c2433d30c4faa1f897f57b23da23124471a51af010

//2
//Private key: 3d3d58989701db1434ff7940b7fb773361ee191705216ad42a9aa1253bea5096
//Public key: 838ddcd7fbdfecd9007f9d898dec303c953914e6

//3
//Private key: b7e52b491a295384da2f2583ec61770c17791682b6ef7147e66fd031bdb17cce
//Public key: 72995c2924400b1799d90a2e8abe10b43af8bef8

const balances = {
  "d9892ab134b153e118293846a6235ceb0cb56544": 100,
  "838ddcd7fbdfecd9007f9d898dec303c953914e6": 50,
  "72995c2924400b1799d90a2e8abe10b43af8bef8": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
