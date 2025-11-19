import { formatEther } from "viem"
import { client } from "./client";

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
    

getBlockNumber();
getKlaytnBalance();