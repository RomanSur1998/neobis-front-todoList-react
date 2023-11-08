import React, { useEffect, useState } from "react";
import { deleteTask } from "./function";

const Todo = () => {
  const [task, setTask] = useState({
    id: "",
    task: "",
    type: false,
    done: false,
    editable: false,
  });
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState("");

  console.log(tasks, "All rasks");

  useEffect(() => {
    getToDoList();
  }, []);

  function handleTask(e) {
    setTask({
      ...task,
      task: e.target.value,
    });
  }

  function generateRandomId() {
    return Math.floor(Math.random() * 100000);
  }

  function addTask(event) {
    event.preventDefault();
    if (task.task) {
      setTask({ ...task, id: generateRandomId() });
      let data = JSON.parse(localStorage.getItem("react-todo"));
      data.push(task);
      setTasks(data);
      setTask({ ...task, task: "", id: generateRandomId() });
      localStorage.setItem("react-todo", JSON.stringify(data));
    } else {
      alert("Write a to-do");
    }
  }

  function deleteTask(id) {
    let deleteData = tasks.filter((elem) => {
      return elem.id !== id;
    });
    localStorage.setItem("react-todo", JSON.stringify(deleteData));
    setTasks(deleteData);
  }

  function getToDoList() {
    if (!localStorage.getItem("react-todo")) {
      localStorage.setItem("react-todo", "[]");
    }
    let data = JSON.parse(localStorage.getItem("react-todo"));
    setTasks(data);
  }

  function editTodo(id) {
    const index = tasks.findIndex((task) => task.id === id);
    const newTasks = [...tasks];
    newTasks[index].editable = true;
    setTasks(newTasks);
    setEditTask(newTasks[index]);
  }

  function saveTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    const newTasks = [...tasks];
    (newTasks[index].editable = false),
      (newTasks[index].task = editTask),
      setTasks(newTasks);
    localStorage.setItem("react-todo", JSON.stringify(newTasks));
  }

  function renderTodo() {
    return tasks.map((elem, index) =>
      elem.editable ? (
        <div className="task-block" key={index}>
          <input type="checkbox" />
          <input
            type="text"
            value={editTask.task}
            onChange={(e) => {
              setEditTask(e.target.value);
            }}
            onBlur={() => {
              saveTask(elem.id);
            }}
          />
          <button
            onClick={() => {
              editTodo(elem.id);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteTask(elem.id);
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="task-block" key={index}>
          <input type="checkbox" />
          <h4>{elem.task}</h4>
          <button
            onClick={() => {
              editTodo(elem.id);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteTask(elem.id);
            }}
          >
            Delete
          </button>
        </div>
      )
    );
  }

  return (
    <>
      <div className="container">
        <h1>WhatsApp</h1>
        <form onSubmit={addTask}>
          <label>
            <input
              type="text"
              placeholder="Write to-do..."
              onChange={(e) => handleTask(e)}
              value={task.task}
            />
          </label>
          <div>
            <div>
              <label htmlFor="business">
                Business
                <input
                  type="checkbox"
                  id="business"
                  onClick={() => {
                    setTask({ ...task, type: "business" });
                  }}
                />
              </label>
            </div>
            <div>
              <label htmlFor="personal">
                Personal
                <input
                  type="checkbox"
                  id="personal"
                  onClick={() => {
                    setTask({ ...task, type: "personal" });
                  }}
                />
              </label>
            </div>
          </div>
          <button type="submit">ADD TASK</button>
        </form>
      </div>
      <section>{renderTodo()}</section>
    </>
  );
};

export default Todo;
