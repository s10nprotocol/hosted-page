import { GlobalService } from '@/components/Layout/GlobalService'
import { Meta } from '@/components/Meta'
import { Web3Provider } from '@/components/Web3Provider'
import { GraphqlProvider } from '@/features/s10n/context'
import { useStore } from '@/store'
import 'antd/dist/antd.dark.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import '../styles/globals.css'
import '../styles/tailwind.css'

interface MyAppProps extends AppProps {}

function MyApp({ Component, pageProps }: MyAppProps) {
  const { initRootState } = pageProps
  const store = useStore(initRootState)

  return (
    <Web3Provider>
      <ThemeProvider attribute="class" enableColorScheme={false} defaultTheme="light">
        <GraphqlProvider>
          <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer />
            <Meta />
            <GlobalService />
          </Provider>
        </GraphqlProvider>
      </ThemeProvider>
    </Web3Provider>
  )
}

export default MyApp
