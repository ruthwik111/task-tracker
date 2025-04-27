import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Auth from './components/Auth';
import Task from './components/Task';
import Project from './components/Project'; // Import Project component
import './index.css';

const App = () => {
    const [token, setToken] = useState(null);   

    return (
        <div>
            <Routes>
                <Route path="/" element={token ? (
                    <>
                        <Task token={token} />
                        <Project token={token} /> {/* Include Project component */}
                    </>
                ) : (
                    <Auth setToken={setToken} />
                )} />
                <Route path="/login" element={<Auth setToken={setToken} />} />
                <Route path="/signup" element={<Auth setToken={setToken} />} />
                {/* Add other routes as needed */}
            </Routes>
        </div>
    );
};

export default App;