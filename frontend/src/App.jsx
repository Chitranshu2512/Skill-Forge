import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import CoursesPage from './components/CoursesPage';
import AdminAddCourseForm from './components/AddCourse';
import EditCourse from './components/EditCourse';
import EditCourseModal from './components/EditCourseModal';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<UserForm />} /> */}

        <Route path="/" element={<CoursesPage />} />

        <Route path='/admin'>
          <Route path='add-course' element = {<AdminAddCourseForm/>}/>
          <Route path="edit-course" element={<EditCourse/>} />
          <Route path="edit-course/:courseId" element={<EditCourseModal />}/>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;
