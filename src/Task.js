import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.css";

function Task({ onUpdateTaskFunc, projectId, taskId, projectName }) {
  const [state, setState] = useState({
    name: "New Task",
    due: 2,
    priority: 1,
  });

  const [focus, setFocus] = useState(false);
  const { name, due, priority } = state;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      onUpdateTaskFunc({ name, due, priority, projectId, taskId, projectName });
    }, 1000);

    return () => console.log("cleanup");
  }, [state]);

  function handleChange(event) {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  }

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
        <form className={styles.form} onKeyPress={onEnter} onBlur={onBlur}>
          <input
            placeholder={name}
            name="name"
            className={styles.input}
            onChange={handleChange}
            value={name}
          ></input>
          <input
            placeholder={due}
            name="due"
            className={styles.input}
            onChange={handleChange}
            value={due}
          ></input>
          <select name="priority" className={styles.select}>
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
