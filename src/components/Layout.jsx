import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      {/* {loading && <Loader />} */}
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
}
