const sendEmail = require('./sendEmail')

const sendPasswordResetEmail = async ({
	name,
	email,
	passwordToken,
	origin,
}) => {
	const frontendPasswordResetLink = `${origin}/auth/reset-password?token=${passwordToken}&email=${email}`
	const html = `<h4>Hello ${name},</h4><p>To reset your password, please click on the following link: <a href="${frontendPasswordResetLink}" target="_blank">Reset Password</a>.</p>`
	return sendEmail({
		to: email,
		subject: 'Reset Password',
		html,
	})
}

module.exports = sendPasswordResetEmail
