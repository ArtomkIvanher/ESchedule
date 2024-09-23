import React, { useEffect, useState } from 'react';
import { fetchSchedule } from '../services/scheduleService';

interface Subject {
    id: number;
    subject: string;
    time: string;
}

const Schedule: React.FC = () => {
    const [schedule, setSchedule] = useState<Subject[]>([]);

    useEffect(() => {
        const getSchedule = async () => {
            const data = await fetchSchedule();
            setSchedule(data);
        };
        getSchedule();
    }, []);

    return (
        <div>
            <h1>Розклад</h1>
            <ul>
                {schedule.map(item => (
                    <li key={item.id}>{item.subject} - {item.time}</li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;
