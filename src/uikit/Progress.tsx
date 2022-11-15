import { forwardRef } from 'react'

export interface Props {
  percent: number
  barColor?: string
  outerCls?: string
  barCls?: string
}

export const Progress = forwardRef<HTMLDivElement, Props>(({ percent, barColor, outerCls, barCls }: Props, ref) => {
  const formattedPercent = Math.min(Math.max(+percent || 0, 0), 100)
  return (
    <div ref={ref} className={`rounded-full w-full overflow-hidden h-2 bg-gray-600 ${outerCls}`}>
      <div
        className={`h-full rounded-full ${barCls}`}
        style={{
          width: `${formattedPercent}%`,
          background: barColor,
        }}
      />
    </div>
  )
})
