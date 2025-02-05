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

  const [candidateList, setCandidateList] = useState<Candidate[]>([]);

  useEffect(() => {
    searchGithub().then((data) => {
      setCandidateList(data);
    });
  }, []);


  const addToSavedList = () => {
    let parsedSavedCandidates: Candidate[] = [];
    const storedSavedCandidates = localStorage.getItem('savedCandidates');
    if (storedSavedCandidates) {
      parsedSavedCandidates = JSON.parse(storedSavedCandidates);
    }
    if (!parsedSavedCandidates.some(c => c.username === currentCandidate.username)) {
      parsedSavedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(parsedSavedCandidates));
    }
  };

  const removeCandidate = (username: string) => {
    setCandidateList((prevList) => {
      const updatedList = prevList.filter(candidate => candidate.username !== username);
  
      // If the removed candidate was the current one, cycle to the next one
      if (currentCandidate.username === username && updatedList.length > 0) {
        const nextCandidate = updatedList[0]; // Pick the first in the updated list
        searchGithubUser(nextCandidate.username).then((data) => {
          setCurrentCandidate({
            name: data.name,
            username: data.login,
            location: data.location,
            avatar: data.avatar_url,
            html_url: data.html_url,
            company: data.company,
          });
        });
      } else if (updatedList.length === 0) {
        // If the list is empty after removal, reset currentCandidate
        setCurrentCandidate({
          name: '',
          username: '',
          location: '',
          avatar: '',
          html_url: '',
          company: '',
        });
      }
  
      return updatedList;
    });
  };

  useEffect(() => {
    if (candidateList.length === 0) return; // Avoid running when list is empty
    const randomIndex = Math.floor(Math.random() * candidateList.length);
    const randomCandidate = candidateList[randomIndex];
    searchGithubUser(randomCandidate.username).then((data) => {
      setCurrentCandidate({
        name: data.name,
        username: data.login,
        location: data.location,
        avatar: data.avatar_url,
        html_url: data.html_url,
        company: data.company,
      });
    });
  }, [candidateList]);
  
 

  return (
    <>
      <h1>CandidateSearch</h1>
      <CandidateCard
        currentCandidate={currentCandidate}
        addToSavedList={addToSavedList}
        removeCandidate={removeCandidate} // Pass function to remove a candidate
/>
    </>
  );
};

export default CandidateSearch;
