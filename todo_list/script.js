const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

//if there are todos in local storage, get them and add them to the list
const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    //if the todo is passed as an argument, we set the todoText to the todo.text(for the storage part)
    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        //we check if the todo is completed and if it is we add the class completed
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        //for left click we toggle the completed class
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        //for right click we remove the todo from the list
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            //we update the local storage
            updateLS()
        }) 

        //we add the todo to the list
        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    //we create an array of all the li elements
    todosEl = document.querySelectorAll('li')

    //we create an array for the todos
    const todos = []

    todosEl.forEach(todoEl => {
        //we add the todo to the array as an object
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    //we save the array in the local storage
    localStorage.setItem('todos', JSON.stringify(todos))
}