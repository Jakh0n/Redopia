'use client'

import { addFavorite } from '@/actions/user.action'

import useAction from '@/hooks/use-action'
import { toast } from '@/hooks/use-toast'
import { cn, formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, MouseEvent, useState } from 'react'
import NoSSR from 'react-no-ssr'
import { Button } from '../ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip'

interface Props {
	product: IProduct
}

const ProductCard: FC<Props> = ({ product }) => {
	const { isLoading, onError, setIsLoading } = useAction()
	const router = useRouter()
	const [isHovering, setIsHovering] = useState(false)

	const onFavourite = async (e: MouseEvent) => {
		e.stopPropagation()
		setIsLoading(true)
		const res = await addFavorite({ id: product._id })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'Added to favorites' })
			setIsLoading(false)
		}
	}

	return (
		<div
			onClick={() => router.push(`/product/${product._id}`)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className='cursor-pointer group rounded-lg overflow-hidden transition-all duration-300 hover:translate-y-[-5px] bg-white dark:bg-gray-800 shadow-md hover:shadow-xl'
		>
			<div className='relative h-[250px] overflow-hidden'>
				<Image
					src={product.image!}
					fill
					className={cn(
						'mx-auto object-contain transition-transform duration-500',
						isHovering && 'scale-105'
					)}
					alt={product.title!}
				/>
				<div className='absolute right-2 top-2 z-40'>
					<Button
						size={'icon'}
						disabled={isLoading}
						onClick={onFavourite}
						variant='secondary'
						className='rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white'
					>
						<Heart className='h-5 w-5' />
					</Button>
				</div>
				<div className='absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
					<span className='text-xs font-medium text-white px-2 py-1 rounded-full bg-primary/80'>
						{product.category}
					</span>
				</div>
			</div>
			<div className='p-4'>
				<div className='flex justify-between items-center mb-2'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<h1 className='font-bold text-base line-clamp-1 cursor-pointer'>
									{product.title}
								</h1>
							</TooltipTrigger>
							<TooltipContent>
								<p className='max-w-xs '>{product.title}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<NoSSR>
						<p className='font-semibold text-primary'>
							{formatPrice(product.price!)}
						</p>
					</NoSSR>
				</div>

				<p className='text-xs text-muted-foreground line-clamp-2'>
					{product.description || 'No description available'}
				</p>
			</div>
		</div>
	)
}

export default ProductCard
