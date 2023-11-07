import { Bag, X } from 'phosphor-react'
import { ProductContainer } from './productContainer'
import { useContext, useEffect, useRef, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CartContext } from '@/contexts/CartContext'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { priceFormatter } from '@/utils/formatedPrice'

interface ProductCheckoutProps {
  priceId: string
  quantity: number
}

export function Sidebar() {
  const { products } = useContext(CartContext)
  const [open, setOpen] = useState(false)
  const [parent] = useAutoAnimate()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)
  const [getTotalCartValue, setTotalCartValue] = useState(0)

  const cartItemCount = products?.length

  const handleBuyProduct = async () => {
    alert('psiu')
  }

  // fecha carrinho
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    // fica ouvindo os eventos em document
    document.addEventListener('click', handleClickOutside)
  }, [])

  // soma o total do carrinho
  useEffect(() => {
    let sum = 0
    products.forEach((prod) => {
      sum += prod.price
    })
    setTotalCartValue(sum)
  }, [products])

  return (
    <Collapsible.Root ref={containerRef} open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger className={`${open && 'absolute hidden'}`}>
        <div className="relative h-12 w-12 cursor-pointer rounded-md bg-gray800 p-3 transition hover:bg-opacity-70">
          <Bag size={24} className="text-white hover:text-gray100 " />
          {products.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green500 text-sm font-bold">
              {products.length}
            </span>
          )}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content ref={parent}>
        <div className="fixed right-0 top-0 flex min-h-screen w-[480px] flex-col justify-center rounded-md bg-gray800 px-12 shadow-3xl">
          <button
            onClick={() => {
              setOpen(false)
            }}
            className="absolute right-6 top-6 text-gray400 transition-colors hover:text-green500"
          >
            <X size={24} weight="bold" />
          </button>

          {products.length > 0 ? (
            <>
              <h2 className="mb-8 mt-[72px] text-xl font-bold text-gray100">
                Sacola de compras
              </h2>

              <div className="flex flex-col gap-6">
                {products.map((prod, i) => (
                  <ProductContainer
                    key={`${prod.id}${i}`}
                    id={prod.id}
                    image={prod.imageUrl}
                    description={prod.name}
                    price={prod.price}
                    size={prod.size!}
                  />
                ))}
              </div>

              <footer className="mb-12 mt-auto flex w-full flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-gray100">Quantidade</span>
                  <span className="text-lg">{cartItemCount} itens</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-lg font-bold">Valor total</span>
                  <span className="text-2xl font-bold">
                    {priceFormatter(getTotalCartValue)}
                  </span>
                </div>

                <button
                  onClick={handleBuyProduct}
                  disabled={isCreatingCheckout}
                  className={twMerge(
                    'mt-14 cursor-pointer rounded-lg p-5',
                    'font-bold uppercase text-white',
                    'transition-colors',
                    'bg-green500 enabled:hover:bg-green300',
                    'disabled:cursor-not-allowed disabled:opacity-70',
                  )}
                >
                  {isCreatingCheckout ? 'Processando...' : 'Finalizar compra'}
                </button>
              </footer>
            </>
          ) : (
            <div className="flex flex-col gap-4 self-center text-xl text-gray300">
              O seu carrinho está vazio!
              <span className="">
                <Link
                  href="/"
                  className="font-bold transition-colors hover:text-green500"
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  Clique aqui
                </Link>{' '}
                para comprar!
              </span>
            </div>
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
