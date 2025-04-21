import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import {Candidate} from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    id: null,
    login: null,
    email: null,
    html_url: null,
    name: null,
    bio: null,
    company: null,
    location: null,
    avatar_url: null,
    username: "",
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
      if (candidate.login) {
        searchGithubUser(candidate.login).then((data) => {
          setCurrentCandidate(data);
        });
      }
    }
  }, [currentIndex, candidateList]);

  const addCandidate = (login: string) => { // Add a candidate to the saved candidates list
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem('savedCandidates');
    if (storedSavedCandidates) {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    const candidateToAdd = candidateList.find(candidate => candidate.login === login);
    if (candidateToAdd && !parsedSavedCandidates.some(c => c.login === candidateToAdd.login)) {
      parsedSavedCandidates.push(candidateToAdd);
      localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
      console.log('Candidate added to saved candidates');
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidateList.length); // Update currentIndex to the next index in order
    console.log('index', currentIndex);
  };

  const removeCandidate = (login: string) => {  // Remove a candidate from the list
    const updatedCandidateList = candidateList.filter(candidate => candidate.login !== login);
    setCandidateList(updatedCandidateList);
    console.log('Candidate removed');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % updatedCandidateList.length); // Update currentIndex after removal
    console.log('index', currentIndex);
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
