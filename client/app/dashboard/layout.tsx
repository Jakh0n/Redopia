import React from 'react'
import Sidebar from './_components/sidebar'
import Navbar from '@/components/shared/navbar'

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Navbar />
			<div className='grid grid-cols-3 gap-4'>
				<div className='col-span-1'>
					<Sidebar />
				</div>
				<div className='col-span-2 pb-10'>{children}</div>
			</div>
		</div>
	)
}

export default Layout
