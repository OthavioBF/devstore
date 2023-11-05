import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { api } from '@/service/api'
import { Product } from '@/@types/product'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60,
    },
  })

  const [highLightedProduct, ...otherProducts]: Product[] =
    await response.json()

  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`/product/${highLightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highLightedProduct.image}
          alt=""
          className="group-hover:scale-105 transition-transform duration-500"
          width={860}
          height={860}
          quality={100}
        />

        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highLightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-5">
            {highLightedProduct.price.toLocaleString('pt-Br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            src={product.image}
            alt=""
            className="group-hover:scale-105 transition-transform duration-500"
            width={860}
            height={860}
            quality={100}
          />
          <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate">{product.title}</span>
            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-5">
              {product.price.toLocaleString('pt-Br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
