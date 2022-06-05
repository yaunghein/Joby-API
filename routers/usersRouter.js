const express = require('express')
const {
	uploadAvatar,
	updateUser,
	getUser,
} = require('../controllers/usersController')

const router = express.Router()

router.get('/', getUser)
router.patch('/', updateUser)
router.post('/uploads', uploadAvatar)

module.exports = router
