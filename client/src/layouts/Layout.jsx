import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Layout.css"
const Layout = (props) => {

  return (
    <div className="layout-parent">
      <Header />
      <div className="layout-children">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;