import React from 'react'
import Logo from './logo'
import { Button } from '../ui/button'
import { User } from 'lucide-react'

function Navbar() {
	return (
		<div className='h-20 bg-secondary border-b fixed z-50 inset-0 '>
			<div className='container h-full flex items-center justify-between max-w-6xl'>
				<Logo />
				<div className='flex items-center gap-2 '>
					<Button size={'icon'}>
						<User />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
