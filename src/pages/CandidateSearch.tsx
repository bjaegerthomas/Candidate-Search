import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    username: '',
    location: '',
    avatar: '',
    html_url: '',
    company: '',
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const [candidateList, setCandidateList] = useState<Candidate[]>([]);

  useEffect(() => { // Fetch random 30 element array of users from the github API
    searchGithub().then((data) => {
      setCandidateList(data);
    });
  }, []);

  useEffect(() => { // Fetch the user data for the current index
    if (candidateList.length > 0) {
      const candidate = candidateList[currentIndex];
      searchGithubUser(candidate.username).then((data) => {
        setCurrentCandidate(data);
      });
    }
  }, [currentIndex, candidateList]);

  const addCandidate = () => { // Add a candidate to the saved candidates list
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem('savedCandidates');
    if (storedSavedCandidates) {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    if (!parsedSavedCandidates.some(c => c.username === currentCandidate.username)) {
      parsedSavedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidateList.length); // Update currentIndex to the next index in order
  };

  const removeCandidate = (username: string) => {  // Remove a candidate from the list
    const updatedCandidateList = candidateList.filter(candidate => candidate.username !== username);
    setCandidateList(updatedCandidateList);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % updatedCandidateList.length); // Update currentIndex after removal
  };

  return (
    <>
      <h1>CandidateSearch</h1>
      <CandidateCard
        currentCandidate={currentCandidate} // Pass the current candidate to the card
        removeCandidate={removeCandidate} // Pass function to remove a candidate
        addCandidate={addCandidate} // Pass function to add a candidate
        
/>
    </>
  );
};

export default CandidateSearch;
