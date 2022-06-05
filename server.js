require('dotenv').config()
require('express-async-errors')

const express = require('express')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connectDB')

// cloudinary setup
const cloudinary = require('cloudinary').v2
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xssClean = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// middlewares
const notFoundMiddleware = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')
const authenticationMiddleware = require('./middlewares/authentication')

// routers
const authRouter = require('./routers/authRouter')
const jobsRouter = require('./routers/jobsRouter')
const usersRouter = require('./routers/usersRouter')

const app = express()
app.set('trust proxy', 1)
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 500,
	})
)
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true }))
app.use(helmet())
app.use(cors())
app.use(xssClean())

app.get('/', (req, res) => res.send('Joby API'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)
app.use('/api/v1/users', authenticationMiddleware, usersRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		console.log('DB connected successfully!')
		app.listen(port, () =>
			console.log(`Server is listening at port ${port}...`)
		)
	} catch (error) {
		console.log(error)
		process.exit()
	}
}

start()
