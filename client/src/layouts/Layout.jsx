import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect, useContext } from 'react';
import { Context } from "../Context";


import "./Layout.css"
const Layout = (props) => {
  const { setIsOnProfile } = useContext(Context);
  const { handleVerify, handleLogout } = props;

  setIsOnProfile(false);
  useEffect(() => {
    handleVerify()
  }, [])

  return (
    <div className="layout-parent">
      <Header handleLogout={handleLogout} />
      <div className="layout-children">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;