import React, { useEffect, useState } from "react";
import "../styles/todo.css";
// ! Сделать отдельную функцию по сохранению массива в loacalStorage

const Todo = () => {
  const [task, setTask] = useState({
    id: generateRandomId(),
    task: "",
    type: "",
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

  function addTask() {
    event.preventDefault();
    if (task.task) {
      let data = JSON.parse(localStorage.getItem("react-todo"));
      data.push(task);
      setTasks(data);
      setTask({
        ...task,
        task: "",
        id: generateRandomId(),
        type: task.type ? task.type : "personal",
      });
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
  function doneTodo(id) {
    const index = tasks.findIndex((task) => task.id === id);
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
    setEditTask(newTasks[index]);
    localStorage.setItem("react-todo", JSON.stringify(newTasks));
  }

  function saveTask(index) {
    const newTasks = [...tasks];
    newTasks[index].task = editTask;
    newTasks[index].editable = false;
    setTasks(newTasks);
    localStorage.setItem("react-todo", JSON.stringify(newTasks));
  }

  function renderTodo() {
    return tasks.map((elem, index) =>
      elem.editable ? (
        <div className="task-block" key={index}>
          <label>
            <input
              type="checkbox"
              onChange={() => {
                doneTodo(elem.id);
              }}
              checked={elem.done}
              className="checked"
            />
            <span className={`checkbox ${elem.type}`}></span>
          </label>

          <input
            className={elem.done ? "done" : null}
            type="text"
            value={editTask.task}
            onChange={(e) => {
              setEditTask(e.target.value);
            }}
            onBlur={() => {
              saveTask(index);
            }}
          />
          <button>Edit</button>
          <button
            onClick={() => {
              deleteTask(elem.id);
            }}
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="task-block" key={elem.id}>
          <label>
            <input
              type="checkbox"
              onChange={() => {
                doneTodo(elem.id);
              }}
              checked={elem.done}
              className="checked"
            />
            <span className={`checkbox ${elem.type}`}></span>
          </label>

          <span className={elem.done ? "done" : null}>{elem.task}</span>
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
                  className="checked"
                  type="checkbox"
                  id="business"
                  value={"bisness"}
                  onChange={(e) => {
                    setTask({ ...task, type: e.target.value });
                  }}
                  checked={task.type === "bisness"}
                />
                <span className="checkbox bisness"></span>
              </label>
            </div>
            <div>
              <label htmlFor="personal">
                Personal
                <input
                  className="checked"
                  type="checkbox"
                  id="personal"
                  value={"personal"}
                  onChange={(e) => {
                    setTask({ ...task, type: e.target.value });
                  }}
                  checked={task.type === "personal"}
                />
                <span className="checkbox personal"></span>
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
