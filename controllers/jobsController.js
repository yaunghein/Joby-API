const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')
const Job = require('../models/Job')

const getJobs = async (req, res) => {
	const jobs = await Job.find({ createdBy: req.user.userID }).sort(
		'createdAt'
	)
	res.status(StatusCodes.OK).json({ count: jobs.length, jobs })
}

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userID // attach the created job to the related user
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}

const getJob = async (req, res) => {
	const {
		user: { userID },
		params: { id: jobID },
	} = req
	const job = await Job.findOne({ _id: jobID, createdBy: userID })
	if (!job) {
		throw new NotFoundError(`No job with ID: ${jobID}`)
	}
	res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
	const {
		body: { company, position },
		user: { userID },
		params: { id: jobID },
	} = req
	if (!company || !position) {
		throw new BadRequestError('Please provide company and position.')
	}
	const job = await Job.findOneAndUpdate(
		{ _id: jobID, createdBy: userID },
		req.body,
		{ new: true, runValidators: true }
	)
	if (!job) {
		throw new NotFoundError(`No job with ID: ${jobID}`)
	}
	res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
	const {
		user: { userID },
		params: { id: jobID },
	} = req
	const job = await Job.findOneAndDelete({ _id: jobID, createdBy: userID })
	if (!job) {
		throw new NotFoundError(`No job with ID: ${jobID}`)
	}
	res.status(StatusCodes.OK).send()
}

module.exports = { getJobs, createJob, getJob, updateJob, deleteJob }
