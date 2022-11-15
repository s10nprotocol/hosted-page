import React, { FC, useCallback } from 'react'
import Dropdown from '../Dropdown'

interface MenuItemProps {
  key: string
  icon?: React.ReactNode
  label: string
}

interface MenuProps {
  children: React.ReactNode
  items: MenuItemProps[]
  onClick: (itemKey: string, domEvent: React.MouseEvent) => void
}

const Menu: FC<MenuProps> = ({ children, items, onClick }) => {
  const handleMenuClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const itemKey = (e.target as HTMLLIElement).dataset.key
      onClick(itemKey!, e)
    },
    [onClick]
  )
  return (
    <Dropdown
      placement="top"
      hideAfterPopupClick
      popper={
        <div className=" mt-2 w-56 origin-top-right rounded-md backdrop-blur-sm bg-zinc-800 border border-zinc-400 border-opacity-20 bg-opacity-50  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className="px-1 py-1">
            {items.map((item) => (
              <li
                key={item.key}
                data-key={item.key}
                onClick={handleMenuClick}
                className={`w-full rounded-md px-2 py-2 text-sm hover:bg-blue-600 cursor-pointer`}
              >
                <div className="w-full flex items-center pointer-events-none">
                  {item.icon && (
                    <div className="mr-2 h-5 w-5 text-white" aria-hidden="true">
                      {item.icon}
                    </div>
                  )}
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      {children}
    </Dropdown>
  )
}

export default Menu
