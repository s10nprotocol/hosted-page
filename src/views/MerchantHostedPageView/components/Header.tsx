import { ChartSquareBarIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC, memo } from 'react'
import Account from './Account'
import NetworkSelector from './NetworkSelector'
import ThemeSelector from './ThemeSelector'

interface HeaderProps {
  merchantName: string
}

export const Header: FC<HeaderProps> = memo(({ merchantName }) => {
  return (
    <div className="flex justify-center w-full border-b border-black dark:border-gray-50 px-4 md:px-6">
      <div className="flex max-w-7xl justify-between items-center w-full py-4 md:flex-row">
        <h1 className="font-bold text-black dark:text-white text-3xl md:text-5xl">{merchantName}</h1>
        <div className="flex items-center">
          <div className="mr-2 md:mr-6 dark:text-white text-black text-xl">
            <Link href={`/consumer`}>
              <a target="_blank">
                <div className="mt-2 tooltip tooltip-bottom" data-tip="Dashboard">
                  <ChartSquareBarIcon className="w-7 h-7 text-slate-800 dark:text-white" />
                </div>
              </a>
            </Link>
          </div>
          <div className="mr-2 md:mr-6">
            <ThemeSelector />
          </div>
          <div className="mr-2 md:mr-6">
            <NetworkSelector />
          </div>
          <Account />
        </div>
      </div>
    </div>
  )
})
