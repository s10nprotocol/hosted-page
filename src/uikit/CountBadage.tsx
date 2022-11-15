import React, { FC, memo } from 'react'

interface CountBadageProps {
  children: React.ReactNode
  count: number
}

export const CountBadage: FC<CountBadageProps> = memo(({ children, count }) => {
  return (
    <div className="relative">
      {children}
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white badge badge-xs border-none translate-x-1/2 -translate-y-1/2">
          {count}
        </span>
      )}
    </div>
  )
})
