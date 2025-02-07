import React from 'react';
import {Candidate} from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  currentCandidate: Candidate;
  addCandidate: () => void;
  removeCandidate: (username: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ currentCandidate, addCandidate, removeCandidate }) => {
  return (
    <div className="candidate-card">
      <img src={currentCandidate.avatar_url} alt={currentCandidate.login || "Candidate Avatar"} />
      <h2>{currentCandidate.name || "No Name Provided"}</h2>
      <p>{currentCandidate.login || "No Username"}</p>
      <p>{currentCandidate.location || "Location Unknown"}</p>
      <p>{currentCandidate.html_url}</p>
      <p>{currentCandidate.company || "No Company"}</p>
      <button onClick={() => removeCandidate(currentCandidate.login)}>Pass</button> {/* Remove button */}
      <button onClick={addCandidate}>Add</button>
    </div>
  );
};

export default CandidateCard;