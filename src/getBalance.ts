import { createPublicClient, http, formatEther } from 'viem'
import { mainnet } from 'viem/chains'

// 创建公共客户端
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

async function main() {
  try {
    // 一些知名的以太坊地址示例
    const addresses = [
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik Buterin
      '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD', // Uniswap Universal Router
      '0xA0b86a33E6417c8f2c3b0b8C8B0b8C8B0b8C8B0b', // 示例地址
    ]
    
    console.log('💰 查询以太坊地址余额...\n')
    
    for (const address of addresses) {
      try {
        // 获取地址的 ETH 余额（以 wei 为单位）
        const balance = await client.getBalance({ address: address as `0x${string}` })
        
        // 转换为 ETH 单位
        const balanceInEth = formatEther(balance)
        
        console.log(`📍 地址: ${address}`)
        console.log(`💎 余额: ${balanceInEth} ETH`)
        console.log(`🔢 Wei: ${balance.toString()}`)
        console.log('---')
        
      } catch (error) {
        console.log(`❌ 查询地址 ${address} 失败:`, error)
        console.log('---')
      }
    }
    
  } catch (error) {
    console.error('❌ 程序执行错误:', error)
  }
}

main().catch(console.error)
