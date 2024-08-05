import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import CoursesPage from './components/CoursesPage';
import AdminAddCourseForm from './components/AddCourse';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/admin/add-course" element={<AdminAddCourseForm />} />
      </Routes>
    </Router>
  );
};

export default App;
