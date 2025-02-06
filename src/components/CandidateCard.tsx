import React from 'react';
import Candidate from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  currentCandidate: Candidate;
  addCandidate: () => void;
  removeCandidate: (username: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ currentCandidate, addCandidate, removeCandidate }) => {
  return (
    <div className="candidate-card">
      <img src={currentCandidate.avatar} alt={currentCandidate.name} />
      <h2>{currentCandidate.name}</h2>
      <p>{currentCandidate.username}</p>
      <p>{currentCandidate.location}</p>
      <button onClick={() => removeCandidate(currentCandidate.username)}>Pass</button> {/* Remove button */}
      <button onClick={addCandidate}>Add</button>
    </div>
  );
};

export default CandidateCard;
