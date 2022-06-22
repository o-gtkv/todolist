const taskModel = require('../models/task')

const getTasks = async (req, res) => {
    const tasks = await taskModel.find({})
    res.json(tasks)
}

const saveTask = (req, res) => {

}

const deleteTask = (req, res) => {

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

