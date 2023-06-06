import React, { useEffect, useState, useContext } from "react";
import { getProjectsList } from "../services/projectService";
import ContributionModal from "./ContributionModal";
import { logoutUser } from "../services/userService";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const DonorDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const { setUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // add the following function for logout
  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getProjectsList();
      setProjects(allProjects);
    };
    fetchProjects();
  }, [modalIsOpen]);

  const handleOpenModal = (project) => {
    setCurrentProject(project);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>All Projects</h1>
      <button onClick={handleLogout}>Logout</button>
      {projects.map((project, index) => (
        <div key={project.id}>
          <h2>
            #{index + 1}. Project Name: {project.name}
          </h2>
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

          {project.raisedAmount >= project.goalAmount ? (
            <p style={{ color: "green" }}>Goal Completed!</p>
          ) : (
            <button onClick={() => handleOpenModal(project)}>Contribute</button>
          )}
        </div>
      ))}

      <ContributionModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        projectId={currentProject?.id}
        userId={currentProject?.userId}
        remainingAmount={currentProject?.goalAmount-currentProject?.raisedAmount}
      />
    </div>
  );
};

export default DonorDashboard;
