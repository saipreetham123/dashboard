import checkAuthentication from "./checkAuthentication";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import Navbar from '../Dashboard/components/Navbar/navbar'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes(props) 
{
  //const [isAuthenticated, setIsAuthenticated] = useState(null);

  const result =
      localStorage.getItem('userId') &&
      localStorage.getItem('userId').length > 0 &&
      localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken').length > 0;
    //setIsAuthenticated(result);

    return result ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;