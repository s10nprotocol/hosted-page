import { ReactNode } from 'react'

export type Types = 'success' | 'danger' | 'warning' | 'info'

// export const types = {
//   SUCCESS: 'success',
//   DANGER: 'danger',
//   WARNING: 'warning',
//   INFO: 'info',
// }

export interface Toast {
  id: string
  type: Types
  title: string
  description?: ReactNode
}

export type ToastSignature = (title: Toast['title'], description?: Toast['description']) => void

export interface ToastContextApi {
  toasts: Toast[]
  clear: () => void
  remove: (id: string) => void
  toastError: ToastSignature
  toastInfo: ToastSignature
  toastSuccess: ToastSignature
  toastWarning: ToastSignature
}

export interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
  ttl: number
  style: Partial<CSSStyleDeclaration>
}
