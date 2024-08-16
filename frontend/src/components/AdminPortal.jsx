import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminAddCourseForm from './AddCourse';
import EditCourse from './EditCourse';
import ViewUser from './ViewUser';
import AdminChangePassword from './AdminChangePassword';
import AdminLogin from './AdminLogin'; // Import the AdminLogin component


function AdminPortal() {
    const [view, setView] = useState('dashboard');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state for authentication
    

    useEffect(() => {
        const checkAdmin = async () => {
            try {
              const apiUrl = import.meta.env.VITE_BACKEND_URL;
              const response = await axios.get(`${apiUrl}/api/admin`, {withCredentials:true});
              setIsAuthenticated(response.data.authorized);
            } 
            catch (error) {
              console.error('Failed to fetch admin:', error);
            }
          };
      
          checkAdmin();
    }, [])
    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <ViewUser setIsAuthenticated = {setIsAuthenticated} />;
            case 'courses':
                return <AdminAddCourseForm />;
            case 'editCourse':
                return <EditCourse />;
            case 'changePassword':
                return <AdminChangePassword />;
            default:
                return <ViewUser />;
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {!isAuthenticated && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <AdminLogin setIsAuthenticated={setIsAuthenticated} />
                </div>
            )}
            {isAuthenticated && (
                <div className="admin-portal flex flex-col md:flex-row">
                    <nav className="bg-blue-600 text-white w-full md:w-1/4 p-4 md:p-6 flex flex-col">
                        <ul className="flex flex-col md:flex-col justify-around md:justify-start md:space-y-4 w-full">
                            <li 
                                className={`cursor-pointer text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ${
                                    view === 'dashboard' ? 'bg-blue-700' : ''
                                }`} 
                                onClick={() => setView('dashboard')}
                            >
                                View Users
                            </li>
                            <li 
                                className={`cursor-pointer text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ${
                                    view === 'courses' ? 'bg-blue-700' : ''
                                }`} 
                                onClick={() => setView('courses')}
                            >
                                Add Course
                            </li>
                            <li 
                                className={`cursor-pointer text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ${
                                    view === 'editCourse' ? 'bg-blue-700' : ''
                                }`} 
                                onClick={() => setView('editCourse')}
                            >
                                Edit Course
                            </li>
                            <li 
                                className={`cursor-pointer text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ${
                                    view === 'changePassword' ? 'bg-blue-700' : ''
                                }`} 
                                onClick={() => setView('changePassword')}
                            >
                                Change Admin Password
                            </li>
                        </ul>
                    </nav>
                    <div className="admin-content flex-1 p-4 md:p-8">
                        {renderView()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPortal;
