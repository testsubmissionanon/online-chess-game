import React, { useState } from 'react';
import { connectWallet } from '../../../utils/interact.js'

export default function ConnectButton() {
  const [buttonText, setButtonText] = useState('Connect Wallet');
  const [userAddress, setUserAddress] = useState('');

  const handleConnectClick = async () => {
    const { address, status } = await connectWallet();

    // No wallet detected (No MetaMask or other Web3 wallet)
    if (JSON.stringify(status).includes("You must install Metamask")) {
      alert("Please install MetaMask (or another Web3 wallet).");
      return;
    }

    // User connected to wrong network
    if (status.includes("Connect your wallet account to the site.") || status.includes("wallet_switchEthereumChain")) {
      alert("Please switch network to BSC Testnet.");
      return;
    }

    // Successful connection, update button text
    if (address) {
      setUserAddress(address);
      setButtonText(`Address: ${address}`);
    } else {
      alert("Unable to connect to the wallet.");
    }
  };

  return (
      <button
          onClick={handleConnectClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000,
          }}
      >
        {buttonText}
      </button>
  );
}