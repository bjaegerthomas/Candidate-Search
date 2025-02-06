import React, { useEffect, useState } from 'react';
import React from 'react';
import Candidate from '../interfaces/Candidate.interface';

const [storedCandidates, setStoredCandidates] = useState<Candidate[]>([]);

useEffect(() => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    if (savedCandidates) {
        setStoredCandidates(JSON.parse(savedCandidates));
    }
}, []);

interface SavedCandidatesCardProps {
    storedCandidates: Candidate[];
    removeFromPotentialCandidates: (id: string) => void;
}

const SavedCandidatesCard: React.FC<SavedCandidatesCardProps> = ({storedCandidates, removeFromPotentialCandidates}) => {
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
                        <tr key={storedCandidate.username}>
                            <td>{storedCandidate.avatar}</td>
                            <td>{storedCandidate.name}</td>
                            <td>{storedCandidate.location}</td>
                            <td>{storedCandidate.html_url}</td>
                            <td>{storedCandidate.company}</td>
                            <td>
                            <button onClick={() => removeFromPotentialCandidates(storedCandidate.username)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SavedCandidatesCard;