import ProductCard from '@/components/card/product.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { products } from '@/constants'
import React from 'react'

function HomePage() {
	return (
		<>
			<div className='flex items-center justify-between'>
				<h1 className='font-bold'>Products</h1>
				<Filter />
			</div>

			<Separator className='my-4' />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
				{products.map(product => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
			<Pagination />
		</>
	)
}
export default HomePage
