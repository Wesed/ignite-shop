import Image from "next/image";
import shirt1 from '@/assets/shirt1.png'
import shirt2 from '@/assets/shirt2.png'
import shirt3 from '@/assets/shirt3.png'
import shirt4 from '@/assets/shirt4.png'
import { twMerge } from 'tailwind-merge'

export default function Home() {
  return (
    <div className="flex gap-12 w-full max-w-widthCarousel ml-auto min-h-[656px]">
      <a href="" className={twMerge(
        'group relative flex items-center justify-center',
        'border bg-gradient rounded-lg p-1 cursor-pointer overflow-hidden',
      )}>
        <Image src={shirt1} alt="" width={520} height={4800}  className="object-cover"/>
        <footer className={twMerge(
          'flex items-center justify-between',
          'translate-y-[105%] absolute bottom-1 left-1 right-1',
          'opacity-0 p-8 rounded-md bg-black/60',
          'transition-all duration-200 ease-in-out',
          'group-hover:translate-y-0 opacity-100',
        )}>
          <strong className="">Camiseta X</strong>
          <span className="">R$ 79,90</span>
          </footer>
      </a>

      <a href="" className={twMerge(
        'group relative flex items-center justify-center',
        'border bg-gradient rounded-lg p-1 cursor-pointer overflow-hidden',
      )}>
        <Image src={shirt1} alt="" width={520} height={4800}  className="object-cover"/>
        <footer className={twMerge(
          'flex items-center justify-between',
          'translate-y-[105%] absolute bottom-1 left-1 right-1',
          'opacity-0 p-8 rounded-md bg-black/60',
          'transition-all duration-200 ease-in-out',
          'group-hover:translate-y-0 opacity-100',
        )}>          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
          </footer>
      </a>
    </div>
  )
}
