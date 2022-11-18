import { useDynamicRender } from '@/hooks/interaction/useDynamicRender'
import { useModalHandler } from '@/hooks/interaction/useModalHandler'
import { Spinner } from '@/uikit/Spinners'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import { FC, memo, useCallback, useMemo, useRef, useState } from 'react'
import { CreateSubscriptionModal } from './components/CreateSubscriptionModal'
import Footer from './components/Footer'
import { Header } from './components/Header'
import { PlanCard } from './components/PlanCard'
import { useLandingViewState } from './hooks'

interface MerchantHostedPageViewProps {
  merchantTokenId: string
}

export const MerchantHostedPageView: FC<MerchantHostedPageViewProps> = memo(({ merchantTokenId }) => {
  const [[isShowCreateModal], showCreateModal, closeCreateModal] = useModalHandler()
  const [targetId, setTargetId] = useState('-1')
  const mySubscriptionLinkRef = useRef<HTMLAnchorElement>(null)
  const isRender = useDynamicRender(true)
  const { merchantInfo, isNotExist } = useLandingViewState(merchantTokenId)
  const { isActive } = useWeb3React()
  const router = useRouter()

  const targetPlan = useMemo(() => {
    return merchantInfo?.plans.find((pl) => pl.planIndex === targetId)
  }, [merchantInfo?.plans, targetId])

  const handleSubscribe = useCallback(
    (planIndex: number) => {
      if (isActive) {
        setTargetId(String(planIndex))

        showCreateModal()
      } else {
        ;(document.querySelector('#connectBtn') as HTMLButtonElement)?.click()
      }
    },
    [isActive, showCreateModal]
  )

  if (isNotExist) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#efefef] dark:bg-slate-900 text-black">
        <div className="text-4xl text-gray-400">Sorry, the merchant does not exist.</div>
        <button
          className="btn btn-primary w-96 mt-10"
          onClick={() => {
            router.push('/')
          }}
        >
          Back
        </button>
      </div>
    )
  }

  if (!merchantInfo) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#efefef] dark:bg-slate-900 text-black">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-center h-screen bg-[#efefef] dark:bg-slate-900 text-black bg-center bg-fixed bg-no-repeat overflow-y-auto"
      style={{ backgroundImage: 'url(/hosted-page-bg.svg)' }}
    >
      <Header merchantName={merchantInfo.name} />
      <div className="flex justify-center md:justify-start flex-grow pt-8 flex-wrap w-full max-w-7xl">
        {merchantInfo.plans?.map((plan, idx) => {
          if (!plan.enabled) {
            return null
          }
          return (
            <PlanCard
              plan={plan}
              key={idx}
              onSubscribe={() => {
                handleSubscribe(Number(plan.planIndex))
              }}
            />
          )
        })}
      </div>
      {isRender && (
        <a
          ref={mySubscriptionLinkRef}
          target="_blank"
          rel="noreferrer"
          className=" hidden"
          href={`http://${window.location.host}/consumer/subscription`}
        />
      )}
      <Footer />
      {isShowCreateModal && (
        <CreateSubscriptionModal
          visible={isShowCreateModal}
          onClose={closeCreateModal}
          merchantTokenId={merchantTokenId}
          planIndex={targetId}
          merchantName={merchantInfo?.name || ''}
          planName={targetPlan?.name || ''}
          maxTermLength={Number(targetPlan?.maxTermLength) || 12}
          billingPeriod={targetPlan?.billingPeriod || 0}
          paymentToken={targetPlan?.paymentToken || ''}
          price={targetPlan?.price || '0'}
        />
      )}
    </div>
  )
})
