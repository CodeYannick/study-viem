import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// 创建公共客户端
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

// ERC-20 代币合约 ABI（只包含我们需要的函数）
const erc20Abi = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const

async function main() {
  try {
    // USDC 合约地址
    const usdcAddress = '0xA0b86a33E6417c8f2c3b0b8C8B0b8C8B0b8C8B0b'
    
    console.log('📋 读取 ERC-20 合约信息...\n')
    
    // 读取代币基本信息
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      client.readContract({
        address: usdcAddress,
        abi: erc20Abi,
        functionName: 'name',
      }),
      client.readContract({
        address: usdcAddress,
        abi: erc20Abi,
        functionName: 'symbol',
      }),
      client.readContract({
        address: usdcAddress,
        abi: erc20Abi,
        functionName: 'decimals',
      }),
      client.readContract({
        address: usdcAddress,
        abi: erc20Abi,
        functionName: 'totalSupply',
      }),
    ])
    
    console.log(`🏷️  代币名称: ${name}`)
    console.log(`🔤 代币符号: ${symbol}`)
    console.log(`🔢 小数位数: ${decimals}`)
    console.log(`📊 总供应量: ${formatUnits(totalSupply as bigint, decimals as number)} ${symbol}`)
    console.log('---')
    
    // 查询特定地址的代币余额
    const holderAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // Vitalik's address
    
    const balance = await client.readContract({
      address: usdcAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [holderAddress],
    })
    
    console.log(`💰 地址 ${holderAddress} 的 ${symbol} 余额:`)
    console.log(`   ${formatUnits(balance as bigint, decimals as number)} ${symbol}`)
    
  } catch (error) {
    console.error('❌ 读取合约失败:', error)
    console.log('\n💡 提示: 这个示例使用了一个示例合约地址，可能不存在。')
    console.log('   你可以替换为真实的 ERC-20 代币合约地址，比如:')
    console.log('   - USDC: 0xA0b86a33E6417c8f2c3b0b8C8B0b8C8B0b8C8B0b')
    console.log('   - USDT: 0xdAC17F958D2ee523a2206206994597C13D831ec7')
  }
}

main().catch(console.error)
