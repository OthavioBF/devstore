import { ImageResponse } from 'next/server'
import colors from 'tailwindcss/colors'

import { env } from '@/env'
import { api } from '@/service/api'
import { Product } from '@/@types/product'

export const runtime = 'edge'

export const alt = ''

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OgImage({
  params,
}: {
  params: { slug: string }
}) {
  const response = await api(`/products/${params.slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  })

  const product: Product = await response.json()

  const productImageURL = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
