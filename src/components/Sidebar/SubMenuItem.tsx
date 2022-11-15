import ExpandMore from '@/uikit/icons/ExpandMore'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import { MenuItem } from './MenuItem'
import { SubMenuItemType } from './type'

export const SubMenuItem: React.FC<SubMenuItemType> = ({ label, href, icon, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
    if (href) {
      router.push(href)
    }
  }, [href, router])
  const childrenCls = classnames('overflow-hidden', {
    'max-h-0': !isOpen,
  })
  return (
    <div>
      <div
        className="h-12 flex-shrink-0 w-full px-6 flex items-center cursor-pointer hover:bg-gray-900 hover:bg-opacity-10"
        onClick={handleToggle}
      >
        <div className="h-5 w-5 mr-3">{icon}</div>
        <span className="font-medium text-base text-white flex-grow">{label}</span>
        <div className={`flex-shrink-0 text-white ${isOpen ? 'rotate-180' : ''} transition-transform duration-300`}>
          <ExpandMore size={24} />
        </div>
      </div>
      <div
        className={childrenCls}
        style={{
          maxHeight: isOpen ? children.length * 48 : 0,
          transition: 'max-height 0.3s ease-out',
        }}
      >
        {children.map((item, idx) => {
          return <MenuItem key={idx} label={item.label} href={item.href} icon={item.icon} isSubMenu />
        })}
      </div>
    </div>
  )
}
