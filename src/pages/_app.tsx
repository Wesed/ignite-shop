import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar/index'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center bg-gray900 text-gray100">
      {/* <Header /> */}
      <Sidebar />
      <Component {...pageProps} />
    </div>
  )
}
