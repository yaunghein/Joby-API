const fs = require('fs')
const bcrypt = require('bcryptjs')
const cloudinary = require('cloudinary').v2
const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { NotFoundError, BadRequestError } = require('../errors')

const getUser = async (req, res) => {
	const { userID } = req.user
	const user = await User.findOne({ _id: userID }).select(
		'-password -_id -__v'
	)
	if (!user) {
		throw new NotFoundError(`No user with ID: ${userID}`)
	}
	res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
	const { userID } = req.user
	if (req.body.password) {
		const salt = await bcrypt.genSalt(10)
		req.body.password = await bcrypt.hash(req.body.password, salt)
	}
	const user = await User.findOneAndUpdate(
		{ _id: userID },
		{
			_id: userID, // I have to do this, or it will update document's _id
			...req.body,
		},
		{
			new: true,
			runValidators: true,
		}
	).select('_id name')
	if (!user) {
		throw new NotFoundError(`No user with ID: ${userID}`)
	}
	res.status(StatusCodes.OK).json({ user })
}

const uploadAvatar = async (req, res) => {
	if (!req.files) {
		throw new BadRequestError('No image uploaded.')
	}
	const avatar = req.files.image
	if (!avatar.mimetype.startsWith('image')) {
		throw new BadRequestError('Please upload image.')
	}
	const maxSize = 5 * 1024 * 1024
	if (avatar.size > maxSize) {
		throw new BadRequestError('Please upload image smaller than 5MB.')
	}

	const response = await cloudinary.uploader.upload(avatar.tempFilePath, {
		use_filename: true,
		folder: 'joby',
	})
	fs.unlinkSync(avatar.tempFilePath) // remove temp image file

	res.status(StatusCodes.OK).json({ url: response.secure_url })
}

module.exports = { uploadAvatar, updateUser, getUser }
