import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import HomePage from "../pages/HomePage";
import About from "../pages/About";
import Layout from "../components/Layout";
import PortfolioCategory from "../pages/PortfolioCategory";
import NotFound from "../pages/NotFound";

function App() {
  function Wrapper({ children }) {
    const location = useLocation();
    useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [location.pathname, location.key]);

    return children;
  }

  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="sobre" sensitive={false} element={<About />} />
            <Route
              path=":category"
              sensitive={false}
              element={<PortfolioCategory />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
