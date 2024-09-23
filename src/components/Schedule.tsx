// Schedule.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddSubject from './AddSubject/AddSubject';

interface Subject {
    id: number;
    subject: string;
    time: string;
}

const Schedule: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await axios.get('http://localhost:5000/api/schedule');
            setSubjects(response.data);
        };
        fetchSubjects();
    }, []);

    const addSubject = (newSubject: Subject) => {
        setSubjects((prev) => [...prev, newSubject]);
    };

    return (
        <div>
            <AddSubject onAddSubject={addSubject} />
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id}>{subject.subject} at {subject.time}</li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;
