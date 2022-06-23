const todoTaskListDOM = document.getElementsByClassName('task-list')[0]

function todoListItem(id, task, completed) {
    return `
    <div class="task-list__item mt-3 p-3" id="task-list__item${id}" data-task-id="${id}">
        <div class="task-list__task ${completed ? 'text-striked' : ''}">${task}</div>
        <div class="task-list__item-tools">
            <div style="display: flex; align-items: flex-end">
                <div>
                    <input class="task-list__completed" type="checkbox" name="task-list__completed"
                        id="task-list__completed${id}" ${completed ? 'checked' : ''}>
                    <label for="task-list__completed${id}">Completed</label>
                </div>
            </div>
            <div>
                <input class="task-list__save btn btn-primary mt-3" id="task-list__save${id}" type="button" value="Save">
                <input class="task-list__delete btn btn-primary mt-3" id="task-list__delete${id}" type="button" value="Delete">
            </div>
        </div>
    </div>
`
}

function todoList(taskData) {
    const list = []
    for (let i = 0; i < taskData.length; ++i) {
        list.push(todoListItem(taskData[i]._id, taskData[i].task, taskData[i].completed))
    }
    return list.join('\n')
}

function setupItemListTools(id) {
    const saveDOM = document.getElementById(`task-list__save${id}`)
    const deleteDOM = document.getElementById(`task-list__delete${id}`)

    saveDOM.addEventListener('click', () => {
        const completedDOM = document.getElementById(`task-list__completed${id}`)
        axios({
            method: 'put',
            url: `http://localhost:3000/tasks/save?id=${id}`,
            data: {
                completed: completedDOM.checked
            }
        })
    })

    deleteDOM.addEventListener('click', async () => {
        await axios({
            method: 'delete',
            url: `http://localhost:3000/tasks/delete?id=${id}`,
        })
        const itemDOM = document.getElementById(`task-list__item${id}`)
        itemDOM.remove()
    })
}

function addTaskToList(task) {
    todoTaskListDOM.innerHTML += '\n' + todoListItem(task._id, task.task, task.completed)
    setupItemListTools(task._id)
}

const taskAddDOM = document.getElementsByClassName('new-task__add')[0]
taskAddDOM.addEventListener('click', async () => {
    const taskTextDOM = document.getElementsByClassName('new-task__text')[0]
    const res = await axios({
        method: 'post',
        url: 'http://localhost:3000/tasks/add',
        data: {
            task: taskTextDOM.value,
            completed: false
        }
    })
    addTaskToList(res.data)
    taskTextDOM.value = ''
})

window.addEventListener('load', async () => {
    const res = await axios({
        method: 'get',
        url: 'http://localhost:3000/tasks'
    })
    todoTaskListDOM.innerHTML = todoList(res.data)

    const taskIsCompleteCollectionDOM = document.getElementsByClassName('task-list__completed')
    const taskTextCollectionDOM = document.getElementsByClassName('task-list__task')
    // const taskDeleteCollectionDOM = document.getElementsByClassName('task-list__delete')

    for (let i = 0; i < taskIsCompleteCollectionDOM.length; ++i) {
        taskIsCompleteCollectionDOM.item(i).addEventListener('click', () => {
            taskTextCollectionDOM.item(i).classList.toggle('text-striked')
        })
    }

    const taskListCollectionDOM = document.getElementsByClassName('task-list__item')
    for (let taskList of taskListCollectionDOM) {
        setupItemListTools(taskList.dataset.taskId)
    }
})
