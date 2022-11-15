import { useAppDispatch } from '@/store'
import { updateFromMerchantList } from '@/store/s10n'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'
import { useQuery } from 'urql'

const MerchantEntitiesQuery = `
  query ($owner: String!) {
      merchantEntities(
        where: {owner: $owner}
        orderBy: createdAt
        orderDirection: desc
      ) {
        id
        name
        owner
        merchantTokenId
        updatedAt
        createdAt
      }
  }
`

export const useMerchantList = () => {
  const { account } = useWeb3React()
  const [result, reexecuteQuery] = useQuery({
    query: MerchantEntitiesQuery,
    variables: { owner: account! },
    pause: account === undefined,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (result.data?.merchantEntities) {
      dispatch(updateFromMerchantList(result.data.merchantEntities))
    }
  }, [dispatch, result.data?.merchantEntities])

  const refresh = useCallback(() => {
    reexecuteQuery({ requestPolicy: 'network-only' })
  }, [reexecuteQuery])

  return { result, refresh }
}
