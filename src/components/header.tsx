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
    </header>
  )
}
