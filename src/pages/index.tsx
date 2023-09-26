import Image from 'next/image'
import shirt1 from '@/assets/shirt1.png'
import shirt2 from '@/assets/shirt2.png'
import shirt3 from '@/assets/shirt3.png'
import shirt4 from '@/assets/shirt4.png'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { twMerge } from 'tailwind-merge'
import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Stripe from 'stripe'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  console.log('aaa', products)

  return (
    <div
      ref={sliderRef}
      className="keen-slider ml-auto flex min-h-[656px] w-full max-w-widthCarousel"
    >
      {products.map((prod) => (
        <a
          key={prod.id}
          href=""
          className={twMerge(
            'keen-slider__slide',
            'group relative flex items-center justify-center',
            'cursor-pointer overflow-hidden rounded-lg bg-gradient',
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
            <strong className="">{prod.name}</strong>
            <span className="text-xl font-bold text-green300">
              R${prod.price}
            </span>
          </footer>
        </a>
      ))}
    </div>
  )
}

// SSG
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      price: price.unit_amount / 100,
    }
  })

  return {
    props: {
      products,
    },
  }
}
