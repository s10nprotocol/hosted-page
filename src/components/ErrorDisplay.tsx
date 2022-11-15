import { FC, memo } from 'react'

export const ErrorDisplay: FC<{ message: string }> = memo(({ message }) => {
  return <div className="w-full h-16 flex-shrink break-all overflow-hidden line-clamp-3 text-ellipsis">{message}</div>
})
