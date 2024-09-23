// App.tsx
import React from 'react';
import Schedule from './components/Schedule';
import AddSubject from './components/AddSubject/AddSubject';

const App: React.FC = () => {
    const handleAddSubject = (newSubject: { id: number; subject: string; time: string }) => {
        // Логіка для обробки нових предметів, якщо потрібно
    };

    return (
        <div>
            <h1>Schedule App</h1>
            
            <Schedule />
        </div>
    );
};

export default App;
