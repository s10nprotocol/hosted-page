import React, { FC, useCallback, useState } from 'react'
import { ToastsContext } from './context'
import { Toast, ToastContextApi } from './types'

interface ToastsProviderProps {
  children: React.ReactNode
}

export const ToastsProvider: FC<ToastsProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastContextApi['toasts']>([])

  const toast = useCallback(
    ({ title, description, type }: Omit<Toast, 'id'>) => {
      setToasts((prevToasts) => {
        const id = title

        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id)

        return [
          {
            id,
            title,
            description,
            type,
          },
          ...currentToasts,
        ]
      })
    },
    [setToasts]
  )

  const toastError = useCallback(
    (title: Toast['title'], description?: Toast['description']) => {
      return toast({ title, description, type: 'danger' })
    },
    [toast]
  )

  const toastInfo = useCallback(
    (title: Toast['title'], description?: Toast['description']) => {
      return toast({ title, description, type: 'info' })
    },
    [toast]
  )

  const toastSuccess = useCallback(
    (title: Toast['title'], description?: Toast['description']) => {
      return toast({ title, description, type: 'success' })
    },
    [toast]
  )

  const toastWarning = useCallback(
    (title: Toast['title'], description?: Toast['description']) => {
      return toast({ title, description, type: 'warning' })
    },
    [toast]
  )

  const clear = useCallback(() => setToasts([]), [])
  const remove = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
  }, [])

  return (
    <ToastsContext.Provider value={{ toasts, clear, remove, toastError, toastInfo, toastSuccess, toastWarning }}>
      {children}
    </ToastsContext.Provider>
  )
}
