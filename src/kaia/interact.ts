import { privateKeyToAccount } from "viem/accounts"
import { client, getLocalWalletClient, walletClient } from "./client";
import { WriteContractParameters } from "viem"

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
    const retrieve = await client.readContract({
        abi,
        address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",
        functionName: "retrieve",
    });
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

    // const account = privateKeyToAccount("0x690c4020ae2e0fa1a3ba28f5bf8bb3f42ab1f8550cd58534b0f2751b1ce1b366");
    // @ts-ignore
    const[account] = await window.ethereum.request({method: "eth_requestAccounts"})
    const {request} = await client.simulateContract({
        abi,
        address: "0x472a1226796b6a0918DC78d40b87d750881fdbDC",
        functionName: "store",
        account: account,
        args: [694n],
    });
    const walletClient = await getLocalWalletClient()
    const hash = await walletClient.writeContract(request as WriteContractParameters)
    console.log('Write to contract:', hash, request);
}

writeToContract()