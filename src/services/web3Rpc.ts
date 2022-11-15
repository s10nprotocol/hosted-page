import { ethers } from 'ethers'

const rpcUrl = process.env.WEB3_RPC_URL
const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

export const fetchContractLogsByRpcApi = async (contract: string, fromBlock: number = 0) => {
  const logs = await provider.getLogs({ address: contract, fromBlock, toBlock: 'latest' })
  return logs
}

export const getBlock = async (blockNumber: number) => {
  const block = await provider.getBlock(blockNumber)
  return block
}
