import React from 'react';
import {Candidate} from '../interfaces/Candidate.interface';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

type CandidateCardProps = {
  currentCandidate: Candidate;
  addCandidate: (login: string) => void;
  removeCandidate: (username: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ currentCandidate, addCandidate, removeCandidate }) => {
  return (
    <div className="candidate-card">
      <img src={currentCandidate.avatar_url || undefined} alt={currentCandidate.login || "Candidate Avatar"} />
      <h2>Name: {currentCandidate.name || "No Name Provided"}</h2>
      <p>Username: {currentCandidate.login || "No Username"}</p>
      <p>Location{currentCandidate.location || "Location Unknown"}</p>
      <p>Email: {currentCandidate.email || "No Email"}</p>
      <p>Github Url: {currentCandidate.html_url}</p>
      <p>Company: {currentCandidate.company || "No Company"}</p>
      <button onClick={() => currentCandidate.login && removeCandidate(currentCandidate.login)}><FaThumbsDown /></button> {/* Remove button */}
      <button onClick={() => currentCandidate.login && addCandidate(currentCandidate.login)}><FaThumbsUp /></button>
    </div>
  );
};

export default CandidateCard;