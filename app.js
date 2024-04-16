let form = document.querySelector("form");
let input = document.querySelector("input");
let list = document.querySelector("#todos");
let todoMap = new Map();

function createTodo(todo) {
    let newTodo = document.createElement("li");
    let box = document.createElement("input");
    box.setAttribute("type", "checkbox");
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "material-icons"
    deleteBtn.innerText = "delete";
    newTodo.appendChild(box);
    newTodo.append(todo);
    newTodo.appendChild(deleteBtn);

    box.addEventListener("click", function() {
        if (box.checked) {
            box.parentElement.style.textDecoration = "line-through";
            todoMap.set(box.nextSibling.textContent, true);
        } else {
            box.parentElement.style.textDecoration = "none";
            todoMap.set(box.nextSibling.textContent, false);
        }
        
    });

    deleteBtn.addEventListener("click", function() {
        todoMap.delete(deleteBtn.previousSibling.textContent);
        deleteBtn.parentElement.remove();
    });

    if (todoMap.has(todo)) {
        if (todoMap.get(todo)) {
            box.checked = true;
            box.parentElement.style.textDecoration = "line-through";
        }
    } else {
        todoMap.set(todo, false);
    }

    list.append(newTodo);
    form.reset();
}

if (localStorage.getItem("todoMap")) {
    todoMap = new Map(JSON.parse(localStorage.getItem("todoMap")));
    for (let todo of todoMap.keys()) {
        createTodo(todo);
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    createTodo(input.value);
});

window.addEventListener("beforeunload", function() {
    localStorage.setItem("todoMap", JSON.stringify(Array.from(todoMap.entries())));
})