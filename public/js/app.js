const todoTaskListDOM = document.getElementsByClassName('task-list')[0]

function todoListItem(id, task, completed) {
    return `
    <div class="task-list__item mt-3 p-3" data-task-id=${id}>
        <div class="task-list__task ${completed ? 'text-striked' : ''}">${task}</div>
        <div class="task-list__item-tools">
            <div style="display: flex; align-items: flex-end">
                <div>
                    <input class="task-list__completed" type="checkbox" name="task-is-complete"
                        id="task-is-complete${id}" ${completed ? 'checked' : ''}>
                    <label for="task-is-complete${id}">Completed</label>
                </div>
            </div>
            <div>
                <input class="task-list__delete btn btn-primary mt-3" type="button" value="Save">
                <input class="task-list__save btn btn-primary mt-3" type="button" value="Delete">
            </div>
        </div>
    </div>
`
}

function todoList(taskData) {
    const list = []
    for (let i = 0; i < taskData.length; ++i) {
        list.push(todoListItem(taskData[i].__id, taskData[i].task, taskData[i].completed))
    }
    return list.join('\n')
}

function addTaskToList(task) {
    todoTaskListDOM.innerHTML += '\n' + todoListItem(task.__id, task.task, task.completed)
}

const taskAddDOM = document.getElementsByClassName('new-task__add')[0]
taskAddDOM.addEventListener('click', async (e) => {
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
})