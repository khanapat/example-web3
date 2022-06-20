import React from 'react';
import logo from './logo.svg';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "./components/wallet/connector";
import { ethers } from "ethers";
import TestContract from "./artifacts/Test/Test.json";

import './App.css';

function App() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React<ethers.providers.Web3Provider>();

  const connect = async () => {
    try {
      await activate(injected, async (error: Error) => {
        console.log(error);
        if (error instanceof UnsupportedChainIdError) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  const sendTxn = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(TestContract.address, TestContract.abi, provider);

      const signer = provider.getSigner();
      const tx: ethers.providers.TransactionResponse = await contract.connect(signer).setA(999);
      await tx.wait(1);
    }
  };

  return (
    <div className="App">
      <button onClick={connect}>Connect to MetaMask</button>
      <button onClick={sendTxn}>Set A</button>
    </div>
  );
};


export default App;
