import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Bag } from 'phosphor-react'
import { Sidebar } from './sidebar'

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-10 z-10 mx-auto flex w-full max-w-widthProject justify-between px-20 py-8">
      <Link href="/" className="mt-1 h-0">
        <Image src={logo} alt="" priority className="brightness-80 filter" />
      </Link>
      <Sidebar />
    </header>
  )
}
