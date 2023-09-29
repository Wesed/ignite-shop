import shirt1 from '@/assets/shirt1.png'
import shirt2 from '@/assets/shirt2.png'
import shirt3 from '@/assets/shirt3.png'
import { Bag, X } from 'phosphor-react'
import { ProductContainer } from './productContainer'
import { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const [parent, enableAnimations] = useAutoAnimate()

  console.log(open)

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="absolute right-0 z-10 min-h-screen p-0"
    >
      <Collapsible.Trigger className={`${open && 'absolute hidden'}`}>
        <div className="relative top-10 mr-32 h-12 w-12 cursor-pointer rounded-md bg-gray800 p-3 transition hover:bg-opacity-70">
          <Bag size={24} className="text-gray300 hover:text-gray100 " />
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green500 text-sm font-bold">
            1
          </span>
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content ref={parent}>
        <div className="flex min-h-screen w-[480px] flex-col bg-gray800 px-12 shadow-sm">
          <button
            onClick={() => {
              setOpen(false)
            }}
            className="absolute right-6 top-6 text-gray400 transition-colors hover:text-green500"
          >
            <X size={24} weight="bold" />
          </button>

          <h2 className="mb-8 mt-[72px] text-xl font-bold text-gray100">
            Sacola de compras
          </h2>

          <div className="flex flex-col gap-6">
            <ProductContainer
              image={shirt1.src}
              description="Camiseta Beyond the Limits"
              price="R$ 79,90"
            />

            <ProductContainer
              image={shirt2.src}
              description="Camiseta Beyond the Limits"
              price="R$ 89,90"
            />

            <ProductContainer
              image={shirt3.src}
              description="Camiseta Beyond the Limits"
              price="R$ 109,90"
            />
          </div>

          <footer className="mb-12 mt-auto flex w-full flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray100">Quantidade</span>
              <span className="text-lg">3 itens</span>
            </div>

            <div className="flex justify-between">
              <span className="text-lg font-bold">Valor total</span>
              <span className="text-2xl font-bold">R$ 279,70</span>
            </div>

            <button className="mt-14 rounded-lg bg-green500 py-5 text-lg font-bold text-white transition-colors hover:bg-green300">
              Finalizar compra
            </button>
          </footer>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )

  //   <Collapsible.Root
  //     open={open}
  //     onOpenChange={setOpen}
  //     className="absolute right-0 z-10 border"
  //   >
  //     <Collapsible.Trigger>
  //       <div className="relative mr-32 h-12 w-12 cursor-pointer rounded-md bg-gray800 p-3 transition hover:bg-opacity-70">
  //         <Bag size={24} className="text-gray300 hover:text-gray100" />
  //         <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green500 text-sm font-bold">
  //           1
  //         </span>
  //       </div>
  //     </Collapsible.Trigger>
  //     <Collapsible.Content className="flex min-h-screen w-[480px] flex-col bg-gray800 px-12 shadow-sm">
  //       <button className="absolute right-6 top-6 text-gray400 transition-colors hover:text-green500">
  //         <X size={24} weight="bold" />
  //       </button>

  //       <h2 className="mb-8 mt-[72px] text-xl font-bold text-gray100">
  //         Sacola de compras
  //       </h2>

  //       <div className="flex flex-col gap-6">
  //         <ProductContainer
  //           image={shirt1.src}
  //           description="Camiseta Beyond the Limits"
  //           price="R$ 79,90"
  //         />

  //         <ProductContainer
  //           image={shirt2.src}
  //           description="Camiseta Beyond the Limits"
  //           price="R$ 89,90"
  //         />

  //         <ProductContainer
  //           image={shirt3.src}
  //           description="Camiseta Beyond the Limits"
  //           price="R$ 109,90"
  //         />
  //       </div>

  //       <footer className="mb-12 mt-auto flex w-full flex-col gap-2">
  //         <div className="flex justify-between">
  //           <span className="text-gray100">Quantidade</span>
  //           <span className="text-lg">3 itens</span>
  //         </div>

  //         <div className="flex justify-between">
  //           <span className="text-lg font-bold">Valor total</span>
  //           <span className="text-2xl font-bold">R$ 279,70</span>
  //         </div>

  //         <button className="mt-14 rounded-lg bg-green500 py-5 text-lg font-bold text-white transition-colors hover:bg-green300">
  //           Finalizar compra
  //         </button>
  //       </footer>
  //     </Collapsible.Content>
  //   </Collapsible.Root>
  // )
}