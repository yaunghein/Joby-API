const express = require('express')
const {
	uploadAvatar,
	updateUser,
	getUser,
	getTotalUsersCount,
} = require('../controllers/usersController')
const authenticationMiddleware = require('../middlewares/authentication')

const router = express.Router()

router.get('/', authenticationMiddleware, getUser)
router.patch('/', authenticationMiddleware, updateUser)
router.get('/count', getTotalUsersCount)
router.post('/uploads', authenticationMiddleware, uploadAvatar)

module.exports = router
