import useForkRef from '@/hooks/interaction/useForkRef'
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { Portal } from './Portal'

const MAP_DIRECTION_CSS = {
  top: {
    parent: 'flex-col',
    child: 'w-full',
  },
  bottom: {
    parent: 'flex-col-reverse',
    child: 'w-full',
  },
  left: {
    parent: '',
    child: 'h-full',
  },
  right: {
    parent: 'flex-row-reverse',
    child: 'h-full',
  },
}

export interface DrawerProps {
  cls?: string
  visible?: boolean
  maskCls?: string
  childCls?: string
  direction?: 'top' | 'bottom' | 'left' | 'right'
  onOuterClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  children: JSX.Element
}

export const Drawer = forwardRef<HTMLElement, DrawerProps>(function Drawer(
  { visible = false, direction = 'right', maskCls = '', children, childCls = '', onOuterClick, cls = '' }: DrawerProps,
  ref
) {
  const [show, setshow] = useState(visible)
  const intervalRef: any = useRef()
  const [drawerWidth, setDrawerWidth] = useState<number>()
  const [drawerHeight, setDrawerHeight] = useState<number>()
  const [baseOverflow, setBaseOverflow] = useState('auto')
  const childRef = useRef<HTMLDivElement>()
  const handleChildRef = useForkRef(ref, childRef)
  const cloneChildren = React.cloneElement(children, { ref: handleChildRef })

  useEffect(() => {
    if (visible) {
      setshow(true)
      if (childRef.current) {
        if (direction === 'left' || direction === 'right') {
          setDrawerWidth(childRef.current.getBoundingClientRect().width)
        } else {
          setDrawerHeight(childRef.current.getBoundingClientRect().height)
        }
      }
      setBaseOverflow(document.body.style.overflow || 'auto')
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      intervalRef.current = setTimeout(() => setshow(false), 500)
      if (direction === 'left' || direction === 'right') {
        setDrawerWidth(0)
      } else {
        setDrawerHeight(0)
      }
    }
    return () => {
      try {
        clearTimeout(intervalRef.current)
      } catch (error) {}
      document.body.style.setProperty('overflow', baseOverflow)
    }
  }, [baseOverflow, direction, visible])

  const containerStl = useMemo(
    () => ({
      width: drawerWidth,
      height: drawerHeight,
    }),
    [drawerHeight, drawerWidth]
  )

  return (
    <Portal container={null}>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-9999 ${MAP_DIRECTION_CSS[direction].parent} ${
          visible || show ? 'flex' : 'hidden'
        } ${cls}`}
      >
        <div
          className={` transition-size duration-500 overflow-auto z-9999 ${MAP_DIRECTION_CSS[direction].child} ${childCls}`}
          style={containerStl}
        >
          {cloneChildren}
        </div>
        <div
          className={`flex-1 absolute top-0 left-0 right-0 bottom-0 ${maskCls}`}
          onClick={(e) => onOuterClick && onOuterClick(e)}
        />
      </div>
    </Portal>
  )
})
