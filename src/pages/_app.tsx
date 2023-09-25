import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import logo from '@/assets/logo.svg'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center bg-gray900 text-gray100">
      <header className="my-0 ml-auto w-full max-w-widthCarousel px-0 py-8">
        <Image src={logo} alt="" />
      </header>
      <Component {...pageProps} />
    </div>
  )
}
