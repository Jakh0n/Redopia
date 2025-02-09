import { getOrders } from '@/actions/user.action'
import Filter from '@/components/shared/filter'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { products } from '@/constants'
import { formatPrice } from '@/lib/utils'
import { SearchParams } from '@/types'
import React, { FC } from 'react'
import { format } from 'date-fns'

interface Props {
	searchParams: SearchParams
}
const Page: FC<Props> = async props => {
	const searchParams = await props.searchParams
	const res = await getOrders({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		page: `${searchParams.page || '1'}`,
	})

	const orders = res?.data?.orders
	const isNext = res?.data?.isNext || false

	return (
		<>
			<div className='flex justify-between items-center w-full'>
				<h1 className='text-xl font-bold'>Orders</h1>
				<Filter />
			</div>

			<Separator className='my-3' />

			<Table className='text-sm'>
				<TableCaption>A list of your recent orders.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Product</TableHead>
						<TableHead>Order time</TableHead>
						<TableHead className='text-right'>Updated time</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders && orders.length === 0 && (
						<TableRow>
							<TableCell colSpan={5} className='text-center'>
								No orders found.
							</TableCell>
						</TableRow>
					)}
					{orders &&
						orders.map(order => (
							<TableRow key={order._id}>
								<TableCell>{order.product.title}</TableCell>
								<TableCell>
									<Badge>{order.status}</Badge>
								</TableCell>
								<TableCell>{formatPrice(order.price)}</TableCell>
								<TableCell>
									{format(new Date(order.createdAt), 'dd-MMM yyyy')}
								</TableCell>
								<TableCell className='text-right'>
									{format(new Date(order.updatedAt), 'dd-MMM hh:mm a')}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
