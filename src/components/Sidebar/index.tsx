import { Logo } from '@/components/Logo'
import { useRouteConfig } from '@/hooks/route'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import config from './config'
import { MenuItem } from './MenuItem'
import { MerchantSwitcher } from './MerchantSwitcher'

export const Sidebar: React.FC = () => {
  const { isInConsumer } = useRouteConfig()
  const router = useRouter()
  const [tabName, setTabName] = useState<'merchant' | 'consumer'>(() => {
    if (isInConsumer) {
      return 'consumer'
    }
    return 'merchant'
  })
  const handleTurnMerchantTab = useCallback(() => {
    router.push('/merchant')
    setTabName('merchant')
  }, [router])
  const handleTurnConsumerTab = useCallback(() => {
    router.push('/consumer')
    setTabName('consumer')
  }, [router])

  return (
    <div className="h-full w-60 p-4 pr-2 flex-shrink-0">
      <div className="relative flex flex-col pt-1 h-full bg-white bg-opacity-10 rounded-3xl border-gray-500 border-opacity-20 border-solid border">
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-xl rounded-3xl" />
        <header className="h-16 flex-content flex-shrink-0 invert z-10">
          <Link href="/" className="block" aria-label="Cruip">
            <a>
              <Logo />
            </a>
          </Link>
        </header>
        <div className="tabs w-full grid grid-cols-auto z-10">
          <span
            className={`tab tab-bordered ${tabName === 'merchant' ? 'tab-active' : ''}`}
            onClick={handleTurnMerchantTab}
          >
            Merchant
          </span>
          <span
            className={`tab tab-bordered ${tabName === 'consumer' ? 'tab-active' : ''}`}
            onClick={handleTurnConsumerTab}
          >
            Consumer
          </span>
        </div>
        <div className="flex flex-col grow z-10">
          {config[tabName].map((cfg) => {
            return <MenuItem key={cfg.label} {...cfg} />
          })}
        </div>
        {tabName === 'merchant' && <MerchantSwitcher />}
      </div>
    </div>
  )
}
