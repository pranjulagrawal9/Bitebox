import React, { useEffect } from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { ScrollRestoration } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Provider store={store}>
      <div className="app">
        <NavBar />
        <Outlet />
        <Footer />

        <ScrollRestoration />
      </div>
    </Provider>
  );
}

export default App;
