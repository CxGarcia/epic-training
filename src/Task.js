import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.css";

function Task({ onUpdateTaskFunc, index, projectIndex }) {
  const [state, setState] = useState({
    name: "New Task",
    due: 2,
    priority: 1,
  });

  const [focus, setFocus] = useState(false);

  const formRef = useRef(null);

  const { name, due } = state;

  useEffect(() => {
    onUpdateTaskFunc(index, state, projectIndex);

    return () => console.log("cleanup");
  }, [state]);

  function onEnter(event) {
    if (event.key === "Enter") onBlur(event);
  }

  function onBlur(event) {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });

    if (!event.currentTarget.contains(event.relatedTarget)) {
      onChangeFocus();
    }
  }

  function onChangeFocus() {
    setFocus(!focus);
  }

  if (!focus) {
    return (
      <div className={styles.task} onClick={onChangeFocus}>
        {name}
      </div>
    );
  } else {
    return (
      <div className={styles.task}>
        <form action="" ref={formRef} onKeyPress={onEnter} onBlur={onBlur}>
          <input placeholder={name} name="name"></input>
          <input placeholder={due} name="due"></input>
          <select name="priority">
            <option value={1} defaultValue>
              Important | Urgent
            </option>
            <option value={2}>Not Important | Urgent</option>
            <option value={3}>Important | Not Urgent</option>
            <option value={4}>Not Important | Not Urgent</option>
          </select>
        </form>
      </div>
    );
  }
}

export default Task;
