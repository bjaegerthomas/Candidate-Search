import React, { useEffect, useState } from 'react';

interface Candidate {
    id: number;
    name: string;
    position: string;
    experience: number;
}

const SavedCandidatesCard: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const savedCandidates = localStorage.getItem('savedCandidates');
        if (savedCandidates) {
            setCandidates(JSON.parse(savedCandidates));
        }
    }, []);

    return (
        <div>
            <h2>Saved Candidates</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Experience (years)</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.id}</td>
                            <td>{candidate.name}</td>
                            <td>{candidate.position}</td>
                            <td>{candidate.experience}</td>
                            <td>
                            <button onClick={() => removeFromSavedCandidates(candidate.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SavedCandidatesCard;