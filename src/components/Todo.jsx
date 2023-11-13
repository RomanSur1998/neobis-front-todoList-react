import React, { useEffect, useState } from "react";
import "../styles/todo.css";
import RenderTodo from "./RenderTodo";
import TodoForm from "./TodoForm";
import { generateRandomId } from "./function";

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

  useEffect(() => {
    getToDoList();
  }, []);

  function handleTask(e) {
    setTask({
      ...task,
      task: e.target.value,
    });
  }

  function addTask(event) {
    event.preventDefault();
    if (task.task) {
      let data = JSON.parse(localStorage.getItem("react-todo"));
      data.push({
        ...task,
        id: generateRandomId(),
        type: task.type ? task.type : "personal",
      });
      setTasks(data);
      localStorage.setItem("react-todo", JSON.stringify(data));
      setTask({
        ...task,
        id: generateRandomId(),
        task: "",
        type: "",
      });
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
    setEditTask(newTasks[index].task);
  }

  function doneTodo(id) {
    const index = tasks.findIndex((task) => task.id === id);
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);

    localStorage.setItem("react-todo", JSON.stringify(newTasks));
  }

  function saveTask(index, editTask) {
    if (editTask) {
      const newTasks = [...tasks];
      newTasks[index].task = editTask;
      newTasks[index].editable = false;
      setTasks(newTasks);
      localStorage.setItem("react-todo", JSON.stringify(newTasks));
    } else {
      alert("Заполните поле исравления");
    }
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>WhatsApp</h1>
          <h2>CREATE TODO</h2>
          <h3>What`s on your list ? </h3>
        </header>

        <TodoForm
          setTask={setTask}
          addTask={addTask}
          task={task}
          handleTask={handleTask}
        ></TodoForm>
        <RenderTodo
          tasks={tasks}
          setEditTask={setEditTask}
          editTask={editTask}
          saveTask={saveTask}
          task={task}
          editTodo={editTodo}
          doneTodo={doneTodo}
          deleteTask={deleteTask}
        ></RenderTodo>
      </div>
    </>
  );
};

export default Todo;
