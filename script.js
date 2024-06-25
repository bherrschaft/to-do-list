// Get references to the DOM elements
const todoInput = document.getElementById('todoInput'); // The input field for entering new to-dos
const addTodoButton = document.getElementById('addTodoButton'); // The button to add a new to-do
const todoList = document.getElementById('todoList'); // The unordered list to display to-dos

// Load to-dos from local storage when the page is loaded
document.addEventListener('DOMContentLoaded', loadTodos);

// Add a new to-do when the button is clicked
addTodoButton.addEventListener('click', addTodo);

// Add a new to-do when the 'Enter' key is pressed in the input field
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to add a new to-do item
function addTodo() {
    const todoText = todoInput.value.trim(); // Get the value from the input field and remove whitespace
    if (todoText === '') return; // Do nothing if the input field is empty

    const li = document.createElement('li'); // Create a new list item (li) element
    li.textContent = todoText; // Set the text content of the list item to the input value

    // Add click event to cross out and remove the item
    li.addEventListener('click', () => {
        li.classList.add('crossed'); // Add the 'crossed' class to apply the line-through style
        setTimeout(() => {
            todoList.removeChild(li); // Remove the list item from the DOM after 1 second
            removeTodoFromStorage(todoText); // Remove the to-do from local storage
        }, 1000);
    });

    todoList.appendChild(li); // Add the new list item to the to-do list
    saveTodoToStorage(todoText); // Save the new to-do to local storage

    todoInput.value = ''; // Clear the input field
}

// Function to save a to-do item to local storage
function saveTodoToStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || []; // Get the current to-dos from local storage, or initialize an empty array if none are found
    todos.push(todo); // Add the new to-do to the array
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the updated array back to local storage
}

// Function to remove a to-do item from local storage
function removeTodoFromStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || []; // Get the current to-dos from local storage
    todos = todos.filter(t => t !== todo); // Filter out the to-do that needs to be removed
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the updated array back to local storage
}

// Function to load to-dos from local storage when the page is loaded
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || []; // Get the current to-dos from local storage, or initialize an empty array if none are found
    todos.forEach(todo => { // Loop through each to-do item
        const li = document.createElement('li'); // Create a new list item (li) element
        li.textContent = todo; // Set the text content of the list item to the to-do text

        // Add click event to cross out and remove the item
        li.addEventListener('click', () => {
            li.classList.add('crossed'); // Add the 'crossed' class to apply the line-through style
            setTimeout(() => {
                todoList.removeChild(li); // Remove the list item from the DOM after 1 second
                removeTodoFromStorage(todo); // Remove the to-do from local storage
            }, 1000);
        });

        todoList.appendChild(li); // Add the list item to the to-do list
    });
}

