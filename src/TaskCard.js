import React from "react";
import Card from "./Card";
import styles from "./Card.module.css";

export default function TaskCard({ name, onDeleteTask, priority }) {
  const priorityObj = {
    1: "IU",
    2: "NIU",
    3: "INU",
    4: "NINU",
  };
  return (
    <Card>
      <button onClick={onDeleteTask} className={styles.delete}>
        X
      </button>
      <div className={styles.cardName}>{name}</div>
      <div className={styles.priority}>{priorityObj[priority]}</div>
    </Card>
  );
}
