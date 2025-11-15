# Viem 学习项目

这是一个用于学习 [viem](https://viem.sh/) 的 TypeScript 项目。viem 是一个现代化的以太坊开发库。

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行示例

#### 获取区块信息
```bash
npm run dev:block
```
查看当前以太坊主网的最新区块号、时间戳和交易数量。

#### 查询地址余额
```bash
npm run dev:balance
```
查询几个知名以太坊地址的 ETH 余额。

#### 读取智能合约
```bash
npm run dev:contract
```
演示如何读取 ERC-20 代币合约的基本信息和余额。

## 项目结构

```
src/
├── getBlockNumber.ts  # 获取区块信息示例
├── getBalance.ts      # 查询地址余额示例
└── readContract.ts    # 读取智能合约示例
```

## 学习资源

- [Viem 官方文档](https://viem.sh/)
- [以太坊开发文档](https://ethereum.org/developers/)
- [Solidity 文档](https://docs.soliditylang.org/)

## 下一步

1. 尝试修改示例中的地址和合约
2. 学习如何发送交易（需要私钥/钱包）
3. 探索更多 viem 的 API 功能