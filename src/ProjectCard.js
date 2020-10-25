import React from "react";
import Button from "./Button";
import Task from "./Task";
import styles from "./Project.module.css";

function ProjectCard({
  name,
  tasks,
  projectIndex,
  onDeleteProjectFunc,
  onAddTaskFunc,
  onUpdateTaskFunc,
}) {
  function onAddTask(taskIndex, task) {
    onAddTaskFunc(projectIndex, taskIndex, task);
  }

  function onDeleteProject() {
    onDeleteProjectFunc(projectIndex);
  }

  function mapTasks() {
    const taskArray = tasks.map((task, i) => {
      const { name } = task;
      return (
        <Task
          name={name}
          key={i}
          index={i}
          onUpdateTaskFunc={onUpdateTaskFunc}
          projectIndex={projectIndex}
        />
      );
    });
    return taskArray;
  }

  return (
    <div className={styles.card}>
      <button onClick={onDeleteProject} className={styles.delete}>
        X
      </button>
      <div>{name}</div>
      {mapTasks()}

      <Button size={"sm"} color="white" type={"add"} onFunc={onAddTask}>
        +
      </Button>
    </div>
  );
}

export default ProjectCard;
