import { FC, memo } from 'react'

export const Logo: FC = memo(() => {
  return (
    <div className="flex text-black">
      <img alt="s10n" width="40" height="40" src="/S-black.svg" />
      <img className="object-cover ml-1 mr-2" alt="s10n" width="72" height="40" src="/s10n.svg" />
    </div>
  )
})
