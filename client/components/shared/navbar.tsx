import React from 'react'
import Logo from './logo'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import UserBox from './user-box'

async function Navbar() {
	const session = await getServerSession(authOptions)
	return (
		<div className='h-20 bg-secondary border-b fixed z-50 inset-0 '>
			<div className='container h-full flex items-center justify-between max-w-6xl'>
				<Logo />
				<div className='flex items-center gap-2 '>
					{session?.currentUser?._id && <UserBox user={session.currentUser} />}
					{!session?.currentUser?._id && (
						<Button asChild size={'icon'}>
							<Link href={'/sign-in'}>
								<User />
							</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
