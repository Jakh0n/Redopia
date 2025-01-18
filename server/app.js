require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

//Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/api', require('./routes/index'))

//Error handling
app.use(errorMiddleware)

const Bootstrap = async () => {
	try {
		const PORT = process.env.PORT || 5000
		mongoose
			.connect(process.env.MONGO_URI)
			.then(() => console.log('Connected to MongoDB'))
		app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
	} catch (error) {
		console.log('Error connecting to MongoDB', error)
	}
}

Bootstrap()
