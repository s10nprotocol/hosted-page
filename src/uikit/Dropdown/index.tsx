import { Transition } from '@headlessui/react'
import type { Placement } from '@popperjs/core'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'

interface DropdownProps {
  children: React.ReactNode
  contentCls?: string
  popperCls?: string
  popper: React.ReactNode
  hideAfterPopupClick?: boolean
  placement?: Placement
}

const Dropdown: FC<DropdownProps> = memo(
  ({ popperCls, children, contentCls, popper, hideAfterPopupClick, placement }) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const [isHover, setIsHover] = useState<boolean>(false)
    // const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: placement || 'bottom',
    })
    const [popperVisible, setPopperVisible] = useState(false)
    const handleTargetClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setPopperVisible((prev) => !prev)
    }, [])

    const mouseDownListener = useCallback(
      (e: MouseEvent) => {
        if (referenceElement?.contains(e.target as Node) || popperElement?.contains(e.target as Node)) return
        setPopperVisible(false)
      },
      [popperElement, referenceElement]
    )

    const handlePopupClick = useCallback(() => {
      if (hideAfterPopupClick) {
        setPopperVisible(false)
      }
    }, [hideAfterPopupClick])

    useEffect(() => {
      if (typeof window !== 'undefined' && popperVisible) {
        window.addEventListener('mousedown', mouseDownListener)
      }
      return () => {
        window.removeEventListener('mousedown', mouseDownListener)
      }
    }, [mouseDownListener, popperVisible])

    return (
      <>
        <div onClick={handleTargetClick} className={contentCls} ref={setReferenceElement}>
          {children}
        </div>

        <Transition
          appear={true}
          show={popperVisible}
          className={`${popperCls || ''} shadow-2xl z-50`}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          onClick={handlePopupClick}
        >
          <Transition.Child
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-200"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-200"
            leaveTo="transform opacity-0 scale-95"
          >
            {popper}
          </Transition.Child>
        </Transition>
      </>
    )
  }
)

export default Dropdown
