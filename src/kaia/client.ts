import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { klaytnBaobab } from 'viem/chains'
 
const httpUrl = "https://public-en-kairos.node.kaia.io"
export const client = createPublicClient({ 
  chain: klaytnBaobab, 
  transport: http(httpUrl), 
})

export const walletClient = createWalletClient({
  chain: klaytnBaobab,
  transport: http(httpUrl),
})

declare global {
    interface Window {
        ethereum: any;
    }
}

export const getLocalWalletClient = async () => {
    const [account] = await window.ethereum.request({method: "eth_requestAccounts"})
    console.log("Local wallet client:", window.ethereum, custom(window.ethereum))
    return createWalletClient({
        chain: klaytnBaobab,
        account: account,
        transport: custom(window.ethereum),
    })
  }
    
