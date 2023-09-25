import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import logo from '@/assets/logo.svg'
import Image from 'next/image'

export default function App({ Component, pageProps }: AppProps) {
  return <div className="bg-gray900 text-gray100 flex flex-col items-start justify-center min-h-screen">
    <header className="py-8 px-0 w-full max-w-widthProject my-0 mx-auto">
      <Image src={logo} alt="" />
    </header>
    <Component {...pageProps} />
  </div>
}
