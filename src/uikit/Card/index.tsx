import { FC, memo } from 'react'

interface CardProps {
  title: React.ReactNode
  children: React.ReactNode
}

export const Card: FC<CardProps> = memo(({ title, children }) => {
  return (
    <div className="bg-white flex flex-col shadow-2xl rounded-3xl">
      <div className="px-2 py-2 border-b border-gray-200">{title}</div>
      <div className="px-2 py-2">{children}</div>
    </div>
  )
})
