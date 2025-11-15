import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// 创建公共客户端连接到以太坊主网
const client = createPublicClient({
  chain: mainnet,
  transport: http(), // 使用默认的公共 RPC 节点
})

async function main() {
  try {
    console.log('🔗 连接到以太坊主网...')
    
    // 获取当前区块号
    const blockNumber = await client.getBlockNumber()
    console.log('📦 当前区块号:', blockNumber.toString())
    
    // 获取最新区块信息
    const block = await client.getBlock({ blockNumber })
    console.log('⏰ 区块时间:', new Date(Number(block.timestamp) * 1000).toLocaleString())
    console.log('🔢 交易数量:', block.transactions.length)
    
  } catch (error) {
    console.error('❌ 错误:', error)
  }
}

main().catch(console.error)
