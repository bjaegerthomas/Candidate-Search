import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import SavedCandidatesCard from '../components/SavedCandidatesCard';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const removeFromPotentialCandidates = (username: string) => {
    setSavedCandidates((prevCandidates) => {
      const updatedCandidates = prevCandidates.filter(candidate => candidate.username !== username);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      return updatedCandidates;
    });
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map(candidate => (
          <SavedCandidatesCard 
            key={candidate.username} 
            candidate={candidate} 
            removeFromPotentialCandidates={removeFromPotentialCandidates} 
          />
        ))
      ) : (
        <p>No candidates saved.</p>
      )}
    </>
  );
};

export default SavedCandidates;
