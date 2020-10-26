import React, { useCallback, useEffect, useReducer } from "react";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import TaskCard from "./TaskCard";
import styles from "./Dashboard.module.css";
import { nanoid } from "nanoid";
import { addCollection, getCollection, editById } from "./utils/firebase";

function Dashboard() {
  const [state, dispatch] = useReducer(projectTaskReducer, {
    projects: [],
    tasks: [],
  });

  const { projects, tasks } = state;

  function onAddProject() {
    const id = nanoid(9);
    const project = { name: "New Project", id: id };

    dispatch({ type: "CREATE_PROJECT", project });
  }

  function onDeleteProject(projectId) {
    dispatch({ type: "DELETE_PROJECT", projectId });
  }

  function onAddTask({ ...props }) {
    const id = nanoid(9);
    const task = { name: "New Task", taskId: id, ...props };

    dispatch({ type: "CREATE_TASK", task });
  }

  function onUpdateTask({ ...props }) {
    const task = { ...props };

    dispatch({ type: "UPDATE_TASK", task });
  }

  function mapProjects() {
    if (!projects) return;

    const projectCardArray = projects.map((project, i) => {
      const { name, id } = project;

      const projectTasks = tasks.filter((task) => {
        return task.projectId === id;
      });

      return (
        <ProjectCard
          projectName={name}
          key={id}
          tasks={projectTasks}
          projectId={id}
          index={i}
          onDeleteProjectFunc={onDeleteProject}
          onAddTaskFunc={onAddTask}
          onUpdateTaskFunc={onUpdateTask}
        />
      );
    });
    return projectCardArray;
  }

  function mapTasks() {
    const taskCardArray = tasks.map((task) => {
      const { name, due, priority, taskId, projectId, projectName } = task;
      return (
        <TaskCard
          name={name}
          priority={priority}
          key={taskId}
          projectId={projectId}
          onUpdateTaskFunc={onUpdateTask}
          projectName={projectName}
        />
      );
    });
    return taskCardArray;
  }

  return (
    <div>
      <div className={styles.container}>
        <Button onFunc={onAddProject} type={"add"} size="sm">
          +
        </Button>
        {mapProjects()}
      </div>
      <div className={styles.container}>{mapTasks()}</div>
    </div>
  );
}

export default Dashboard;

function projectTaskReducer(state, action) {
  switch (action.type) {
    case "CREATE_PROJECT": {
      return { ...state, projects: [...state.projects, action.project] };
    }

    case "UPDATE_PROJECT": {
      return { ...state, projects: [...state.projects, action.project] };
    }

    case "DELETE_PROJECT": {
      const projectsCopy = [...state.projects];
      const tasksCopy = [...state.tasks];

      const filteredProjects = projectsCopy.filter((project, i) => {
        return project.id !== action.projectId;
      });

      const filteredTasks = tasksCopy.filter((task) => {
        return task.projectId !== action.projectId;
      });

      return {
        ...state,
        projects: [...filteredProjects],
        tasks: [...filteredTasks],
      };
    }

    case "CREATE_TASK": {
      return { ...state, tasks: [...state.tasks, action.task] };
    }

    case "UPDATE_TASK": {
      const tasksCopy = [...state.tasks];

      const newTask = tasksCopy.map((task) => {
        if (task.taskId !== action.task.taskId) return task;
        else return action.task;
      });

      return { ...state, tasks: [...newTask] };
    }

    case "DELETE_TASK": {
      const tasksCopy = [...state.tasks];

      const filteredTasks = tasksCopy.filter((task, i) => {
        return task.id !== action.taskId;
      });

      return { ...state, tasks: [...state.tasks, filteredTasks] };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

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
