import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
	return (
		<Link href={'/'} className='flex items-center gap-2'>
			<Image src={'/favicon.svg'} alt='logo' width={40} height={40} />
			<span className='text-xl font-bold'>Readopia</span>
		</Link>
	)
}

export default Logo
