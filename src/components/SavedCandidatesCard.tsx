import React, { useEffect, useState } from 'react';
import {Candidate} from '../interfaces/Candidate.interface';

interface SavedCandidatesCardProps {
    candidate: Candidate;
    removeFromPotentialCandidates: (username: string) => void;
  }

const SavedCandidatesCard: React.FC<SavedCandidatesCardProps> = ({ removeFromPotentialCandidates }) => {
    const [storedCandidates, setStoredCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const savedCandidates = localStorage.getItem('savedCandidates');
        if (savedCandidates) {
            setStoredCandidates(JSON.parse(savedCandidates));
        }
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {storedCandidates.map(storedCandidate => (
                        <tr key={storedCandidate.login}>
                            <td><img src={storedCandidate.avatar_url} alt={storedCandidate.name || "No Name"} /></td>
                            <td>{storedCandidate.name || storedCandidate.login}</td>
                            <td>{storedCandidate.location || "Not specified"}</td>
                            <td>{storedCandidate.email || "Not specified"}</td>
                            <td>{storedCandidate.company || "No Company"}</td>
                            <td>
                                <button onClick={() => removeFromPotentialCandidates(storedCandidate.login)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SavedCandidatesCard;