import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useRef } from "react";

export default function Layout() {
  const portfolioRef = useRef(null);
  return (
    <>
      {/* {loading && <Loader />} */}
      <Header />
      <div className="wrapper">
        <Outlet context={{ portfolioRef }} />
      </div>
      {/* <Footer /> */}
    </>
  );
}
