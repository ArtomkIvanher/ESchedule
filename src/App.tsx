// App.tsx
import React from 'react';
import Schedule from './components/Schedule';
import Registration from './components/User/Registration/Registration';
import Login from './components/User/Login/Login';

const App: React.FC = () => {
    return (
        <div>
            <h1>Schedule App</h1>
            <Registration />
            <Login />
            <Schedule />
        </div>
    );
};

export default App;
