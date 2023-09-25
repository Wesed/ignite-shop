import Image from 'next/image'
import shirt1 from '@/assets/shirt1.png'
import shirt2 from '@/assets/shirt2.png'
import shirt3 from '@/assets/shirt3.png'
import shirt4 from '@/assets/shirt4.png'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { twMerge } from 'tailwind-merge'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <div
      ref={sliderRef}
      className="keen-slider ml-auto flex min-h-[656px] w-full max-w-widthCarousel"
    >
      <a
        href=""
        className={twMerge(
          'keen-slider__slide',
          'group relative flex items-center justify-center',
          'cursor-pointer overflow-hidden rounded-lg border bg-gradient',
        )}
      >
        <Image
          src={shirt1}
          alt=""
          width={520}
          height={4800}
          className="object-cover"
        />
        <footer
          className={twMerge(
            'flex items-center justify-between',
            'absolute bottom-1 left-1 right-1 translate-y-[105%]',
            'rounded-md bg-black/60 p-8 opacity-0',
            'transition-all duration-200 ease-in-out',
            'opacity-100 group-hover:translate-y-0',
          )}
        >
          <strong className="">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>

      <a
        href=""
        className={twMerge(
          'keen-slider__slide',
          'group relative flex items-center justify-center',
          'cursor-pointer overflow-hidden rounded-lg border bg-gradient',
        )}
      >
        <Image
          src={shirt2}
          alt=""
          width={520}
          height={4800}
          className="object-cover"
        />
        <footer
          className={twMerge(
            'flex items-center justify-between',
            'absolute bottom-1 left-1 right-1 translate-y-[105%]',
            'rounded-md bg-black/60 p-8 opacity-0',
            'transition-all duration-200 ease-in-out',
            'opacity-100 group-hover:translate-y-0',
          )}
        >
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>

      <a
        href=""
        className={twMerge(
          'keen-slider__slide',
          'group relative flex items-center justify-center',
          'cursor-pointer overflow-hidden rounded-lg border bg-gradient',
        )}
      >
        <Image
          src={shirt4}
          alt=""
          width={520}
          height={4800}
          className="object-cover"
        />
        <footer
          className={twMerge(
            'flex items-center justify-between',
            'absolute bottom-1 left-1 right-1 translate-y-[105%]',
            'rounded-md bg-black/60 p-8 opacity-0',
            'transition-all duration-200 ease-in-out',
            'opacity-100 group-hover:translate-y-0',
          )}
        >
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>

      <a
        href=""
        className={twMerge(
          'keen-slider__slide',
          'group relative flex items-center justify-center',
          'cursor-pointer overflow-hidden rounded-lg border bg-gradient',
        )}
      >
        <Image
          src={shirt3}
          alt=""
          width={520}
          height={4800}
          className="object-cover"
        />
        <footer
          className={twMerge(
            'flex items-center justify-between',
            'absolute bottom-1 left-1 right-1 translate-y-[105%]',
            'rounded-md bg-black/60 p-8 opacity-0',
            'transition-all duration-200 ease-in-out',
            'opacity-100 group-hover:translate-y-0',
          )}
        >
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
    </div>
  )
}
