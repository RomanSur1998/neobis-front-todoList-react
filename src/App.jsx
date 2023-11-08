import { useState } from "react";
import Todo from "./components/todo";

function App() {
  const [task, setTask] = useState("");
  console.log(task, "task ");
  return (
    <>
      <Todo />
    </>
  );
}

export default App;
