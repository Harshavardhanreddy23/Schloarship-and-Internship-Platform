import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './Signup';
import Signin from './Signin';
import HomePage from './Home';
import AdminSignup from './AdminSignup';
import AdminSignin from './AdminSignin';
import StudentPortal from './StudentPortal';
import AdminPortal from './AdminPortal';
import Layout from './Layout';

// Protected route for students
const StudentPrivateRoute = () => {
  const student = localStorage.getItem('studentEmail');
  return student ? <Outlet /> : <Navigate to="/signin" />;
};

// Protected route for admin
const AdminPrivateRoute = () => {
  const admin = localStorage.getItem('adminEmail');
  return admin ? <Outlet /> : <Navigate to="/adminsignin" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="home" element={<HomePage />} />
          <Route path="adminsignup" element={<AdminSignup />} />
          <Route path="adminsignin" element={<AdminSignin />} />

          {/* Student protected routes */}
          <Route element={<StudentPrivateRoute />}>
            <Route path="studentportal" element={<StudentPortal />} />
          </Route>

          {/* Admin protected routes */}
          <Route element={<AdminPrivateRoute />}>
            <Route path="admin" element={<AdminPortal />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
