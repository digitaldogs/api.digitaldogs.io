const settings = require("../settings.json");
const dogContract = require("../build/contracts/DogERC721Metadata.json");

const Eth = require("ethjs");
const Abi = require("ethjs-abi");
const Sign = require("ethjs-signer").sign;
const HdKey = require("ethereumjs-wallet/hdkey");

const node = settings.Ethereum.Node;
const contractAddress = settings.Ethereum.ContractAddress;

const add_abi = {
  constant: false,
  inputs: [
    {
      name: "name",
      type: "string"
    },
    {
      name: "dob",
      type: "uint256"
    },
    {
      name: "microchip",
      type: "string"
    },
    {
      name: "sex",
      type: "uint8"
    },
    {
      name: "dam",
      type: "uint256"
    },
    {
      name: "sire",
      type: "uint256"
    },
    {
      name: "owner",
      type: "address"
    }
  ],
  name: "add",
  outputs: [],
  payable: true,
  stateMutability: "payable",
  type: "function"
};

const dog = id => {
  return new Promise((resolve, reject) => {

    const key = process.env.INFURA_KEY;

    //const eth = new Eth(new Eth.HttpProvider(node));
    const eth = new Eth(
      new Eth.HttpProvider(
        "https://mainnet.infura.io/v3/" + key
      )
    );
    const contract = eth
      .contract(dogContract.abi)
      .at("0x4390282c7d623edee9aacb971303077aba2d5e14");

    resolve(contract.pack(id));
  });
};

const count = async () => {
  const key = process.env.INFURA_KEY;
  const eth = new Eth(new Eth.HttpProvider(node + key));
  const contract = eth.contract(dogContract.abi).at(contractAddress);
  const totalSupply = await contract.totalSupply();

  return totalSupply;
};

module.exports = { count };