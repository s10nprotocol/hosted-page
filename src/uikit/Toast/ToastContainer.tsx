import { FC, memo } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { Toast } from './Toast'
import { Toast as ToastType } from './types'

import styles from './ToastContainer.module.css'

const ZINDEX = 1000
const TOP_POSITION = 80 // Initial position from the top

interface ToastContainerProps {
  toasts: ToastType[]
  stackSpacing?: number
  ttl?: number
  onRemove: (id: string) => void
}

export const ToastContainer: FC<ToastContainerProps> = memo(({ toasts, onRemove, ttl = 6000, stackSpacing = 36 }) => {
  return (
    <div className={styles.container}>
      <TransitionGroup>
        {toasts.map((toast, index) => {
          const zIndex = (ZINDEX - index).toString()
          const top = TOP_POSITION + index * stackSpacing

          return (
            <Toast key={toast.id} toast={toast} onRemove={onRemove} ttl={ttl} style={{ top: `${top}px`, zIndex }} />
          )
        })}
      </TransitionGroup>
    </div>
  )
})
