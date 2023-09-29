import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Bag } from 'phosphor-react'

export function Header() {
  return (
    <header className="my-0 ml-auto flex w-full max-w-widthCarousel justify-between px-0 py-8">
      <Link href="/">
        <Image src={logo} alt="" priority />
      </Link>

      <div className="relative mr-32 h-12 w-12 cursor-pointer rounded-md bg-gray800 p-3 transition hover:bg-opacity-70">
        <Bag size={24} className="text-gray300 hover:text-gray100" />
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green500 text-sm font-bold">
          1
        </span>
      </div>
    </header>
  )
}
