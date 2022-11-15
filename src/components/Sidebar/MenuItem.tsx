import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { MenuItemType } from './type'

interface MenuItemProps extends MenuItemType {
  isSubMenu?: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, icon, href, isSubMenu }) => {
  const hoverCls = classNames({ 'bg-gray-50': isSubMenu, 'bg-opacity-10': isSubMenu })
  return (
    <Link href={href}>
      <div
        className={`h-12 cursor-pointer flex-shrink-0 w-full px-6 flex items-center hover:bg-gray-900 hover:bg-opacity-10 ${hoverCls}`}
      >
        <div className="h-5 w-5 mr-3">{icon}</div>
        <span className="font-medium cursor-pointer text-white text-base">{label}</span>
      </div>
    </Link>
  )
}
