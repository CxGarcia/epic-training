import React from "react";
import Card from "./Card";
import styles from "./Card.module.css";

export default function TaskCard({
  name,
  handleDeleteTask,
  priority,
  projectName,
  due,
  taskId,
}) {
  const handleDelete = () => handleDeleteTask({ taskId });

  const priorityObj = {
    1: "IU",
    2: "NIU",
    3: "INU",
    4: "NINU",
  };

  return (
    <Card>
      <button onClick={handleDelete} className={styles.delete}>
        X
      </button>
      <div className={styles.cardName}>{name || " "}</div>
      <div className={styles.projectName}>{`${projectName}`}</div>
      <div className={styles.priority}>{priorityObj[priority]}</div>
      <div className={styles.priority}>{due}</div>
    </Card>
  );
}
