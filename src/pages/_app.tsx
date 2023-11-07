import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '@/components/header'
import { CartContextProvider } from '@/contexts/CartContext'
import { Provider } from 'urql'
import { client, ssrCache } from '@/lib/urql'

export default function App({ Component, pageProps }: AppProps) {
  // reaproveita cache
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }

  return (
    <Provider value={client}>
      <CartContextProvider>
        <div className="flex min-h-screen flex-col items-start justify-center bg-gray900 text-gray100">
          <Header />
          <Component {...pageProps} />
        </div>
      </CartContextProvider>
    </Provider>
  )
}
