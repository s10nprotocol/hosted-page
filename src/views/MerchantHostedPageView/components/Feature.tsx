import { FC, memo } from 'react'

interface FeatureProps {
  content: string
}

export const Feature: FC<FeatureProps> = memo(({ content }) => {
  return (
    <div className="flex items-center my-1">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="9" fill="#00A05E"></circle>
        <path d="M5 9.5L8.27661 11.7943L12.8652 5.24109" stroke="white" strokeWidth={2}></path>
      </svg>
      <div className="ml-2">{content}</div>
    </div>
  )
})
