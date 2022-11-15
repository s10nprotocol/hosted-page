import { createContext } from 'react'
import { ToastContextApi } from './types'

const noop = () => undefined

export const ToastsContext = createContext<ToastContextApi>({
  toasts: [],
  toastError: noop,
  toastInfo: noop,
  toastSuccess: noop,
  toastWarning: noop,
  clear: noop,
  remove: noop,
})
