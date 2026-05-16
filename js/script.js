const btnAddTask = document.getElementById("btnAddTask");
const inputTask = document.getElementById("inputTask");
const ul = document.getElementById("listContainer");
// const arrayTask = document.
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
            {
              tag: "div",
              classList: "iconList",
              id: `iconList-${counterTask}`,
              dataset: {
                action: "finished",
                id: counterTask,
              },
            },
            {
              tag: "span",
              id: `spanText-${counterTask}`,
              textContent: inputTask.value,
            },
          ],
        },
        {
          tag: "div",
          classList: "itemButtons",
          children: [
            {
              tag: "button",
              id: `btnEdit-${counterTask}`,
              dataset: {
                action: "edit",
                id: counterTask,
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
              id: `btnDel-${counterTask}`,
              dataset: {
                action: "delete",
                id: counterTask,
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
  const task = document.querySelector(`[data-id = "${id}" ]`);
  task.classList.toggle("iconFinished");
  const spanText = document.getElementById(`spanText-${id}`);
  spanText.classList.toggle("itemTaskFinished");
}

function delTask(id) {
  const task = document.getElementById(`task-${id}`);
  task.remove();
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

btnAddTask.addEventListener("click", () => {
  if (inputTask.value.trim() !== "") {
    createtask(config(), ul);
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
