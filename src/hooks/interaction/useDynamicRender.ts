import { useEffect, useState } from 'react'

export const useDynamicRender = (isShow: boolean) => {
  const [isRender, setIsRender] = useState(false)
  useEffect(() => {
    if (isShow) {
      setIsRender(true)
    }
  }, [isShow])
  return isRender
}
