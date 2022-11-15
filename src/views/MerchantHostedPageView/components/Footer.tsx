import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="flex w-full flex-grow-0 px-2 h-12 border-t border-gray-900 dark:border-gray-200 border-opacity-20 justify-center items-center">
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center flex-grow text-black dark:text-white"
      >
        Powered by @s10nprotocol
      </a>
    </footer>
  )
}

export default Footer
