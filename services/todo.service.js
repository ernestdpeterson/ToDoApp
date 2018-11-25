/*eslint-env jquery*/
/* global state */

var state = {
    todos: [
        {id: 1, task: 'Get the training done!', status: true, edit: false},
        {id: 2, task: 'Ensure I understand it', status: false, edit: false},
        {id: 3, task: 'Be Happy, Don\'t Worry', status: false, edit: false},
    ]
};

var todoService = {
    getAll: function() {
        return state.todos;
    },
    addTodo: function(newTodo) {
        newTodo.id = state.todos.length + 1;
        state.todos = [...state.todos, newTodo];
    },
    updateTodo: function(todoId, value) {
        let todo = todoService.findTodo(todoId);
        todo.task = value;
    },
    findTodo: function(todoId) {
        let todo = state.todos.find((todo) => {
            return (todo.id == todoId);
        });
        return todo;
    },
    removeTodo: function(todoId) {
        let todos = state.todos.filter((todo) => {
            return todo.id != todoId;
        });
        state.todos = [...todos];
    },
    toggleEdit: function(todoId) {
        let todo = todoService.findTodo(todoId);
        todo.edit = !todo.edit;
        return todo;
    },
    toggleComplete: function(todoId) {
        let currentTodo;
        let todos = state.todos.map((todo) => {
            if(todo.id == todoId) {
                currentTodo = todo;
                todo.status = !todo.status;
            }
            return todo;
        });
        state.todos = [...todos];
        return currentTodo;
    }
};