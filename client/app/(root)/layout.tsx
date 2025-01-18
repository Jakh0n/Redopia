import Navbar from '@/components/shared/navbar'
import { ChildProps } from '@/types'
import React from 'react'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main className='container max-w-6xl mt-24'>{children}</main>
		</div>
	)
}

export default Layout
