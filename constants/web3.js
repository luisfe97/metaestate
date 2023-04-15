import Web3 from "web3";
import { useEffect } from "react";
import MiNFT from "../contracts/MiNFT.json";
let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const contractAddress = "0xc29EA5C64Dad7cf6bCc6F6BBd807bAAcFdFab4b9";
const contractAbi = MiNFT.abi;
const miNFT = new web3.eth.Contract(contractAbi, contractAddress);

async function connectWallet() {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function mintNFT(name, description, imageURI) {
  const accounts = await web3.eth.getAccounts();
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  const gasLimit = 5000000;
  const value = web3.utils.toWei("0.1", "ether");
  const result = await miNFT.methods.mint(name, description, imageURI).send({ from: accounts[0], gasPrice, gasLimit, value });
  return result;
}

async function getwalletTokens (){
  const accounts = await web3.eth.getAccounts();
  const result = await miNFT.methods.getWalletTokens(accounts[0]).call();
  return result
}

async function getTokenMeta (_tokenId){
  const result = await miNFT.methods.getTokenMetadata(_tokenId).call();
  return result
}
export { connectWallet, mintNFT, getwalletTokens, getTokenMeta  };
