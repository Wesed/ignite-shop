import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { Bag } from 'phosphor-react'
import { useProductsQuery } from '@/generated/graphql'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ productsaa = [] }: HomeProps) {
  const [{ data }] = useProductsQuery({})

  return (
    <>
      <Head>
        <title>Uautenticos</title>
      </Head>

      <div className="mx-auto grid min-h-[356px] max-w-widthProject grid-cols-products gap-10">
        {data?.products.map((prod) => (
          <Link
            key={prod.id}
            href={`/product/${prod.slug}`}
            prefetch={false}
            className={twMerge(
              'group relative flex items-center justify-center',
              'cursor-pointer overflow-hidden rounded-lg bg-background',
            )}
          >
            <Image
              src={prod.images[0].url}
              alt=""
              width={520}
              height={480}
              className="object-cover"
              priority
            />
            <footer
              className={twMerge(
                'flex items-center justify-between',
                'absolute bottom-1 left-1 right-1 translate-y-[105%]',
                'rounded-md bg-black/60 p-3 opacity-0',
                'transition-all duration-200 ease-in-out',
                'opacity-100 group-hover:translate-y-0',
              )}
            >
              <div className="flex flex-col gap-1">
                <strong className="text-sm">{prod.name}</strong>
                <span className=" font-bold text-green300">
                  R$ {prod.price.toFixed(2)}
                </span>
              </div>
              <div
                className={twMerge(
                  'rounded-md transition-colors',
                  'bg-white p-2 text-black',
                  'hover:bg-black hover:text-white',
                )}
              >
                <Bag size={20} weight="bold" />
              </div>
            </footer>
          </Link>
        ))}
      </div>
    </>
  )
}

// SSG
// export const getStaticProps: GetStaticProps = async () => {
//   const response = await stripe.products.list({
//     expand: ['data.default_price'],
//   })

//   const products = response.data.map((product) => {

//   return {

// }
