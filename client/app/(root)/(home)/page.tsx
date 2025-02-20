import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { products } from '@/constants'
import { SearchParams } from '@/types'
import React, { FC } from 'react'

interface Props {
	searchParams: SearchParams
}
const Page = async ({ searchParams }: Props) => {
	const { q, filter, category, page } = await searchParams
	const res = await getProducts({
		searchQuery: `${q || ''}`,
		filter: `${filter || ''}`,
		category: `${category || ''}`,
		page: `${page || '1'}`,
	})

	const products = res?.data?.products

	const isNext = res?.data?.isNext || false
	return (
		<>
			<div className='flex items-center justify-between '>
				<h1 className='font-bold'>Products</h1>
				<div className='max-sm:hidden '>
					<Filter />
				</div>
			</div>

			<Separator className='my-4' />

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{products &&
					products.map(product => (
						<ProductCard key={product._id} product={product} />
					))}
			</div>
			<Pagination isNext={isNext} pageNumber={page ? +page : 1} />
		</>
	)
}
export default Page
