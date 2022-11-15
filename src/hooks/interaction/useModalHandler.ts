import { useCallback, useEffect, useState } from 'react'

export const useModalHandler = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const show = useCallback(() => {
    setVisible(true)
  }, [])

  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  const toggle = useCallback(() => {
    setVisible((pre) => !pre)
  }, [])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    if (visible) {
      setMounted(true)
    }
  }, [visible])

  return [[visible, mounted], show, hide, toggle] as [[boolean, boolean], () => void, () => void, () => void]
}
