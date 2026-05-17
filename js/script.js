const btnAddTask = document.getElementById("btnAddTask");
const inputTask = document.getElementById("inputTask");
const ul = document.getElementById("listContainer");
const arrayTasks = [];
let counterTask = 1;

function config(task) {
  return [
    {
      tag: "li",
      completed: task.completed,
      classList: "listItem",
      children: [
        {
          tag: "div",
          classList: "itemTask",
          children: [
            {
              tag: "div",
              classList: "iconList",

              dataset: {
                action: "finished",
                id: task.id,
              },
            },
            {
              tag: "span",
              textContent: task.text,
            },
          ],
        },
        {
          tag: "div",
          classList: "itemButtons",
          children: [
            {
              tag: "button",
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
          ],
        },
      ],
    },
  ];
}

// function editTask(id) {
//   const spanText = document.getElementById(`spanText-${id}`);
//   inputTask.value = spanText.textContent;
//   //   spanText.textContent = inputTask.value;
//   console.log("editTask");
// }

function finishTask(id) {
  const taksFinished = arrayTasks.find((task) => task.id === id);
  taksFinished.completed = taksFinished.completed ? false : true;
  render();
}

function delTask(id) {
  const taskDel = arrayTasks.find((task) => task.id === id);
  const indiceTaskDel = arrayTasks.indexOf(taskDel);
  arrayTasks.splice(indiceTaskDel, 1);
  render();
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
    if (objElement.completed == true) {
      element.classList.toggle("completed");
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
  });
  render();
}

function render() {
  ul.innerHTML = "";
  arrayTasks.forEach((task) => {
    const taskConfig = config(task);
    createtask(taskConfig, ul);
  });
}

btnAddTask.addEventListener("click", () => {
  if (inputTask.value.trim() !== "") {
    addTask(inputTask.value);
    inputTask.value = "";
    counterTask++;
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
});
