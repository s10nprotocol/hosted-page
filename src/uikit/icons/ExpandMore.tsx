import { FC, memo } from 'react'

const Icon: FC<{ size: number }> = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 48 48">
    <path fill="currentColor" d="M24 31.4 11.3 18.7 14.15 15.9 24 25.8 33.85 15.95 36.7 18.75Z" />
  </svg>
)

export default memo(Icon)
