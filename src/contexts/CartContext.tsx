import { ReactNode, createContext, useEffect, useState } from 'react'

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
  const [products, setProducts] = useState<Product[]>(() => {
    // const productsStateAsJSON = localStorage.getItem('@dev-shop:products')

    // if (productsStateAsJSON) {
    //   return JSON.parse(productsStateAsJSON)
    // }

    return []
  })

  useEffect(() => {
    const productsJSON = JSON.stringify(products)
    localStorage.setItem('@dev-shop:products', productsJSON)
  }, [products])

  const AddNewProduct = (data: Product) => {
    setProducts((state) => [...state, data])
  }

  return (
    <CartContext.Provider value={{ AddNewProduct, products }}>
      {children}
    </CartContext.Provider>
  )
}
