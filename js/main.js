/*eslint-env jquery*/

var state = {
    todos: [
        {id: 1, task: 'Get the training done!', status: true},
        {id: 2, task: 'Ensure I understand it', status: false},
        {id: 3, task: 'Be Happy, Don\'t Worry', status: false},
    ]
};
var todoInput = document.getElementById('todo');
var todoList = document.getElementById('todos');
var todoApp = {
    addTodo: function() {
        let todo = todoInput.value;
        let newTodo = {
            id: state.todos.length + 1,
            task: todo,
            status: false
        };
        state.todos = [...state.todos, newTodo];
        this.render();
    },
    toggleTodos: function(el) {
        let todoId = el.parentNode.id;
        let todos = state.todos.map((todo) => {
            if(todo.id == todoId) {
                todo.status = !todo.status;
            }
            return todo;
        });
        state.todos = [...todos];
        this.render();
    },
    removeTodo: function(el) {
        let todoId = el.parentNode.id;

        let todos = state.todos.filter((todo)=> {
            return todo.id != todoId;
        });
        state.todos = [...todos];
        this.render();
    },
    render: function() {
        let someElement = '';
        let btnText = 'complete';
        let btnUndoRedo = '';
        let btnDelete = `
            <button type='button' onclick='todoApp.removeTodo(this)' class'btn'>Remove Item</button>
        `;

        if (state.todos.length === 0) {
            todoList.innerHTML = 'No Todos yet. Be brave and create some todos :-)';
            return;
        } else {
            for (var todoCounter = 0; todoCounter < state.todos.length; todoCounter++) {
                let todo = state.todos[todoCounter];
                let todoItemStyle = '';
                let buttonUndoRedoText = 'complete';

                if(todo.status === true){
                    todoItemStyle = 'todo-completed';
                    buttonUndoRedoText = 'undo';
                }

                btnUndoRedo = `
                    <button type='button' onclick='todoApp.toggleTodos(this)' class='btn'>${buttonUndoRedoText}</button>
                `;

                someElement += `
                    <li id=${todo.id} class=${todoItemStyle}>
                        ${state.todos[todoCounter].task}${btnUndoRedo}${btnDelete}
                    </li>
                `;
            }
            todoList.innerHTML = someElement;
        }
    }
};

$('#theFooter').html('Good Footer').css('text-align','center');
todoApp.render();