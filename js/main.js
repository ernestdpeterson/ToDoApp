/* eslint-env jquery */
/* global todoService state pagination */

var todoInput = document.getElementById('todo');
var todoList = document.getElementById('todos');
var todoApp = {
    addTodo: function() {
        let todo = todoInput.value;
        let newTodo = {
            task: todo,
            status: false
        };
        todoService.addTodo(newTodo);
        this.appendElement(newTodo);
        pagination.render();
        pagination.gotoLastPage();
    },
    appendElement: function(todo) {
        var itemView = this.parseHtml(this.getItemView(todo));
        todoList.appendChild(itemView);
    },
    parseHtml: function(html) {
        var t = document.createElement('template');
        t.innerHTML = html;
        return t.content.cloneNode(true);
    },
    getItemView: function(todoItem)  {
        let someElement = '';
        let btnText = 'complete';
        let btnUndoRedo = '';
        let btnDelete = `
            <button type='button' onclick='todoApp.removeTodo(this, ${todoItem.id})' class'btn'>Remove Item</button>
        `;
        let todoItemStyle = '';
        let buttonUndoRedoText = btnText;

        if (todoItem.status === true) {
            todoItemStyle = 'todo-completed';
            buttonUndoRedoText = 'undo';
        }

        btnUndoRedo = `
            <button type='button' onclick='todoApp.onToggleTodos(this, ${todoItem.id})' class='btn'>${buttonUndoRedoText}</button>
        `;

        someElement += `
            <li id=${todoItem.id} class=${todoItemStyle}>
                ${todoItem.task}${btnUndoRedo}${btnDelete}
            </li>
        `;
        if (todoItem.edit) {
            someElement = `
                <li id=${todoItem.id} class=${todoItemStyle}>
                    <input onkeyup='todoApp.onUpdateTodo(event, ${todoItem.id})'
                        type='text'
                        value='${todoItem.task}'/>
                    ${btnUndoRedo}
                    ${btnDelete}
                </li>
            `;
        }
        return someElement;
    },
    onToggleTodos: function(el, todoId) {
        // let todoId = el.parentNode.id; // here 'el' is button. the pareent is the <li> element.
        let todo = todoService.toggleComplete(todoId);
        this.updateElement(el.parentNode, todo);
    },
    onUpdateTodo: function(event, todoId) {
        if(event.which == 27) {
            this.toggleEdit(event.target.parentNode, todoId);
        } else if (event.which == 13) {
            todoService.updateTodo(todoId, event.target.value);
            this.toggleEdit(event.target.parentNode, todoId);
        }
    },
    updateElement: function(el, todo) {
        el.outerHTML = this.getItemView(todo);
    },
    onToggleEdit: function() {
        if(event.target.tagName.toLowerCase() != 'li') return;
        let todoId = event.target.id;
        this.toggleEdit(event.target, todoId);
    },
    toggleEdit: function(target, todoId) {
        let todo = todoService.toggleEdit(todoId);
        this.updateElement(target, todo);
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
    removeTodo: function(el, todoId) {
        todoService.removeTodo(todoId);
        this.removeElement(el.parentNode);
        pagination.render();
        pagination.gotoLastPage();
    },
    removeElement: function(el) {
        todoList.removeChild(el);
    },
    render: function(todos) {
        let html = '';
        // let todos = todoService.getAll();

        if (todos.length === 0) {
            todoList.innerHTML = 'No todos yet! Be brave and create some work for yourself.';
            return;
        }
        for (var i = 0; i < todos.length; i++) {
            html += this.getItemView(todos[i]);
        }
        todoList.innerHTML = html;
    }
};

$('#theFooter').append('Good Footer').css('text-align','center');
todoApp.render(todoService.getPageData(1, pagination.pageLength));