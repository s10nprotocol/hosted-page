import { useNotificationCenter } from '@/hooks/useNotificationCenter'
import { CountBadage } from '@/uikit/CountBadage'
import Dropdown from '@/uikit/Dropdown'
import BellIcon from '@heroicons/react/outline/BellIcon'
import { useWeb3React } from '@web3-react/core'
import { FC, memo, useEffect, useState } from 'react'
import { NotificationItem } from './NotificationItem'

export const NotificationCenter: FC = memo(() => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clear } = useNotificationCenter()
  const [isUnreadOnly, setIsUnreadOnly] = useState(false)
  const { account } = useWeb3React()

  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  return (
    <div>
      <Dropdown
        placement="bottom-end"
        popper={
          <div className="w-96 rounded-2xl overflow-hidden backdrop-blur-lg border border-gray-500">
            <header className="flex justify-between items-center w-full h-16 bg-gray-900 bg-opacity-8 0 px-4 border-b border-gray-600">
              <h5 className="text-white text-xl">Notification</h5>
              <div className="flex items-center">
                <span className="text-sm mr-1">Show unread only</span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={isUnreadOnly}
                  onChange={() => {
                    setIsUnreadOnly((prev) => !prev)
                  }}
                />
              </div>
            </header>
            <div className="w-full h-80 bg-gray-500 bg-opacity-20 backdrop-filter py-1">
              {(isUnreadOnly ? notifications.filter((v) => !v.read) : notifications).map((notification) => {
                return (
                  <NotificationItem
                    id={notification.id}
                    content={notification.content}
                    type={notification.type}
                    key={notification.id}
                    data={notification.data}
                    onRead={markAsRead}
                  />
                )
              })}
            </div>
            <footer className="flex justify-between items-center w-full h-16 bg-gray-900 bg-opacity-50 px-4 border-t border-gray-600">
              <button onClick={clear}>Clear</button>
              <button onClick={markAllAsRead}>Mark</button>
            </footer>
          </div>
        }
      >
        <div className="flex justify-center items-center w-10 h-10 rounded-md cursor-pointer hover:bg-black hover:bg-opacity-10">
          <CountBadage count={unreadCount}>
            <BellIcon className="w-7 h-7" />
          </CountBadage>
        </div>
      </Dropdown>
    </div>
  )
})
