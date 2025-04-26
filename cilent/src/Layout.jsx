import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Home.css';

const Layout = () => {
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [studentEmail, setStudentEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('studentEmail');
    setStudentEmail(email); // Only set student email
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleStudentSignIn = () => {
    setIsDropdownVisible(false);
    navigate('/signin');
  };

  const handleAdminSignUp = () => {
    setIsDropdownVisible(false);
    navigate('/adminsignup');
  };

  const handleLogout = () => {
    localStorage.clear();
    setStudentEmail(null);
    navigate('/signin');
  };

  return (
    <>
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">Scholarships & Internships</h1>
        <ul className="flex space-x-6 items-center">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#scholarships" className="nav-link">Scholarships</a></li>
          <li><a href="#internships" className="nav-link">Internships</a></li>

          {studentEmail ? (
            <>
              <li className="text-white font-medium">{studentEmail}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><a href="/signup" className="nav-link">Sign Up</a></li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="nav-link hover:bg-blue-500 px-2 py-1 rounded"
                >
                  Sign In
                </button>
                {isDropdownVisible && (
                  <div className="absolute right-0 mt-2 w-32 bg-white text-black shadow-md rounded">
                    <button
                      onClick={handleStudentSignIn}
                      className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                    >
                      Student
                    </button>
                    <button
                      onClick={handleAdminSignUp}
                      className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                    >
                      Admin
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
