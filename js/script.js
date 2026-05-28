const btnAddTask = document.getElementById("btnAddTask");
const inputTask = document.getElementById("inputTask");
const ul = document.getElementById("listContainer");
const counter = document.querySelector(".counter");
const filterContainer = document.querySelector(".filterContainer");
const dropdownTheme = document.querySelector(".dropdownTheme");
let arrayTasks = [];
let arrayFilter = arrayTasks;
let selectedFilter = "all";

function config(task) {
  return [
    {
      tag: "li",
      completed: task.completed,
      editing: task.editing,
      classList: ["listItem"],
      children: [
        {
          tag: "div",
          classList: ["itemTask"],
          children: [
            {
              tag: "div",
              classList: ["iconList"],
              title: "Concluir",
              dataset: {
                action: "finished",
                id: task.id,
              },
            },
            {
              tag: task.editing ? "input" : "span",
              id: task.id,
              classList: ["inputEdit"],
              title: task.editing ? "Enter para salvar" : task.text,
              textContent: task.editing ? "" : task.text,
              value: task.editing ? task.text : "",
              dataset: task.editing ? { action: "save", id: task.id } : null,
            },
          ],
        },
        {
          tag: "div",
          classList: ["itemButtons"],
          children: [
            {
              tag: "button",
              title: "Editar",
              dataset: {
                action: "edit",
                id: task.id,
              },
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
              title: "Excluir",
              dataset: {
                action: "delete",
                id: task.id,
              },
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
            {
              tag: "button",
              classList: ["dropdown"],
              title: "Opções",
              textContent: "⋮",
              dataset: {
                action: "dropdown",
                id: task.id,
              },
              children: [
                {
                  tag: "ul",
                  classList: ["menuHidden", "hide"],
                  dataset: {
                    id: task.id,
                  },
                  children: [
                    {
                      tag: "li",
                      textContent: "Editar",
                      dataset: {
                        action: "edit",
                        id: task.id,
                      },
                    },
                    {
                      tag: "li",
                      textContent: "Deletar",
                      dataset: {
                        action: "delete",
                        id: task.id,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

function saveTasksLocal() {
  localStorage.setItem("tasks", JSON.stringify(arrayTasks));
}

function loadTasksLocal() {
  inputTask.focus();
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    arrayTasks = JSON.parse(tasks);
  }
}

function update() {
  saveTasksLocal();
  render();
}

function saveTaskEdited(id, value) {
  const taskEdited = arrayTasks.find((task) => task.id == id);
  if (value.trim() !== "") {
    taskEdited.text = value;
  }
  taskEdited.editing = false;
  update();
}

function editTask(id) {
  const takEdited = arrayTasks.find((task) => task.id == id);
  takEdited.editing = !takEdited.editing;
  update();
}

function finishTask(id) {
  const taksFinished = arrayTasks.find((task) => task.id === id);
  taksFinished.completed = !taksFinished.completed; // novo toggle : mesma coisa taksFinished.completed = taksFinished.completed ? false : true;
  update();
}

function delTask(id) {
  arrayTasks = arrayTasks.filter((task) => task.id !== id); // atualiza o arrayTask com todos as tasks menos a que tenha o id passado
  update();
}

function openHiddenMenu(id) {
  const hiddenMenu = document.querySelector(
    `button.dropdown [data-id = "${id}"]`,
  );
  hiddenMenu.classList.toggle("hide");
}

function createtask(config, pai) {
  config.forEach((objElement) => {
    let element = document.createElement(objElement.tag);
    if (objElement.classList) {
      element.classList.add(...objElement.classList);
    }
    if (objElement.id) {
      element.id = objElement.id;
    }
    if (objElement.value) {
      element.value = objElement.value;
      element.type = "text";
      element.placeholder = "Digite ....";
    }
    if (objElement.textContent) {
      element.textContent = objElement.textContent;
    }
    if (objElement.title) {
      element.title = objElement.title;
    }

    if (objElement.completed) {
      element.classList.add("completed");
    }
    if (objElement.dataset) {
      for (const key in objElement.dataset) {
        element.dataset[key] = objElement.dataset[key];
      }
    }
    if (objElement.html) {
      element.innerHTML = objElement.html;
    }

    pai.appendChild(element);
    if (objElement.children) {
      createtask(objElement.children, element);
    }
  });
}

function addTask(text) {
  arrayTasks.push({
    id: crypto.randomUUID(),
    text: text,
    completed: false,
    editing: false,
  });
  update();
}

function render() {
  ul.innerHTML = "";

  if (selectedFilter === "all") {
    arrayFilter = arrayTasks;
  }
  if (selectedFilter === "pending") {
    arrayFilter = arrayTasks.filter((task) => !task.completed);
  }
  if (selectedFilter === "completed") {
    arrayFilter = arrayTasks.filter((task) => task.completed);
  }

  arrayFilter.forEach((task) => {
    const taskConfig = config(task);
    createtask(taskConfig, ul);
  });
  counter.textContent = `${arrayFilter.length} / ${arrayTasks.length}`;

  const input = document.querySelector(".inputEdit");
  if (input) {
    input.focus();
  }
}

btnAddTask.addEventListener("click", () => {
  if (inputTask.value.trim() !== "") {
    addTask(inputTask.value);
    inputTask.value = "";
  }
});

ul.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");

  if (!target) return;

  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "delete") {
    delTask(id);
  }
  if (action === "edit") {
    editTask(id);
  }

  if (action === "finished") {
    finishTask(id);
  }

  if (action === "dropdown") {
    openHiddenMenu(id);
  }
});

ul.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  if (event.target.dataset.action === "save") {
    saveTaskEdited(event.target.dataset.id, event.target.value);
  }
});

filterContainer.addEventListener("click", (event) => {
  document.querySelector(".selectedFilter")?.classList.remove("selectedFilter");

  event.target.classList.add("selectedFilter");

  selectedFilter = event.target.dataset.filter;
  event.target.classList.add("selectedFilter");

  render();
});

dropdownTheme.addEventListener("click", (event) => {
  event.target.querySelector(".menuHidden").classList.toggle("hide");
  render();
});

loadTasksLocal();
render();
