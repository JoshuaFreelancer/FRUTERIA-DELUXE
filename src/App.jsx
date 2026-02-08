import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/utils/Loader.jsx';
import HeaderSection from './components/HeaderSection.jsx';
import LoginForm from './components/Auth/LoginForm.jsx';
import RegistrationForm from './components/Auth/RegistrationForm.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  const toggleRegistration = () => {
    setShowRegistration((prev) => !prev);
  };

  return (
    <Router>
      <div className="App">
        <Loader />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeaderSection />
                <LoginForm toggleRegistration={toggleRegistration} />
                {showRegistration && <RegistrationForm toggleForm={toggleRegistration} />}
              </>
            }
          />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
