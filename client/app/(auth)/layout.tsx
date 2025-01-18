import Navbar from '@/components/shared/navbar'
import { ChildProps } from '@/types'
import React from 'react'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main className='flex justify-center  mt-44'>{children}</main>
		</div>
	)
}

export default Layout
