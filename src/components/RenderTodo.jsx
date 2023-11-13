import React from "react";

const RenderTodo = ({
  tasks,
  deleteTask,
  editTodo,
  doneTodo,
  setEditTask,
  editTask,
  saveTask,
}) => {
  return (
    <>
      <section className="list-block">
        {tasks.map((elem, index) => (
          <div className="task-block flex width" key={elem.id}>
            <div>
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
              {elem.editable ? (
                <input
                  className={`task_inp ${elem.done ? "done" : null} border`}
                  type="text"
                  value={editTask}
                  onChange={(e) => {
                    setEditTask(e.target.value);
                  }}
                  s
                  onBlur={() => {
                    saveTask(index, editTask);
                  }}
                />
              ) : (
                <span className={elem.done ? "done" : null}>{elem.task}</span>
              )}
            </div>
            <div>
              <button
                className="button_main edit"
                onClick={() => {
                  editTodo(elem.id);
                }}
              >
                Edit
              </button>
              <button
                className="button_main delete"
                onClick={() => {
                  deleteTask(elem.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default RenderTodo;
