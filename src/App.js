import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
// import AuthProvider from "./components/Provider/AuthProvider";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
          <Header />
          <div className="d-flex flex-column flex-fill">
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
          <Footer />
    </div>
  );
}

export default App;
