window.onload = function () {
    const addTaskButton = document.querySelector('.todo__button');
    const taskInput = document.querySelector('.todo__input');
    const todoList = document.querySelector('.todo__list');
    const clearButton = document.querySelector('.todo__clear');

    let tasks = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'));

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function fillTodoList() {
        todoList.innerHTML = '';
        for (let task in tasks) {
            const todoItem = document.createElement('div');
            todoItem.className = 'item';
            todoItem.innerHTML = `
                <input class="item__text" type="text" value="${tasks[task]}" readonly>
                <img src="img/edit.svg" alt="" class="item__edit">
                <img src="img/delete.svg" alt="" class="item__delete">       
            `;
            todoList.appendChild(todoItem);
        }

        const deleteButtons = document.querySelectorAll('.item__delete');
        const editButtons = document.querySelectorAll('.item__edit');
        const itemsText = document.querySelectorAll('.item__text');
        for (let i = 0; i < tasks.length; i++) {
            deleteButtons[i].addEventListener('click', () => {
                tasks.splice(i, 1);
                updateLocalStorage();
                fillTodoList();
            })
            editButtons[i].addEventListener('click', () => {
                itemsText[i].removeAttribute('readonly');
                itemsText[i].focus();
                itemsText[i].style.outline = '1px solid #E7EAED'
            })
            itemsText[i].addEventListener('blur', () => {
                itemsText[i].readOnly = true;
                tasks[i] = itemsText[i].value;
                itemsText[i].style.outline = 'none'
                updateLocalStorage()
            })
        }

        clearButton.addEventListener('click', () => {
            tasks = [];
            updateLocalStorage()
            fillTodoList();
        })
        if (tasks.length === 0) {
            clearButton.style.display = 'none';
            taskInput.placeholder = 'e.g. eggs';
        } else {
            clearButton.style.display = 'block';
            taskInput.placeholder = ''
        }
    }

    addTaskButton.addEventListener('click', () => {
        if (taskInput.value.length > 0) {
            tasks.push(taskInput.value);
        }
        taskInput.value = '';
        updateLocalStorage();
        fillTodoList()
    })
    fillTodoList();
};

