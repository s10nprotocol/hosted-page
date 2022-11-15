import React, { forwardRef, useCallback, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'

import styles from './index.module.css'

interface DialogProps {
  visible: boolean
  maskStyles?: object
  onMaskClick?: Function
  children?: React.ReactNode
  onPressEnter?: (e: KeyboardEvent) => void
  onPressEsc?: (e: KeyboardEvent) => void
}

const Modal = forwardRef<HTMLDivElement, DialogProps>((props: DialogProps, ref) => {
  const {
    visible,
    onMaskClick,
    children,
    maskStyles,
    // onClick,
    onPressEnter = () => {},
    onPressEsc = () => {},
  } = props
  const [show, setShow] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (visible) {
      setShow(true)
    }
  }, [visible])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 13) onPressEnter(e)
      else if (e.keyCode === 27) onPressEsc(e)
    },
    [onPressEnter, onPressEsc]
  )

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [visible, handleKeyDown])

  const renderMaskStyles = useMemo(() => {
    return {
      zIndex: 100,
      ...maskStyles,
    }
  }, [maskStyles])

  const handleMaskClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && onMaskClick) {
        onMaskClick(e)
      }
    },
    [onMaskClick]
  )

  if (typeof window === 'undefined') {
    return null
  }

  return show
    ? ReactDOM.createPortal(
        <div
          className="flex fixed top-0 item-center left-0 right-0 bottom-0 justify-center bg-black bg-opacity-50  items-center"
          ref={ref}
          style={renderMaskStyles}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur" onClick={handleMaskClick} />
          <div
            className={visible ? styles.animationZoomIn : styles.animationFadeOut}
            style={{
              position: 'relative',
              boxShadow: 'dialog',
              borderRadius: 'large',
              maxWidth: '100%',
              maxHeight: '100%',
              // animation: visible ? `zoomIn 0.3s ease-in-out` : `fadeOut 0.3s ease-in-out`,
              animationIterationCount: 1,
            }}
            onAnimationEnd={() => {
              setShow(visible)
            }}
            // onClick={onClick}>
          >
            {children}
          </div>
        </div>,
        document.body
      )
    : null
})

Modal.displayName = 'Modal'

export default Modal
