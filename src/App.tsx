import React, { useState } from 'react';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { klaytnBaobab } from 'viem/chains';

const abi = [
  {
    inputs: [],
    name: 'retrieve',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'num', type: 'uint256' }],
    name: 'store',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

const contractAddress = '0x472a1226796b6a0918DC78d40b87d750881fdbDC' as const;



const httpUrl = 'https://public-en-kairos.node.kaia.io';

const publicClient = createPublicClient({
  chain: klaytnBaobab,
  transport: http(httpUrl),
});

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [storedValue, setStoredValue] = useState<bigint | null>(null);
  const [pending, setPending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setError(null);
      if (!window.ethereum) {
        setError('No injected wallet found. Please install MetaMask or Kaia wallet.');
        return;
      }
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (e: any) {
      setError(e?.message ?? String(e));
    }
  };

  const readFromContract = async () => {
    try {
      setError(null);
      setPending(true);
      const value = (await publicClient.readContract({
        abi,
        address: contractAddress,
        functionName: 'retrieve',
      })) as bigint;
      setStoredValue(value);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setPending(false);
    }
  };

  const writeToContract = async () => {
    try {
      setError(null);
      setTxHash(null);
      if (!window.ethereum) {
        setError('No injected wallet found. Please install MetaMask or Kaia wallet.');
        return;
      }
      if (!account) {
        setError('Please connect wallet first.');
        return;
      }
      setPending(true);

      const walletClient = createWalletClient({
        chain: klaytnBaobab,
        account,
        transport: custom(window.ethereum),
      });

      const hash = await walletClient.writeContract({
        abi,
        address: contractAddress,
        functionName: 'store',
        args: [BigInt(694)],
      });

      setTxHash(hash);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <h1>Kaia + viem Browser Demo</h1>
      <p>Chain: klaytnBaobab (Kairos testnet)</p>

      <div style={{ marginBottom: 16 }}>
        <button onClick={connectWallet} style={{ padding: '8px 16px', marginRight: 8 }}>
          {account ? 'Reconnect Wallet' : 'Connect Wallet'}
        </button>
        {account && <span>Connected: {account}</span>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={readFromContract} disabled={pending} style={{ padding: '8px 16px', marginRight: 8 }}>
          Read retrieve()
        </button>
        {storedValue !== null && <span>Stored value: {storedValue.toString()}</span>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={writeToContract} disabled={pending} style={{ padding: '8px 16px' }}>
          Write store(694)
        </button>
      </div>

      {pending && <p>Pending...</p>}
      {txHash && (
        <p>
          Tx Hash: <code>{txHash}</code>
        </p>
      )}
      {error && (
        <p style={{ color: 'red' }}>
          Error: {error}
        </p>
      )}
    </div>
  );
}

export default App;
