import { createPublicClient, http } from 'viem'
import { kaia } from 'viem/chains'

// Kaia 公共 client，用于只读请求（例如获取区块号、读合约等）
// 默认使用环境中的 RPC，如果你有自己的 Kaia RPC，可以替换为 http('https://your-kaia-rpc')
export const kaiaClient = createPublicClient({
  chain: kaia,
  transport: http(),
})
