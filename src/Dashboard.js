import React, { useCallback, useEffect, useReducer } from "react";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import styles from "./Dashboard.module.css";
import { addCollection, getCollection, editById } from "./utils/firebase";

function asyncReducer(state, action) {
  switch (action.type) {
    case "CREATE_PROJECT": {
      return { ...state, projects: [...state.projects, action.project] };
    }

    case "update": {
      return { status: "resolved", data: action.data, error: null };
    }

    case "DELETE_PROJECT": {
      const projectsCopy = [...state.projects];
      const filteredProjects = projectsCopy.filter((project, i) => {
        return i !== action.index;
      });
      return { ...state, projects: [...filteredProjects] };
    }

    case "CREATE_TASK": {
      const projects = [...state.projects];
      const currentProject = state.projects[action.id];

      const tasks = [...currentProject.tasks, { name: `${action.task}` }];
      const newCurrentProject = { ...currentProject, tasks };

      projects[action.id] = newCurrentProject;
      return { ...state, projects: projects };
    }

    case "UPDATE_TASK": {
      const projects = [...state.projects];
      const currentProject = state.projects[action.projectId];

      const tasks = currentProject.tasks.map((task, index) => {
        if (index !== action.id) return task;
        else return action.task;
      });

      const newCurrentProject = { ...currentProject, tasks };
      projects[action.projectId] = newCurrentProject;
      return { ...state, projects: projects };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function Dashboard() {
  const [state, dispatch] = useReducer(asyncReducer, { projects: [] });

  const { projects } = state;

  console.log(state);

  const tasks = projects
    .map((project) => {
      return project.tasks;
    })
    .flat();

  function onAddProject() {
    const newProject = { name: "New Project", tasks: [] };
    dispatch({ type: "CREATE_PROJECT", project: newProject });
  }

  function onDeleteProject(index) {
    dispatch({ type: "DELETE_PROJECT", index });
  }

  function onAddTask(id, task) {
    dispatch({ type: "CREATE_TASK", id, task });
  }

  function onUpdateTask(id, task, projectId) {
    dispatch({ type: "UPDATE_TASK", id, task, projectId });
  }

  function mapProjects() {
    const projectCardArray = projects.map((project, i) => {
      const { name, tasks } = project;
      return (
        <ProjectCard
          name={name}
          tasks={tasks}
          key={i}
          projectIndex={i}
          onDeleteProjectFunc={onDeleteProject}
          onAddTaskFunc={onAddTask}
          onUpdateTaskFunc={onUpdateTask}
        />
      );
    });
    return projectCardArray;
  }

  function mapTasks() {
    const projectCardArray = projects.map((project, i) => {
      const { name, tasks } = project;
      return (
        <ProjectCard
          name={name}
          tasks={tasks}
          key={i}
          projectIndex={i}
          onDeleteProjectFunc={onDeleteProject}
          onAddTaskFunc={onAddTask}
          onUpdateTaskFunc={onUpdateTask}
        />
      );
    });
    return projectCardArray;
  }

  return (
    <div>
      <div className={styles.container}>
        <Button onFunc={onAddProject} type={"add"} size="sm">
          +
        </Button>
        {mapProjects()}
      </div>
      <div className={styles.container}></div>
    </div>
  );
}

export default Dashboard;

function projectReducer(state, action) {
  switch (action.type) {
    case "new project": {
      return {
        ...state,
        user: { ...state.user, ...action.updates },
        status: "pending",
        storedUser: state.user,
      };
    }
    case "finish update": {
      return {
        ...state,
        user: action.updatedUser,
        status: "resolved",
        storedUser: null,
        error: null,
      };
    }
    case "fail update": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
        user: state.storedUser,
        storedUser: null,
      };
    }
    case "reset": {
      return {
        ...state,
        status: null,
        error: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(initialState) {
  const [state, dispatch] = useReducer(asyncReducer, async () => {
    const dbProjectCollection = await getCollection("projects");

    return dbProjectCollection;
  });

  const run = useCallback((promise) => {
    dispatch({ type: "pending" });
    promise.then(
      (data) => {
        dispatch({ type: "resolved", data });
      },
      (error) => {
        dispatch({ type: "rejected", error });
      }
    );
  }, []);

  return { ...state, run };
}
