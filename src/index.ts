import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

async function main() {
  const client = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const blockNumber = await client.getBlockNumber();
  console.log('Current block number:', blockNumber.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
