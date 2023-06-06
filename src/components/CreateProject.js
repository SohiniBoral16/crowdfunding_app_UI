import React, { useState } from "react";

//Innovator Dashboard
const CreateProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);

  const onSubmit = () => {
    // API call to backend
  };

  return (
    <div>
      <input type="text" placeholder="Project Name" onChange={e => setName(e.target.value)} />
      <textarea placeholder="Project Description" onChange={e => setDescription(e.target.value)} />
      <input type="number" placeholder="Funding Goal" onChange={e => setGoal(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
export default CreateProject;
