'use client'
import { ChildProps } from '@/types'
import React from 'react'
import { SessionProvider as Session } from 'next-auth/react'

function SessionProvider({ children }: ChildProps) {
	return <Session>{children}</Session>
}

export default SessionProvider
