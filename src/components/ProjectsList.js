import React, { useState, useEffect } from "react";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects from API
  }, []);

  const onDonate = (projectId) => {
    // Donate to project
  };

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <button onClick={() => onDonate(project.id)}>Donate</button>
        </div>
      ))}
    </div>
  );
};
export default ProjectsList;
