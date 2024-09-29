import React from 'react';
import Navbar from '../Dashboard/components/Navbar/navbar';

const Layout = (props) => {
  return (
    <div className="layout-container">
      <Navbar {...props}/>
    </div>
  );
};

export default Layout;