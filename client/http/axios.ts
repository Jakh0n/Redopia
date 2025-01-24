import axios from 'axios'

export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const axiosClient = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
})
