import React from 'react';
import Candidate from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  currentCandidate: Candidate;
  addToSavedList: () => void;
  removeCandidate: (username: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ currentCandidate, addToSavedList, removeCandidate }) => {
  return (
    <div className="candidate-card">
      <img src={currentCandidate.avatar} alt={currentCandidate.name} />
      <h2>{currentCandidate.name}</h2>
      <p>{currentCandidate.username}</p>
      <p>{currentCandidate.location}</p>
      <button onClick={addToSavedList}>Save Candidate</button>
      <button onClick={() => removeCandidate(currentCandidate.username)}>Remove Candidate</button> {/* Remove button */}
    </div>
  );
};

export default CandidateCard;
