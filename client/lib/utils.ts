import { TransactionState } from '@/constants'
import { QueryProps } from '@/types'
import clsx, { ClassValue } from 'clsx'
import qs from 'query-string'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
	return new Intl.NumberFormat('kr-KR', {
		style: 'currency',
		currency: 'KRW',
	}).format(price)
}

// export function formUrlQuery({ key, params, value }: QueryProps) {
// 	const currentUrl = qs.parse(params)
// 	currentUrl[key] = value!
// 	return qs.stringifyUrl(
// 		{ url: window.location.pathname, query: currentUrl },
// 		{ skipNull: true }
// 	)
// }

// export function removeUrlQuery({ params, key }: QueryProps) {
// 	const currentUrl = qs.parse(params)
// 	delete currentUrl[key]
// 	return qs.stringifyUrl(
// 		{ url: window.location.pathname, query: currentUrl },
// 		{ skipNull: true }
// 	)
// }

export function formUrlQuery({ key, params, value }: QueryProps) {
	const currentUrl = qs.parse(params)
	currentUrl[key] = value!
	return qs.stringifyUrl(
		{ url: window.location.pathname, query: currentUrl },
		{ skipNull: true }
	)
}

export function removeUrlQuery({ key, params }: QueryProps) {
	const currentUrl = qs.parse(params)
	delete currentUrl[key]
	return qs.stringifyUrl(
		{ url: window.location.pathname, query: currentUrl },
		{ skipNull: true }
	)
}
export const getStatusText = (status: number) => {
	switch (status) {
		case TransactionState.Pending:
			return 'Pending'
		case TransactionState.Paid:
			return 'Paid'
		case TransactionState.PaidCanceled:
			return 'Cancelled'
		case TransactionState.PendingCanceled:
			return 'Cancelled'
		default:
			return 'Unknown'
	}
}

export const getStatusVariant = (status: number) => {
	switch (status) {
		case TransactionState.Pending:
			return 'outline'
		case TransactionState.Paid:
			return 'default'
		case TransactionState.PaidCanceled:
			return 'destructive'
		case TransactionState.PendingCanceled:
			return 'destructive'
		default:
			return 'secondary'
	}
}

export const sliceText = (text: string, length: number) => {
	if (text.length > length) {
		return text.slice(0, length) + '...'
	}
	return text
}
