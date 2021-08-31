import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect } from 'react';

import "./Layout.css"
const Layout = (props) => {
  const { handleVerify, handleLogout, isOnProfile, setIsOnProfile  } = props;

  useEffect(() => {
    setIsOnProfile(false);
    handleVerify()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="layout-parent">
      <Header handleLogout={handleLogout}
        isOnProfile={isOnProfile} />
      <div className="layout-children">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;