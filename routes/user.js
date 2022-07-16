const express = require('express')
const { register, login } = require('../controllers/user')

const router = express.Router()
router.get('/login', login)
router.post('/register', register)

module.exports = router