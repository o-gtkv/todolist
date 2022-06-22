const express = require('express')
const { getTasks, addTask } = require('../controllers/tasks')

const router = express.Router()
router.get('/', getTasks)
router.post('/add', addTask)

module.exports = router