const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')

const register = async (req, res) => {
	const existingUser = await User.findOne({ email: req.body.email })
	if (existingUser) {
		throw new BadRequestError('User with this email has already existed.')
	}
	const user = await User.create(req.body)
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({
		user: { name: user.name },
		token,
	})
}

const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new BadRequestError('Please provide email and password')
	}
	const user = await User.findOne({ email })
	if (!user) {
		throw new UnauthenticatedError('Invalid credentials.')
	}
	const isPasswordMatch = await user.comparePassword(password)
	if (!isPasswordMatch) {
		throw new UnauthenticatedError('Invalid credentials.')
	}
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({
		user: { name: user.name },
		token,
	})
}

module.exports = { register, login }
