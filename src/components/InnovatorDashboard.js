import React, { useEffect, useState, useContext } from "react";
import {
  addProject,
  updateProject,
  deleteProject,
} from "../services/projectService";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/userService";

const InnovatorDashboard = () => {
  const { user, projects, setProjects, setUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // add the following function for logout
  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    goalAmount: "",
    raisedAmount: "",
  });
  const [currentProject, setCurrentProject] = useState(null);
  const initialNewProject = {
    name: "",
    description: "",
    goalAmount: "",
    raisedAmount: "",
  };

  useEffect(() => {
    console.log(projects); // This will log the projects data whenever it changes
  }, [projects]);

  const handleCreateProject = async () => {
    const createdProject = await addProject({
      ...newProject,
      user: {
        id: user.id,
      },
    });
    const updatedProjects = [...projects, createdProject];
    setProjects(updatedProjects); // This updates the projects in the UserContext
    setNewProject({
      name: "",
      description: "",
      goalAmount: null,
      raisedAmount: null,
    });
  };

  const handleUpdateProject = async () => {
    // Create a new object from the current project, excluding the user field.
    const projectToUpdate = {
      name: currentProject.name,
      description: currentProject.description,
      goalAmount: currentProject.goalAmount,
      raisedAmount: currentProject.raisedAmount,
      user: {
        id: user.id,
      },
    };

    // Call the updateProject function with this new object.
    await updateProject(currentProject.id, projectToUpdate);

    // Update the projects state.
    setProjects(
      projects.map((project) =>
        project.id === currentProject.id
          ? { ...project, ...projectToUpdate }
          : project
      )
    );
    // Clear the current project.
    setCurrentProject(null);
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleCancelUpdate = () => {
    setCurrentProject(null);
  };

  const handleResetCreate = () => {
    setNewProject(initialNewProject);
  };

  return (
    <div>
      <h1>My Projects</h1>
      <button onClick={handleLogout}>Logout</button>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>Project Name: {project.name}</h2>
          <p>
            <b>Project Description:</b> {project.description}
          </p>
          <p>
            <b>Project Goal Amount:</b> {project.goalAmount}
          </p>
          <p>
            <b>Project Raised Amount:</b>{" "}
            {!project.raisedAmount ? 0 : project.raisedAmount}
          </p>
          {project.raisedAmount >= project.goalAmount && (
            <p style={{ color: "red" }}>Goal Amount Reached!</p>
          )}
          <button onClick={() => setCurrentProject(project)}>Edit</button>
          <button onClick={() => handleDeleteProject(project.id)}>
            Delete
          </button>
        </div>
      ))}
      <div>
        <h3>Create New Project</h3>
        <input
          type="text"
          placeholder="Project Name"
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
        />
        <textarea
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Project Goal Amount"
          value={newProject.goalAmount}
          onChange={(e) =>
            setNewProject({ ...newProject, goalAmount: e.target.value })
          }
        />
        <button onClick={handleCreateProject}>Create Project</button>
        <button onClick={handleResetCreate}>Reset</button>
        <br />
        <br />
      </div>
      {currentProject && (
        <div>
          <h3>Update Existing Project</h3>
          <label>
            Project Name:
            <input
              type="text"
              value={currentProject.name || ""}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, name: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <textarea
              value={currentProject.description || ""}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  description: e.target.value,
                })
              }
            />
          </label>
          <label>
            Goal Amount:
            <input
              type="number"
              value={currentProject.goalAmount || ""}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  goalAmount: e.target.value,
                })
              }
            />
          </label>
          <label>
            Raised Amount:
            <input
              type="number"
              value={currentProject.raisedAmount || ""}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  raisedAmount: e.target.value,
                })
              }
            />
          </label>
          <button onClick={handleUpdateProject}>Update Project</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default InnovatorDashboard;
