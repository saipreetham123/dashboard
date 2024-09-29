import { React, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout/Layout.js';
import ProtectedRoutes from './Routing/ProtectedRoutes.js';
import Forgotpassword from './Login/forgotpassword.js';
import Notifications from './messages.js';
import AllRoutes from './Routing/AllRoutes.js';
import { Chart } from './Dashboard/components/Home/components/AreaChart';
import { ProjectPage } from './Dashboard/components/Project/project.js';
import { Users } from './Dashboard/components/User/users';
import { Organizations } from './Dashboard/components/Organizations/organizations';
import LoginPage from './Login/LoginPage.jsx';

function App() {
  const navigation = useNavigate();

  console.log('1');

  useEffect(function () {
    const handleStorageEvent = function (event) {
      if (localStorage.length === 0) {
        Notifications.ShowInformationMessage(
          'Session Expired. Please login again.'
        );
        navigation('/');
      }
    };
    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  const VerifyPermissionForCurrentRoute = (RoleName, pathname) => {
    var FilteredRoutes = AllRoutes.filter(function (EachRoute) {
      return (
        EachRoute.path === window.location.pathname &&
        EachRoute.Roles.includes(RoleName.toUpperCase())
      );
    });
    return FilteredRoutes.length > 0;
  };

  if (localStorage.role) {
    if (!VerifyPermissionForCurrentRoute(localStorage.role)) {
      Notifications.ShowWarningMessage('No Access');
      navigation('/');
    }
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route
          path='/forgotpassword'
          element={<Forgotpassword result={false} />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<Chart />} />
            <Route path='/dashboard/projects' element={<ProjectPage />} />
            <Route path='/dashboard/users' element={<Users />} />
            <Route
              path='/dashboard/organizations'
              element={<Organizations />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
