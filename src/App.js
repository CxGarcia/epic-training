import React from "react";
import Dashboard from "./Dashboard";
import { ProjectProvider } from "./context/project-context";
import "./App.css";

function App() {
  return (
    <div className="app">
      <ProjectProvider>
        <Dashboard />
      </ProjectProvider>
    </div>
  );
}

export default App;
