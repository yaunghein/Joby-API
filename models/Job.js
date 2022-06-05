const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, 'Please provide company name'],
			maxlength: [50, "Company name can't be more than 50 characters"],
		},
		position: {
			type: String,
			required: [true, 'Please provide your position'],
			maxlength: [100, "Position can't be more than 100 characters"],
		},
		status: {
			type: String,
			enum: [
				'pending',
				'interviewed',
				'got offer',
				'got rejected',
				'i rejected',
				'current',
				'goodbye',
			],
			default: 'pending',
		},
		startDate: Date,
		endDate: Date,
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
