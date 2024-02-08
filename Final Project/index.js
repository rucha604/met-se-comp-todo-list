let addTodo = document.querySelector(".add-todo-button");
let popup = document.querySelector(".popup-todo");
let save = document.querySelector("#save-button");
let close = document.querySelector(".close-button");

addTodo.addEventListener("click", () => {
    popup.classList.add("show-popup");
    popup.classList.remove("close-popup")
})

save.addEventListener("click", () => {
    popup.classList.remove("show-popup");
    popup.classList.add("close-popup");
})

close.addEventListener("click", () => {
    popup.classList.remove("show-popup");
    popup.classList.add("close-popup");
})

let todoName = document.querySelector("#todo-name");
let todoDescription = document.querySelector("#todo-description");
let todoPriority = document.querySelector("#todo-priority");
let taskList = document.querySelector(".task-list");

save.addEventListener("click", () => {
    let uniqueId = Date.now();

    let todoData = {
        name: todoName.value,
        description: todoDescription.value,
        priority: todoPriority.value,
        uId: uniqueId
    }

    let todoList = localStorage.getItem("todos");
    todoList = todoList === null ? [] : JSON.parse(todoList);
    console.log(todoList);

    todoList.unshift(todoData);
    Swal.fire({
        title: "Task Registered!",
        icon: "success"
      });
    localStorage.setItem("todos", JSON.stringify(todoList));
    window.location.reload();
});

let fetchedArray = localStorage.getItem('todos');
fetchedArray = JSON.parse(fetchedArray);

if (fetchedArray.length === 0) {
    taskList.innerHTML = "<p>All Task Accomplished</p>";
} else {
    let newList = fetchedArray.map((value) => {
        let mark;
        if (value.priority === "high") {
            mark = "!!!";
        } else if (value.priority === "medium") {
            mark = "!!"
        } else if (value.priority === "low") {
            mark = "!"
        }

        let bgCol;
        if (mark === "!!!") {
            bgCol = "#EA3D2F";
        } else if (mark === "!!") {
            bgCol = "#367BF5";
        } else if (mark === "!") {
            bgCol = "#2FA84F";
        }

        return `
            <div class="task">   
                <div class="task-details">
                    <h3>${value.name}<span class="priority-mark" style="background-color: ${bgCol};">${mark}</span></h3>
                    <p>${value.description}</p>
                </div>
                <a href="#" id="${value.uId}" class="delete-button"><i class="fa-solid fa-trash-can"></i></a>
            </div>
        `
    });

    taskList.innerHTML = newList.join(" "); 
}

let deleteButton = document.querySelectorAll(".delete-button");
let buttonId;

deleteButton.forEach(function (button) {
    button.addEventListener('click', function() {
        buttonId = button.getAttribute("Id");
        let arrayOfButton = JSON.parse(localStorage.getItem("todos"));
        arrayOfButton = arrayOfButton.filter(object => Number(object.uId) !== Number(buttonId));
        localStorage.setItem('todos', JSON.stringify(arrayOfButton));
        window.location.reload();
    });
});