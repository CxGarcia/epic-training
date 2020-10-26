import React from "react";
import Button from "./Button";
import Task from "./Task";
import Card from "./Card";
import styles from "./Card.module.css";

function ProjectCard({
  projectName,
  tasks,
  projectId,
  onDeleteProjectFunc,
  onAddTaskFunc,
  onUpdateTaskFunc,
  index,
}) {
  const projectNameMod = `${projectName} ${index + 1}`;

  function onAddTask() {
    onAddTaskFunc({ projectId });
  }

  function onDeleteProject() {
    onDeleteProjectFunc(projectId);
  }

  function mapTasks() {
    const taskArray = tasks.map((task, i) => {
      const { name, taskId } = task;

      return (
        <Task
          name={name}
          projectName={projectNameMod}
          key={taskId}
          taskId={taskId}
          onUpdateTaskFunc={onUpdateTaskFunc}
          projectId={projectId}
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
      <div className={styles.cardName}>{projectNameMod}</div>
      {mapTasks()}

      <Button size={"sm"} color="white" type={"add"} onFunc={onAddTask}>
        +
      </Button>
    </Card>
  );
}

export default ProjectCard;
