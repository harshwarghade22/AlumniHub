// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LinkedInLogin from './components/LinkedInLogin';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateProfile from './components/CreateProfile';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app">
        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className={`content-wrapper ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<CreateProfile />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
