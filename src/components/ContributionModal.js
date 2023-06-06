import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { createTransaction } from "../services/transactionService";

Modal.setAppElement("#root");
// This line is needed for accessibility purposes, it
// specifies that everything inside the element with the id "root" should be hidden
// from screen readers when the modal dialog is open.
// This is often the top-level element of your React application.

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "40%",
  },
};

const ContributionModal = ({
  isOpen,
  onRequestClose,
  remainingAmount,
  projectId,
  userId,
}) => {
  const [contributionAmount, setContributionAmount] = useState(0);

  const handleContribution = async () => {
    const transaction = {
      user: { id: userId },
      project: { id: projectId },
      amount: contributionAmount,
    };

    await createTransaction(transaction);

    onRequestClose();
  };

  // Reset contributionAmount to 0 when projectId changes
  useEffect(() => {
    setContributionAmount(0);
  }, [projectId]);

  const isAmountGreaterThanRemaining = contributionAmount > remainingAmount;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Contribution Modal"
    >
      <h2>Contribute to Project</h2>
      <h3 style={{ color: "red" }}>
        {" "}
        Remaining Goal amount : {remainingAmount}
      </h3>
      <label>
        Amount:
        <input
          type="number"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
        />
      </label>
      <button
        onClick={handleContribution}
        disabled={isAmountGreaterThanRemaining}
      >
        Submit Contribution
      </button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ContributionModal;
