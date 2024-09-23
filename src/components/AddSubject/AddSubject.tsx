// AddSubject.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface AddSubjectProps {
    onAddSubject: (newSubject: { id: number; subject: string; time: string }) => void;
}

const AddSubject: React.FC<AddSubjectProps> = ({ onAddSubject }) => {
    const [subject, setSubject] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/schedule', { subject, time });
            onAddSubject(response.data); // Передаємо новий предмет
            setSubject('');
            setTime('');
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
            />
            <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time"
                required 
            />
            <button type="submit">Add Subject</button>
        </form>
    );
};

export default AddSubject;
