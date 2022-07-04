const nodemailer = require('nodemailer')

const sendEmail = async ({ to, subject, html }) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.zoho.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	})

	return transporter.sendMail({
		from: '"Joby - The Job Tracking Web App" <yaunghein@zohomail.com>',
		to,
		subject,
		html,
	})
}

module.exports = sendEmail
