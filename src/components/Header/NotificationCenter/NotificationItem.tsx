import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon, InformationCircleIcon } from '@heroicons/react/solid'
import { FC, memo, useCallback } from 'react'

const Empty: FC = () => null

const getIcon = (type?: string) => {
  if (type === 'success') {
    return CheckCircleIcon
  }
  if (type === 'info') {
    return InformationCircleIcon
  }
  if (type === 'warning') {
    return ExclamationIcon
  }
  if (type === 'error') {
    return ExclamationCircleIcon
  }
  return Empty
}

const getColorSeriesCls = (type?: string) => {
  if (type === 'success') {
    return ['bg-green-400', 'text-green-600']
  }
  if (type === 'error') {
    return ['bg-red-400', 'text-red-600']
  }
  if (type === 'warning') {
    return ['bg-yellow-400', 'text-yellow-600']
  }
  return ['bg-sky-400', 'text-sky-600']
}

interface NotificationProps {
  id: string | number
  type?: string
  content: React.ReactNode
  data: any
  onRead: (id: string | number) => void
}

export const NotificationItem: FC<NotificationProps> = memo(({ id, type, content, data, onRead }) => {
  const [bgCls, textCls] = getColorSeriesCls(type)
  const Icon = getIcon(type)
  const handleMarkAsRead = useCallback(() => {
    onRead(id)
  }, [id, onRead])
  return (
    <div className="w-full px-1 py-1">
      <div
        className={`px-2 flex items-center ${bgCls} w-full h-16 bg-opacity-10 rounded-lg`}
        onClick={handleMarkAsRead}
      >
        <Icon className={`w-5 h-5 ${textCls} mr-2`} />
        {content}
      </div>
    </div>
  )
})
