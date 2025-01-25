import { useState } from 'react'
import { toast } from './use-toast'

function UseAction() {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	function onError(message: string) {
		setIsLoading(false)
		toast({ description: message, variant: 'destructive' })
	}
	return { isLoading, setIsLoading, onError }
}

export default UseAction
