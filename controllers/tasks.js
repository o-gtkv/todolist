const taskModel = require('../models/task')

const getTasks = async (req, res) => {
    const tasks = await taskModel.find({})
    res.json(tasks)
}

const saveTask = async (req, res) => {
    await taskModel.findOneAndUpdate({ _id: req.body.id }, { completed: req.body.completed })
    res.end()
}

const deleteTask = async (req, res) => {
    await taskModel.deleteOne({ _id: req.body.id })
    res.end()
}

const addTask = async (req, res) => {
    const task = await taskModel.create({
        ...req.body
    })
    res.json(task)
}

module.exports = {
    getTasks,
    saveTask,
    deleteTask,
    addTask
}

