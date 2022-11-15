import { useCallback, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Alert } from './Alert'
import { ToastProps } from './types'

// const StyledToast = styled.div`
//   right: 16px;
//   position: fixed;
//   max-width: calc(100% - 32px);
//   transition: all 250ms ease-in;
//   width: 100%;

//   ${({ theme }) => theme.mediaQueries.sm} {
//     max-width: 400px;
//   }
// `

export const Toast: React.FC<ToastProps> = ({ toast, onRemove, style, ttl, ...props }) => {
  const timer = useRef<number>()
  const ref = useRef(null)
  const removeHandler = useRef(onRemove)
  const { id, title, description, type } = toast

  const handleRemove = useCallback(() => removeHandler.current(id), [id, removeHandler])

  const handleMouseEnter = () => {
    clearTimeout(timer.current)
  }

  const handleMouseLeave = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = window.setTimeout(() => {
      handleRemove()
    }, ttl)
  }

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = window.setTimeout(() => {
      handleRemove()
    }, ttl)

    return () => {
      clearTimeout(timer.current)
    }
  }, [timer, ttl, handleRemove])

  return (
    <CSSTransition appear nodeRef={ref} timeout={250} style={style} {...props}>
      <div
        className="right-4 fixed w-full md:max-w-sm sm:max-w-paddingScreen transition-all"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Alert type={type} content={description} onClose={handleRemove} />
      </div>
    </CSSTransition>
  )
}
