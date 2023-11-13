import React from "react";
import "../styles/todo.css";

const TodoForm = ({ setTask, task, handleTask, addTask }) => {
  console.log(task.task, "task");
  return (
    <>
      <form onSubmit={addTask}>
        <input
          className="main_input shadow border width"
          type="text"
          placeholder="Write to-do..."
          onChange={(e) => handleTask(e)}
          value={task.task}
        />

        <div className="type_input width  flex">
          <div className="flex shadow">
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
          <div className="flex shadow">
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
        <button className="add" type="submit">
          ADD TASK
        </button>
      </form>
    </>
  );
};

export default TodoForm;
