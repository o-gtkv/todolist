const express = require('express')
const { getTasks, addTask, saveTask, deleteTask } = require('../controllers/tasks')

const router = express.Router()
router.get('/', getTasks)
router.post('/add', addTask)
router.put('/save', saveTask)
router.delete('/delete', deleteTask)

module.exports = router