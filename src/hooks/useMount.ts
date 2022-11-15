import { useEffect } from 'react'

export const useMount = (mount: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(mount, [])
}
