import React from 'react'

export interface MenuItemType {
  icon?: React.ReactNode
  label: string
  href: string
}

export interface SubMenuItemType {
  icon?: React.ReactNode
  label: string
  href?: string
  children: MenuItemType[]
}

export type MenuConfig = (MenuItemType | SubMenuItemType)[]
