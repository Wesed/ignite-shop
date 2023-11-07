import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  description?: string
  size?: number
}

interface CartContextProps {
  products: Product[]
  addNewProduct: (data: Product) => void
  deleteProduct: (id: string, size: number) => void
  emptyCart: () => void
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

  const addNewProduct = (data: Product) => {
    const newProductArray = [...products, data]
    setProducts(newProductArray)

    const productsJSON = JSON.stringify(newProductArray)
    localStorage.setItem('@dev-shop:products', productsJSON)
  }

  const deleteProduct = (id: string, size: number) => {
    const updatedProductsAfterRemove = products.filter((prod) => {
      return prod.id !== id || prod.size !== size
    })
    setProducts(updatedProductsAfterRemove)

    const productsJSON = JSON.stringify(updatedProductsAfterRemove)
    localStorage.setItem('@dev-shop:products', productsJSON)
  }

  const emptyCart = useCallback(() => {
    setProducts([])
    localStorage.removeItem('@dev-shop:products')
  }, [])

  return (
    <CartContext.Provider
      value={{ addNewProduct, products, deleteProduct, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
