import { createWalletClient, formatEther, http, parseEther, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { klaytnBaobab } from 'viem/chains'
 
const account = privateKeyToAccount('0x690c4020ae2e0fa1a3ba28f5bf8bb3f42ab1f8550cd58534b0f2751b1ce1b366')
const httpUrl = "https://public-en-kairos.node.kaia.io" 
const client = createWalletClient({ 
  account,
  chain: klaytnBaobab,
  transport: http(httpUrl)
}).extend(publicActions) // [!code ++]

const abi =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

async function readFromContract() {
    async function getBlockNumber() {
        const blockNumber = await client.getBlockNumber();
        console.log('Current block number:', blockNumber.toString());
    }
    
    async function getKlaytnBalance() {
        const balance = await client.getBalance({
            address: "0x3d0e6f2946dc77dc36e3bb9803255025783393d5",
        });
        const formattedBalance = formatEther(balance);
        console.log('Current balance:', formattedBalance, balance);
    }
    const retrieve = await client.readContract({
        abi,
        address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",
        functionName: "retrieve",
    });
    await getBlockNumber()
    await getKlaytnBalance()
    console.log('Retrieve:', retrieve);
}

async function writeToContract() {
    const abi =  [
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]


    const retrieve = await client.readContract({
        abi,
        address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",
        functionName: "retrieve",
    });
    console.log('Retrieve:', retrieve);
    
    // @ts-ignore
    const[account] = await window.ethereum.request({method: "eth_requestAccounts"})
    const {request} = await client.simulateContract({
        abi,
        address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",
        functionName: "store",
        account: account,
        args: [694n],
    });
    const hash = await client.writeContract(request as any)
    console.log('Write to contract:', hash, request);
}

async function sendKlayToReceiver() {
    const account = privateKeyToAccount("0x690c4020ae2e0fa1a3ba28f5bf8bb3f42ab1f8550cd58534b0f2751b1ce1b366");
    const hash = await client.sendTransaction({
        account: account,
        to: "0xc2ffc5e2638659721269d7351606a263bdd61e79",
        value: parseEther("0.1"),
    });
    console.log('Send transaction hash:', hash, account);
}

// readFromContract()
// writeToContract()
sendKlayToReceiver()