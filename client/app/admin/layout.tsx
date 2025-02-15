import React from 'react'
import Sidebar from './_components/sidebar'
import Navbar from '@/components/shared/navbar'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	if (!session) redirect('/sign-in')
	if (session.currentUser?.role !== 'admin') return redirect('/')

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
