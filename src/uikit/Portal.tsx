import ReactDOM from 'react-dom'

import React, { useEffect, useState } from 'react'

export type DOMContainer<T extends HTMLElement = HTMLElement> =
  | T
  | React.RefObject<T>
  | null
  | (() => T | React.RefObject<T> | null)

export const resolveContainerRef = <T extends HTMLElement>(
  ref: DOMContainer<T> | undefined
): T | HTMLBodyElement | null => {
  if (typeof document === 'undefined') return null
  if (ref == null) return document.body as HTMLBodyElement
  if (typeof ref === 'function') ref = ref()

  if (ref && 'current' in ref) ref = ref.current
  if (ref?.nodeType) return ref || null

  return null
}

export function useWaitForDOMRef<T extends HTMLElement = HTMLElement>(
  ref: DOMContainer<T> | undefined,
  onResolved?: (element: T | HTMLBodyElement) => void
) {
  const [resolvedRef, setRef] = useState(() => resolveContainerRef(ref))

  if (!resolvedRef) {
    const earlyRef = resolveContainerRef(ref)
    if (earlyRef) setRef(earlyRef)
  }

  useEffect(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef)
    }
  }, [onResolved, resolvedRef])

  useEffect(() => {
    const nextRef = resolveContainerRef(ref)
    if (nextRef !== resolvedRef) {
      setRef(nextRef)
    }
  }, [ref, resolvedRef])

  return resolvedRef
}

export interface PortalProps {
  children: React.ReactElement
  container: DOMContainer
  onRendered?: (element: any) => void
}

/**
 * @public
 */
export const Portal = ({ container, children, onRendered }: PortalProps) => {
  const resolvedContainer = useWaitForDOMRef(container, onRendered)

  return resolvedContainer ? <>{ReactDOM.createPortal(children, resolvedContainer)}</> : null
}

Portal.displayName = 'Portal'
