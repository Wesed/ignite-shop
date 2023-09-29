import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { twMerge } from 'tailwind-merge'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Dev Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="mx-auto my-0 flex h-[656px] flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray100">Compra efetuada!</h1>
        <div className="mb-8 mt-16 flex h-36 w-full max-w-[130px] items-center justify-center rounded-lg bg-gradient p-1">
          <Image
            src={product.imageUrl}
            width={120}
            height={110}
            alt=""
            objectFit="cover"
          />
        </div>
        <p className="max-w-[560px] text-center text-2xl text-gray300">
          Uhuul <strong className="text-gray100">{customerName}</strong>, sua
          <strong className="text-gray100"> {product.name}</strong> já está a
          caminho da sua casa.
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const customerName = session.customer_details!.name
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const product = session!.line_items!.data[0]!.price!.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
