import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import loader from '@/assets/loader.svg'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import Head from 'next/head'
import { CartContext } from '@/contexts/CartContext'
import { ProductDocument } from '@/generated/graphql'
import { client, ssrCache } from '@/lib/urql'
import { twMerge } from 'tailwind-merge'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface Image {
  url: string
}

interface ProductProps {
  product: {
    id: string
    name: string
    price: number
    images: string[]
    sizes: string[]
  }
}

export default function Product({ product }: ProductProps) {
  const { addNewProduct } = useContext(CartContext)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43]

  /* eslint-disable react-hooks/rules-of-hooks */
  const { isFallback } = useRouter()

  const handleNewProduct = () => {
    // verificar se selecionou um numero
    const productData = {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: product.price,
      size: selectedSize!,
    }
    addNewProduct(productData)
  }

  return (
    <>
      {product && (
        <Head>
          <title>{`${product.name} | Dev Shop`}</title>
        </Head>
      )}

      <main className="mx-auto mt-52 grid max-w-widthProject grid-cols-product items-stretch gap-16">
        <div>
          {isFallback && (
            <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-lg bg-gradient p-1">
              <div className="flex h-[656px] w-[586px] items-center justify-center">
                <Image
                  className="animate-spin"
                  src={loader}
                  alt=""
                  width={40}
                  height={40}
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {product?.images.map((prod, i) => (
              <div
                key={prod}
                className={twMerge(
                  'h-[350px] w-[350px]',
                  'items-center justify-center p-1',
                  'bg-gray800',
                  `${i % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`,
                )}
              >
                <Zoom>
                  <Image
                    src={prod}
                    alt=""
                    width={350}
                    height={350}
                    className="max-h-[350px] object-cover"
                    priority
                  />
                </Zoom>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {isFallback ? (
            <div className="flex w-full animate-pulse flex-col gap-8">
              <span className="h-8 bg-gray800" />
              <span className="h-8 bg-gray800" />
              <span className="h-20 bg-gray800" />
            </div>
          ) : (
            <div className="mb-10 flex flex-col gap-5">
              <h1 className="text-3xl text-gray100">{product.name}</h1>
              <span className="mt-4 block text-3xl text-green300">
                R$ {product.price.toFixed(2)}
              </span>
              {/* tamanhos */}
              <div className="flex flex-wrap gap-3 text-gray300">
                {sizes.map((size) => (
                  <label key={size}>
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      className="peer hidden"
                      onChange={() => {
                        setSelectedSize(size)
                      }}
                    />
                    <div
                      className={twMerge(
                        'cursor-pointer rounded-lg px-5 py-3',
                        'hover:transition-all',
                        'bg-gray800 hover:bg-gray800/60 hover:text-gray100',
                        'peer-checked:bg-green500 peer-checked:text-gray100',
                      )}
                    >
                      {size}
                    </div>
                  </label>
                ))}
              </div>

              <p className="text-lg text-gray300">product.description</p>
            </div>
          )}

          <button
            onClick={handleNewProduct}
            className=" rounded-lg bg-green500 py-5 text-lg font-bold text-white transition-colors hover:bg-green300"
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
    /* os slugs de prods colocados no path, sao carregados diretamente,
      sem buscas na API
    */
    paths: [],
    fallback: true,
  }
}

// SSG
export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({
  params,
}) => {
  const slug = params?.slug
  const { data } = await client.query(ProductDocument, { slug }).toPromise()

  return {
    props: {
      product: {
        id: data.product.id,
        name: data.product.name,
        price: data.product.price,
        images: data.product.images.map((image: Image) => image.url),
        sizes: data.product.size,
      },
      urqlState: ssrCache.extractData(),
    },
    revalidate: 60 * 60 * 1, // atualiza o conteúdo a cd 2hrs
  }
}
