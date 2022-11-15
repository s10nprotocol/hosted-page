import { useRouter } from 'next/router'
import { FC, memo } from 'react'

import { Item } from './components/Item'

export const HomePage: FC = memo(() => {
  const router = useRouter()
  return (
    <div className="min-h-full w-full pl-2 pr-4 hero-content flex-col">
      <h1 className="text-4xl font-bold mb-6">The leading subscription protocol for web3</h1>
      <div className="flex flex-col w-full items-center">
        <Item
          img="/static/online-store.svg"
          title="Easily Start Your Bussiness"
          desc="Merchants can easily build their store and create subscription plan in the app."
          onClick={() => {
            router.push('/merchant')
          }}
        />
        <Item
          img="/static/subscription.svg"
          title="Manage Your Subscription"
          desc="Consumers can use our app to manage their subscription."
          onClick={() => {
            router.push('/consumer/subscription')
          }}
        />
        <Item
          img="/static/demo.png"
          title="View a Demo"
          desc=""
          onClick={() => {
            router.push('/demo/skiff')
          }}
        />
      </div>
    </div>
  )
})
