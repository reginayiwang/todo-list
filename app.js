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

list.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        let btn = event.target;
        todoMap.delete(btn.previousSibling.textContent);
        btn.parentElement.remove();
    } else if (event.target.tagName === "INPUT") {
        let clickedBox = event.target;
        clickedBox.parentElement.style.textDecoration = clickedBox.checked ? "line-through" : "none";
        todoMap.set(clickedBox.nextSibling.textContent, clickedBox.checked);
    }
    
})

window.addEventListener("beforeunload", function() {
    localStorage.setItem("todoMap", JSON.stringify(Array.from(todoMap.entries())));
})