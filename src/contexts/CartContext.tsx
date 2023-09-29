import { ReactNode, createContext, useState } from 'react'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

interface CartContextProps {
  products: Product[]
  AddNewProduct: (data: Product) => void
}

export const CartContext = createContext({} as CartContextProps)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [products, setProducts] = useState<Product[]>([])

  const AddNewProduct = (data: Product) => {
    setProducts((state) => [...products, data])
  }

  return (
    <CartContext.Provider value={{ AddNewProduct, products }}>
      {children}
    </CartContext.Provider>
  )
}
