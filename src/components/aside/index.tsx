import shirt1 from '@/assets/shirt1.png'
import shirt2 from '@/assets/shirt2.png'
import shirt3 from '@/assets/shirt3.png'
import { X } from 'phosphor-react'
import { ProductContainer } from './productContainer'
import { useState } from 'react'

export function Aside() {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <aside className="absolute right-0 z-10 flex min-h-screen w-[480px] flex-col bg-gray800 px-12 shadow-sm">
      <button className="absolute right-6 top-6 text-gray400 transition-colors hover:text-green500">
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
    </aside>
  )
}
