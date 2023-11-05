import { z } from 'zod'
import data from '../data.json'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q'))

  const products = data.products.filter((products) =>
    products.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  )

  if (!products) {
    return Response.json(
      { message: 'Product not found' },
      {
        status: 400,
      },
    )
  }

  return Response.json(products)
}
