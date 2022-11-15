import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme())
  const mqListener = (e: { matches: boolean | ((prevState: boolean) => boolean) }) => {
    setIsDarkTheme(e.matches)
  }

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    darkThemeMq.addListener(mqListener)
    return () => darkThemeMq.removeListener(mqListener)
  }, [])
  return isDarkTheme
}

const ThemeSelector = () => {
  const router = useRouter()
  const { theme: queryTheme } = router.query
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  const isDarkTheme = useThemeDetector()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (queryTheme === 'dark') {
      setTheme('dark')
    } else if (queryTheme === 'light') {
      setTheme('light')
    } else {
      setTheme('system')
    }
  }, [queryTheme, setTheme])
  if (!mounted) return null
  return (
    <>
      {theme === 'light' || (theme === 'system' && !isDarkTheme) || theme == undefined ? (
        <button className="p-2  border border-gray-300 rounded-lg hover:bg-gray-100" onClick={() => setTheme('dark')}>
          <MoonIcon className="w-6 h-6 text-yellow-500" />
        </button>
      ) : (
        <button className="p-2  rounded-md hover:bg-gray-800 " onClick={() => setTheme('light')}>
          <SunIcon className="w-6 h-6 text-yellow-500" />
        </button>
      )}
    </>
  )
}
export default ThemeSelector
