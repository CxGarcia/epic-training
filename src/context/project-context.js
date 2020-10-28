import React, { createContext, useContext, useReducer } from "react";

const ProjectContext = createContext();
ProjectContext.displayName = "ProjectContext";

function ProjectProvider({ children }) {
  // const { projects, tasks } = useAuth(); Fetch initial projects from db

  const [state, dispatch] = useReducer(projectTaskReducer, {
    projects: [],
    tasks: [],
  });

  const value = [state, dispatch];

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

function useProject() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(`useProject must be used within a ProjectProvider`);
  }

  return context;
}

function projectTaskReducer(state, action) {
  switch (action.type) {
    case "CREATE_PROJECT": {
      return { ...state, projects: [...state.projects, action.project] };
    }

    //TODO
    case "UPDATE_PROJECT": {
      return { ...state, projects: [...state.projects, action.project] };
    }

    case "DELETE_PROJECT": {
      const projectsCopy = [...state.projects];
      const tasksCopy = [...state.tasks];

      const filteredProjects = projectsCopy.filter((project) => {
        return project.projectId !== action.projectId;
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

      const newTasks = tasksCopy.map((task) => {
        if (task.taskId !== action.task.taskId) return task;
        else return action.task;
      });

      newTasks.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));

      return { ...state, tasks: [...newTasks] };
    }

    case "DELETE_TASK": {
      const tasksCopy = [...state.tasks];

      const filteredTasks = tasksCopy.filter((task) => {
        return task.taskId !== action.taskId;
      });

      return { ...state, tasks: [...filteredTasks] };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export { ProjectProvider, useProject };
