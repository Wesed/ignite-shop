import { twMerge } from 'tailwind-merge'

export default function product() {
  return (
    <main className="mx-auto my-0 grid max-w-widthProject grid-cols-2 items-stretch gap-16">
      {/* img container */}
      <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-lg bg-gradient p-1">
        aa
      </div>
      {/* product details */}
      <div className="flex flex-col ">
        <h1 className="text-3xl text-gray300">Camiseta X</h1>
        <span className="mt-4 block text-3xl text-green300">R$ 79,90</span>
        <p className="mt-10 text-lg text-gray300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam minus
          odit, aut possimus quisquam officia! Doloribus ipsa optio porro
          maiores, culpa repellendus enim quos? Repellendus tempora beatae
          impedit ullam at?
        </p>

        <button
          className={twMerge(
            'mt-auto cursor-pointer rounded-lg p-5',
            'font-bold uppercase text-white',
            'transition-colors',
            'bg-green500 hover:bg-green300',
          )}
        >
          Comprar agora
        </button>
      </div>
    </main>
  )
}
