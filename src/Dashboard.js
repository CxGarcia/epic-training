import React, { useCallback } from "react";
import { useProject } from "./context/project-context";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import TaskCard from "./TaskCard";
import styles from "./Dashboard.module.css";
import { nanoid } from "nanoid";
// import { addCollection, getCollection, editById } from "./utils/firebase";

function Dashboard() {
  const [state, dispatch] = useProject();
  const { projects, tasks } = state;

  function handleAddProject() {
    const id = nanoid(9);
    const project = { name: "New Project", projectId: id };

    dispatch({ type: "CREATE_PROJECT", project });
  }

  function handleUpdateProject({ ...props }) {
    const project = { ...props };

    dispatch({ type: "updateProject", project });
  }

  function handleDeleteProject(projectId) {
    dispatch({ type: "DELETE_PROJECT", projectId });
  }

  function handleAddTask({ ...props }) {
    const id = nanoid(9);
    const task = { name: "New Task", taskId: id, ...props };

    dispatch({ type: "CREATE_TASK", task });
  }

  const handleUpdateTask = useCallback(
    function ({ ...props }) {
      const task = { ...props };

      dispatch({ type: "UPDATE_TASK", task });
    },
    [dispatch]
  );

  function handleDeleteTask({ taskId }) {
    dispatch({ type: "DELETE_TASK", taskId });
  }

  function mapProjects() {
    if (!projects) return;

    const projectCardArray = projects.map((project, i) => {
      const { name, projectId } = project;

      const projectTasks = tasks.filter((task) => {
        return task.projectId === projectId;
      });

      return (
        <ProjectCard
          projectName={name}
          tasks={projectTasks}
          projectId={projectId}
          onDeleteProjectFunc={handleDeleteProject}
          onAddTaskFunc={handleAddTask}
          onUpdateTaskFunc={handleUpdateTask}
          onUpdateProjectFunc={handleUpdateProject}
          index={i}
          key={projectId}
        />
      );
    });
    return projectCardArray;
  }

  function mapTasks() {
    if (!tasks) return;

    const taskCardArray = tasks.map((task) => {
      const { name, due, priority, taskId, projectId, projectName } = task;
      return (
        <TaskCard
          name={name}
          taskId={taskId}
          projectId={projectId}
          priority={priority}
          due={due}
          onUpdateTaskFunc={handleUpdateTask}
          projectName={projectName}
          handleDeleteTask={handleDeleteTask}
          key={taskId}
        />
      );
    });
    return taskCardArray;
  }

  return (
    <div>
      <div className={styles.container}>
        <Button onFunc={handleAddProject} type={"add"} size="sm">
          +
        </Button>
        {mapProjects()}
      </div>
      <div className={styles.container}>{mapTasks()}</div>
    </div>
  );
}

export default Dashboard;

// function useAsync(initialState) {
//   const [state, dispatch] = useReducer(crudReducer, async () => {
//     const dbProjectCollection = await getCollection("projects");

//     return dbProjectCollection;
//   });

//   const run = useCallback((promise) => {
//     dispatch({ type: "pending" });
//     promise.then(
//       (data) => {
//         dispatch({ type: "resolved", data });
//       },
//       (error) => {
//         dispatch({ type: "rejected", error });
//       }
//     );
//   }, []);

//   return { ...state, run };
// }
