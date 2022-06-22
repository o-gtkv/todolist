const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: String,
    completed: Boolean
})

const taskModel = mongoose.model('tasks', taskSchema)

module.exports = taskModel