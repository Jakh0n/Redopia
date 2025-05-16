import { getProduct } from '@/actions/user.action'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import CreateOrderButton from '../_components/create-order.btn'

interface ProductPageProps {
	params: Params
}

export async function generateMetadata({ params }: ProductPageProps) {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product

	if (!product) {
		return {
			title: 'Mahsulot topilmadi',
			description: "Kechirasiz, so'ralgan mahsulot mavjud emas",
		}
	}

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [{ url: product.image }],
			title: product.title,
			description: product.description,
		},
	}
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product

	if (!product) return notFound()

	return (
		<section className='container mx-auto py-8'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				<div className='bg-secondary rounded-lg overflow-hidden relative w-full h-[400px] col-span-2 flex items-center justify-center'>
					<Image
						src={product.image}
						width={300}
						height={400}
						className='object-contain max-h-[380px]'
						alt={product.title}
						priority
					/>
				</div>
				<div className='flex flex-col space-y-4 self-start'>
					<h1 className='font-semibold text-2xl tracking-tight'>
						{product.title}
					</h1>
					<Badge className='w-fit' variant='secondary'>
						# {product.category}
					</Badge>
					<p className='text-sm text-muted-foreground leading-relaxed'>
						{product.description}
					</p>
					<p className='font-bold text-2xl'>{formatPrice(+product.price)}</p>
					<CreateOrderButton />
					<div className='text-xs bg-muted p-3 rounded-md mt-4'>
						To'lovingiz bizda xavfsiz. Biz kredit karta ma'lumotlarini
						saqlamaymiz. To'lov jarayoni uchun Payme xizmatidan foydalanamiz.
					</div>
				</div>
			</div>
		</section>
	)
}

export default ProductPage
