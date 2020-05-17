const express = require("express");
const router = new express.Router();

//const { count } = require("../routes/dogs.js");

const settings = require("../settings.json");
const dogContract = require("../build/contracts/DogERC721Metadata.json");

const Eth = require("ethjs");
const Abi = require("ethjs-abi");
const Sign = require("ethjs-signer").sign;
const HdKey = require("ethereumjs-wallet/hdkey");

const node = settings.Ethereum.Node;
const contractAddress = settings.Ethereum.ContractAddress;

const fs = require("fs");

const pack_abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pack",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "dob",
        "type": "uint256"
      },
      {
        "name": "microchip",
        "type": "string"
      },
      {
        "name": "dam",
        "type": "uint256"
      },
      {
        "name": "sire",
        "type": "uint256"
      },
      {
        "name": "sex",
        "type": "uint8"
      },
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

const add_abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pack",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "dob",
        "type": "uint256"
      },
      {
        "name": "microchip",
        "type": "string"
      },
      {
        "name": "dam",
        "type": "uint256"
      },
      {
        "name": "sire",
        "type": "uint256"
      },
      {
        "name": "sex",
        "type": "uint8"
      },
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];


const tokenABI = [{
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs":[{"name": "","type": "uint256"}],
  "payable": false,
  "type": "function",
}];


router.get("/", (req, res) => {
  res.send("All dogs for user");
});

router.get("/count", (req, res) => {

  //const count = async () => {
  const key = process.env.INFURA_KEY;

  const dogERC721 = fs.readFileSync("/build/contracts/DogERC721.json");

  //const eth = new Eth(new Eth.HttpProvider(node + key));
  const eth = new Eth(new Eth.HttpProvider("https://mainnet.infura.io/v3/eaf5e0b4a01042a48211762c8d4eec44"));
  const contract = eth.contract(dogERC721.Abi).at("0x4390282c7d623edee9aacb971303077aba2d5e14");
  
  contract.totalSupply().then((totalSupply) => {
    res.send(totalSupply);
  });
});

router.get("/pack/:id", (req, res) => {

  const key = process.env.INFURA_KEY;

  //const eth = new Eth(new Eth.HttpProvider(node + key));
  const eth = new Eth(new Eth.HttpProvider("https://mainnet.infura.io/v3/eaf5e0b4a01042a48211762c8d4eec44"));
  const contract = eth.contract(pack_abi).at("0x4390282c7d623edee9aacb971303077aba2d5e14");
  
  contract.pack(req.params.id).then((pack) => {
    res.send(pack);
  });
});

router.get("/:id", (req, res) => {
  const key = process.env.INFURA_KEY;
  console.log(key);

  //const eth = new Eth(new Eth.HttpProvider(node + key));
  const eth = new Eth(new Eth.HttpProvider("https://mainnet.infura.io/v3/" + key));
  const contract = eth.contract(pack_abi).at("0x4390282c7d623edee9aacb971303077aba2d5e14");
  
  contract.pack(req.params.id).then((pup) => {
    res.send(pup);
  });
});

router.post("/", (req, res) => {
  res.status(200).send(JSON.stringify({ tokenID: "abcd1234" }));
});

router.put("/:id", (req, res) => {
  res.send("Transfer dog");
});

module.exports = router;
