import { FC, InputHTMLAttributes, memo } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  size: number
}

export const Checkbox: FC<Props> = memo(({ size, ...restProps }) => {
  return (
    <div>
      <input type="checkbox" {...restProps} />
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.035 16.812l-.001.002 2.121 2.121.002-.002 2.121-2.12 9.19-9.192-2.12-2.121-9.191 9.19-3.536-3.534-2.121 2.12 3.535 3.536z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
})
