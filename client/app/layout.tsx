import type { Metadata } from 'next'
import './globals.css'
import { ChildProps } from '@/types'
import { Montserrat } from 'next/font/google'
import SessionProvider from '@/components/providers/session.provider'
import { Toaster } from '@/components/ui/toaster'

const montserrat = Montserrat({
	subsets: ['cyrillic', 'latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-montserrat',
})

export const metadata: Metadata = {
	title: 'Seleor e-commerce',
	description: 'Seleor e-commerce website built with Next.js',
	icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }: ChildProps) {
	return (
		<SessionProvider>
			<html lang='en'>
				<body
					className={`${montserrat.variable} overflow-x-hidden antialiased`}
				>
					<div className='container max-w-6xl mt-24'>{children}</div>
					<Toaster />
				</body>
			</html>
		</SessionProvider>
	)
}
