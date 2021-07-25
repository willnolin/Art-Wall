import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useContext } from 'react';
import { Context } from "../Context";


import "./Layout.css"
const Layout = (props) => {
  const { currentUser, handleVerify, handleLogout, setIsOnProfile } = useContext(Context);
  setIsOnProfile(false);
  useEffect(() => {
    handleVerify()
  }, [])

  return (
    <div className="layout-parent">
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <div className="layout-children">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;