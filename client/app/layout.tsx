import type { Metadata } from 'next'
import './globals.css'
import { ChildProps } from '@/types'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
	subsets: ['cyrillic', 'latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-montserrat',
})

export const metadata: Metadata = {
	title: 'eCommerce',
	description:
		'Experience a modern eCommerce platform designed for seamless online shopping. Featuring user-friendly navigation, secure payment options, and an extensive range of products, our platform caters to diverse customer needs. ',
	icons: {
		icon: '/favicon.svg',
	},
}

export default function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en'>
			<body className={`${montserrat.variable} overflow-x-hidden antialiased`}>
				<div className='container max-w-6xl mt-24'>{children}</div>
			</body>
		</html>
	)
}
