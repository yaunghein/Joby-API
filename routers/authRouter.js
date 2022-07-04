const express = require('express')
const {
	register,
	login,
	verifyEmail,
	forgotPassword,
	sendVerificationEmailAgain,
} = require('../controllers/authController')

const router = express.Router()

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/send-verification-email-again', sendVerificationEmailAgain)

module.exports = router
