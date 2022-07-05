const sendEmail = require('./sendEmail')
const generateEmailTemplate = require('./generateEmailTemplate')

const sendPasswordResetEmail = async ({
	name,
	email,
	passwordToken,
	origin,
}) => {
	const frontendPasswordResetLink = `${origin}/auth/reset-password?token=${passwordToken}&email=${email}`
	const html = generateEmailTemplate({
		name,
		description: 'To reset your password, please click the button below.',
		link: frontendPasswordResetLink,
		buttonLabel: 'Reset Password',
	})
	console.log('reach')
	return sendEmail({
		to: email,
		subject: 'Reset Password',
		html,
	})
}

module.exports = sendPasswordResetEmail
