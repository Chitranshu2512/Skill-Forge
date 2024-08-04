import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import Courses from './components/Courses';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
};

export default App;
