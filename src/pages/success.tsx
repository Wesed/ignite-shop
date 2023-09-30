import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface ProductsData {
  name: string
  imageUrl: string
}

interface SuccessProps {
  customerName: string
  products: ProductsData[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Dev Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="mx-auto my-0 flex h-[656px] flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray100">Compra efetuada!</h1>
        <div className="mb-8 mt-16 flex h-36 w-full max-w-[130px] items-center justify-center rounded-lg bg-gradient p-1">
          {products.map((prod, i) => (
            <Image
              key={i}
              src={prod.imageUrl}
              width={120}
              height={110}
              alt=""
            />
          ))}
        </div>
        {products.length > 1 ? (
          <p className="max-w-[560px] text-center text-2xl text-gray300">
            Uhuul <strong className="text-gray100">{customerName}</strong>, suas
            camisetas já estão a caminho da sua casa.
          </p>
        ) : (
          <p className="max-w-[560px] text-center text-2xl text-gray300">
            Uhuul <strong className="text-gray100">{customerName}</strong>, sua
            <strong className="text-gray100"> </strong> já está a caminho da sua
            casa.{' '}
          </p>
        )}
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  /* 
    se por algum motivo o ID nao vier na URL de sucesss, retorna o usuario
    pra tela principal. O mesmo acontece se tentar acessar sucess na URL
  */
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const products: ProductsData[] = []

  session.line_items?.data.map((product) =>
    products.push({
      name: product.price.product.name,
      imageUrl: product.price?.product.images[0],
    }),
  )
  // console.log(products)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const customerName = session.customer_details!.name

  return {
    props: {
      customerName,
      products,
    },
  }
}
