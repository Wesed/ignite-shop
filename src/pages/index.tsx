import Image from 'next/image'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { twMerge } from 'tailwind-merge'
import { stripe } from '@/lib/stripe'
import useNextBlurhash from 'use-next-blurhash'
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
  const [blurDataUrl] = useNextBlurhash('LK8Z1ObIu6j[G_a{X3j[t.j@VXaz')
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
            src={prod.imageUrl}
            alt=""
            width={520}
            height={4800}
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataUrl}
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
      teste: product.default_price,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      price: price.unit_amount! / 100,
    }
  })

  return {
    props: {
      products,
    },
  }
}
