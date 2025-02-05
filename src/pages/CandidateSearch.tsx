import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import Candidate from '../types/Candidate';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    username: '',
    location: '',
    avatar: '',
    html_url: '',
    company: '',
  });

  const candidateList = searchGithub();

  const addToSavedList = () => {
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem('savedCandidates');
    if (typeof storedSavedCandidates === 'string') {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    parsedSavedCandidates.push(currentCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
  };

  return (
    <>
      <h1>CandidateSearch</h1>;
      <CandidateCard
        currentCandidate={currentCandidate}
        addToSavedList={addToSavedList}
      />
    </>
  );
};

export default CandidateSearch;
