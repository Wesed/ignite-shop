import Image from 'next/image'

export interface ProductContainerProps {
  image: string
  description: string
  price: string
}

export function ProductContainer({
  image,
  description,
  price,
}: ProductContainerProps) {
  return (
    <div className="flex items-start gap-5">
      <div className="rounded-lg bg-gradient">
        <Image src={image} alt="" width={100} height={90} />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-lg text-gray300">{description}</span>
        <strong className="mb-2 mt-0.5 text-lg font-bold text-gray100">
          {price}
        </strong>
        <button className="font-bold text-green500 transition-colors hover:text-green300">
          Remover
        </button>
      </div>
    </div>
  )
}
