import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function Success() {
  return (
    <main className="mx-auto my-0 flex h-[656px] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray100">Compra efetuada!</h1>
      <div className="mb-8 mt-16 flex h-36 w-full max-w-[130px] items-center justify-center rounded-lg bg-gradient p-1">
        <Image src="" alt="" objectFit="cover" />
      </div>
      <p className="max-w-[560px] text-center text-2xl text-gray300">
        Uhuul <strong className="text-gray100">Matheus</strong>, sua {''}
        <strong className="text-gray100">
          Camiseta LongLine Limited Edition
        </strong>{' '}
        já está a caminho da sua casa.
      </p>
      <Link
        href="/"
        className={twMerge(
          'mt-20 text-xl font-bold text-green500',
          'transition-colors duration-200',
          'hover:text-green300',
        )}
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}
