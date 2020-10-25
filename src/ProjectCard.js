import React from "react";
import Button from "./Button";
import Task from "./Task";
import Card from "./Card";
import styles from "./Card.module.css";

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
    <Card>
      <button onClick={onDeleteProject} className={styles.delete}>
        X
      </button>
      <div className={styles.cardName}>{name}</div>
      {mapTasks()}

      <Button size={"sm"} color="white" type={"add"} onFunc={onAddTask}>
        +
      </Button>
    </Card>
  );
}

export default ProjectCard;
