import React from 'react';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div>{children}</div> {/* Content of each page will go here */}
    </div>
  );
};

export default Layout;
