import fetch from 'node-fetch'

const BASE_MORALIS_URL = 'https://deep-index.moralis.io/api/v2'

interface ContraceEventResponse<Data = {}> {
  total: number
  page: number
  page_size: number
  result: {
    transaction_hash: string
    address: string
    block_timestamp: string
    block_number: string
    block_hash: string
    data: Data
  }[]
}

interface GetContractEventsOptions {
  topic: string
  contract: string
  abi: any
  chain: string
  limit?: number
  offset?: number
  fromDate?: number | null | string
  fromBlock?: number
}

export const getContractEvents = async <Data>({
  topic,
  contract,
  abi,
  chain,
  limit = 100,
  offset = 0,
  fromDate,
  fromBlock,
}: GetContractEventsOptions) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.MORALIS_API_KEY || '',
    },
    body: JSON.stringify(abi),
  }

  const url = `${BASE_MORALIS_URL}/${contract}/events?chain=${chain}${fromBlock ? `&from_block=${fromBlock}` : ''}${
    fromDate ? `&from_date=${fromDate}` : ''
  }&topic=${topic}&limit=${limit}&offset=${offset}`

  const result = (await fetch(url, options).then((response) => response.json())) as ContraceEventResponse<Data>
  return result
}

interface ContractLogItem {
  transaction_hash: string
  address: string
  block_timestamp: string
  block_number: string
  block_hash: string
  data: string
  topic0: string
  topic1: string
  topic2: string
  topic3: string
}

interface ContractLogResponse {
  total: number
  page_size: number
  page: number
  cursor: string | null
  result: ContractLogItem[]
}

export const fetchContractLogsByMoralis = async (contract: string, chain: string) => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': process.env.MORALIS_API_KEY || '',
    },
  }
  const url = `${BASE_MORALIS_URL}/${contract}/logs?chain=${chain}`
  const result = (await fetch(url, options).then((res) => res.json())) as ContractLogResponse
  console.log(result)
  return result
}
