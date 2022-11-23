import { getTimePeriod } from '@/features/s10n/utils'
import { useTokenInfo } from '@/hooks/useTokenInfo'
import { formatUnits } from '@ethersproject/units'
import { FC, memo } from 'react'

interface PlanCardProps {
  plan: { name: string; price: string; description: string; paymentToken: string; billingPeriod: number }
  onSubscribe: () => void
}

export const PlanCard: FC<PlanCardProps> = memo(({ plan, onSubscribe }) => {
  const tokenInfo = useTokenInfo(plan.paymentToken)
  console.log('tokenInfo', plan.paymentToken, tokenInfo)

  return (
    <div className="w-72 px-4 my-4">
      <div className="border-2 dark:text-white border-black dark:border-none dark:bg-slate-700/50 rounded-3xl px-6 py-4">
        <div className="flex items-baseline justify-between pb-4 border-b border-gray-400">
          <div className="text-2xl">{plan.name}</div>
        </div>
        {tokenInfo ? (
          <div className="mt-6 pb-4 min-h-[88px] font-bold text-3xl break-words">
            <span className="text-2xl">{`${formatUnits(plan.price, tokenInfo.decimals)} ${tokenInfo.symbol}`}</span>
            {` / `}
            <span className="text-lg dark:text-gray-200 text-black">{`${getTimePeriod(
              plan.billingPeriod as any
            )}`}</span>
          </div>
        ) : (
          <div className="mt-6  pb-4 font-bold">
            <div className="animate-pulse h-9 bg-gray-300 rounded-full  w-48 mb-4"></div>
            <div className="animate-pulse h-9 bg-gray-300 rounded-full  w-48 mb-4"></div>
          </div>
        )}

        <div className="min-h-16 ">{plan.description}</div>
        <div className="flex justify-center mt-6">
          <button className="btn btn-primary text-white" onClick={onSubscribe}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
})
