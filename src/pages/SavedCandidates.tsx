import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import SavedCandidatesCard from '../components/SavedCandidatesCard';

interface FilmsToWatchProps {
  filmsToWatch: Film[];
  removeFromStorage:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnWatchList: boolean | null | undefined,
        currentlyOnSeenItList: boolean | null | undefined,
        title: string | null
      ) => void)
    | null;
}

const SavedCandidates = () => ({
  filmsToWatch,
  removeFromStorage,
}: FilmsToWatchProps) => {
  console.log(filmsToWatch);

  return (
    <>
      <h1>Potential Candidates</h1>
      <ul>
        {filmsToWatch.map((film) => (
          <FilmCard
            currentFilm={film}
            key={film.Title}
            onWatchList={true}
            removeFromStorage={removeFromStorage}
          />
        ))}
      </ul>
    </>
  );
};

export default SavedCandidates;
