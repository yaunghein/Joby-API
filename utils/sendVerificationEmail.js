const sendEmail = require('./sendEmail')

const sendVerificationEmail = async ({
	name,
	email,
	verificationToken,
	origin,
}) => {
	const frontendEmailVerificationLink = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`
	const html = `<h4>Hello, ${name},</h4><p>Please confirm your email by clicking on the following link: <a href="${frontendEmailVerificationLink}" target="_blank">Verify Email</a>.</p>`
	return sendEmail({
		to: email,
		subject: 'Email Verification',
		html,
	})
}

module.exports = sendVerificationEmail
