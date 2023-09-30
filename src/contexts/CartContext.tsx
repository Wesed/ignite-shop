import { ReactNode, createContext, useEffect, useState } from 'react'

export interface Product {
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

  useEffect(() => {
    const getProductsFromStorage = () => {
      const productStateAsJSON = localStorage.getItem('@dev-shop:products')

      if (productStateAsJSON) {
        return JSON.parse(productStateAsJSON)
      }

      return []
    }

    setProducts(getProductsFromStorage())
  }, [])

  const AddNewProduct = (data: Product) => {
    const newProductArray = [...products, data]

    setProducts(newProductArray)

    const productsJSON = JSON.stringify(newProductArray)
    localStorage.setItem('@dev-shop:products', productsJSON)
  }

  return (
    <CartContext.Provider value={{ AddNewProduct, products }}>
      {children}
    </CartContext.Provider>
  )
}
