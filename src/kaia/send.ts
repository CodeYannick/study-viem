import { parseEther } from "viem"
import {walletClient} from "./client";
import { privateKeyToAccount } from "viem/accounts"

async function sendKlayToReceiver() {
    const account = privateKeyToAccount("0x690c4020ae2e0fa1a3ba28f5bf8bb3f42ab1f8550cd58534b0f2751b1ce1b366");
    const hash = await walletClient.sendTransaction({
        account: account,
        to: "0xc2ffc5e2638659721269d7351606a263bdd61e79",
        value: parseEther("0.1"),
    });
    console.log('Send transaction hash:', hash, account);
}

sendKlayToReceiver()

