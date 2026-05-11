const btnAddTask = document.getElementById("btnAddTask");
const inputTask = document.getElementById("inputTask");
const ul = document.getElementById("listContainer");
let counterTask = 1;

function config() {
  return [
    {
      tag: "li",
      classList: "listItem",
      id: `task-${counterTask}`,
      children: [
        {
          tag: "div",
          classList: "itemTask",
          children: [
            { tag: "div", classList: "iconList" },
            { tag: "span", textContent: inputTask.value },
          ],
        },
        {
          tag: "div",
          classList: "itemButtons",
          children: [
            {
              tag: "button",
              id: `btnEdit-${counterTask}`,
              html: `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-pencil-line-icon lucide-pencil-line"
              >
                <path d="M13 21h8" />
                <path d="m15 5 4 4" />
                <path
                  d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                />
              </svg>`,
            },
            {
              tag: "button",
              id: `btnDel-${counterTask}`,
              html: `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trash2-icon lucide-trash-2"
              >
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>`,
            },
          ],
        },
      ],
    },
  ];
}

function editTask(id) {
  console.log("editTask");
}

function delTask(id) {
  const taskId = id.split("-")[1];
  const task = document.getElementById(`task-${taskId}`);
  task.remove();
  console.log(task);
}

function creatbtns(btn, id) {
  btn.addEventListener("click", (e) => {
    if (id === "btnEdit") {
      editTask(id);
    } else {
      delTask(id);
    }
  });
}

function createtask(config, pai) {
  config.forEach((objElement) => {
    let element = document.createElement(objElement.tag);
    if (objElement.classList) {
      element.classList.add(objElement.classList);
    }
    if (objElement.id) {
      element.id = objElement.id;
    }
    if (objElement.textContent) {
      element.textContent = objElement.textContent;
    }
    if (objElement.html) {
      creatbtns(element, objElement.id);
      element.innerHTML += objElement.html;
    }
    pai.appendChild(element);
    if (objElement.children) {
      createtask(objElement.children, element);
    }
  });
}

function render() {
  // renderizar a tela, botão addTask ativa apenas quando tiver algo digitado  no input
}

btnAddTask.addEventListener("click", () => {
  createtask(config(), ul);
  counterTask++;
});

render();
