'use client'

import { IProduct } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import NoSSR from 'react-no-ssr'
interface Props {
	product: Partial<IProduct>
}
function ProductCard({ product }: Props) {
	const router = useRouter()
	return (
		<>
			<div
				className='cursor-pointer'
				onClick={() => router.push(`/product/${product._id}`)}
			>
				<div className='group relative bg-secondary'>
					<Image
						src={product.image!}
						alt={product.title!}
						width={300}
						height={300}
						className='mx-auto'
					/>
					<div className='absolute right-0 top-0 z-50 opacity-0 group-hover:opacity-100 transition-all'>
						<Button size={'icon'}>
							<Heart />
						</Button>
					</div>
				</div>
				<div className='flex items-center justify-between mt-2'>
					<h1 className='font-bold'>{product.title}</h1>
					<NoSSR>
						<p className='font-medium'>{formatPrice(product.price!)}</p>
					</NoSSR>
				</div>
				<p className='text-muted-foreground text-xs'>{product.description}</p>
			</div>
		</>
	)
}

export default ProductCard
