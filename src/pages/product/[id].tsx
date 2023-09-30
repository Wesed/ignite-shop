import { GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import loader from '@/assets/loader.svg'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Head from 'next/head'
import { CartContext } from '@/contexts/CartContext'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addNewProduct } = useContext(CartContext)

  /* eslint-disable react-hooks/rules-of-hooks */
  const { isFallback } = useRouter()

  const handleNewProduct = () => {
    const productData = {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      description: product.description,
      defaultPriceId: product.defaultPriceId,
    }
    addNewProduct(productData)
  }

  return (
    <>
      {product && (
        <Head>
          <title>{product.name} | Dev Shop</title>
        </Head>
      )}

      <main className="mx-auto my-0 grid max-w-widthProject grid-cols-2 items-stretch gap-16">
        <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-lg bg-gradient p-1">
          {isFallback ? (
            <div className="flex h-[656px] w-[586px] items-center justify-center">
              <Image
                className="animate-spin"
                src={loader}
                alt=""
                width={40}
                height={40}
              />
            </div>
          ) : (
            <Image
              src={product.imageUrl}
              alt=""
              width={520}
              height={480}
              priority
            />
          )}
        </div>
        <div className="flex flex-col ">
          {isFallback ? (
            <div className="flex w-full animate-pulse flex-col gap-8">
              <span className="h-8 bg-gray800" />
              <span className="h-8 bg-gray800" />
              <span className="h-20 bg-gray800" />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl text-gray300">{product.name}</h1>
              <span className="mt-4 block text-3xl text-green300">
                {product.price}
              </span>
              <p className="mt-10 text-lg text-gray300">
                {product.description}
              </p>
            </div>
          )}

          <button
            onClick={handleNewProduct}
            className="mt-auto rounded-lg bg-green500 py-5 text-lg font-bold text-white transition-colors hover:bg-green300"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    /* os ids de prods colocados no path, sao carregados diretamente,
      sem buscas na API
    */
    paths: [],
    fallback: true,
  }
}

// SSG
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // atualiza o conteúdo a cd 2hrs
  }
}
