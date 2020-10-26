import React, { useEffect, useRef, useState } from "react";
import styles from "./Task.module.css";
import { parseISO, formatISO, formatDistanceToNowStrict } from "date-fns/esm";

function Task({ onUpdateTaskFunc, projectId, taskId, projectName }) {
  const dateNow = Date.now();
  const minDate = formatISO(dateNow, { representation: "date" });

  const [state, setState] = useState({
    name: "New Task",
    priority: 1,
    due: formatDistanceToNowStrict(dateNow, { unit: "day" }),
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

    if (event.target.name === "due") {
      const inputDate = formatDistanceToNowStrict(
        parseISO(event.target.value),
        {
          unit: "day",
        }
      );
      setState({ ...state, [event.target.name]: inputDate });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  }

  function handleBlur(event) {
    event.preventDefault();
    handleChange(event);

    if (!event.currentTarget.contains(event.relatedTarget)) {
      handleChangeFocus();
      return;
    }
  }

  function handleEnter(event) {
    if (event.key === "Enter") handleBlur(event);
  }

  function handleChangeFocus() {
    setFocus(!focus);
  }

  if (!focus) {
    return (
      <div className={styles.task} onClick={handleChangeFocus}>
        {name}
      </div>
    );
  } else {
    return (
      <div className={styles.task}>
        <form
          className={styles.form}
          onKeyPress={handleEnter}
          onBlur={handleBlur}
        >
          <input
            placeholder={name}
            name="name"
            className={styles.input}
            onChange={handleChange}
            value={name}
          ></input>
          <input
            type="date"
            name="due"
            placeholder={minDate}
            className={styles.input}
            onChange={handleChange}
            min={minDate}
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
