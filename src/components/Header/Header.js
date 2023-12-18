import React from "react";
import styles from "./Header.module.scss";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context";
import logo from "../../assets/png/logo.png";
// const ALERT_SHOWN_KEY = "alertShown";

export default function Header() {
  // const {
  //   userGoogle,
  //   user,
  //   signout,
  //   signoutGoogle,
  //   userFacebook,
  //   signoutFacebook,
  // } = useContext(AuthContext);

  // let userPictureUrl = "";

  // if (Object.keys(userGoogle).length !== 0) {
  //   // Utilisateur connecté avec Google
  //   userPictureUrl = userGoogle.picture;
  // } else if (Object.keys(userFacebook).length !== 0) {
  //   // Utilisateur connecté avec Facebook
  //   userPictureUrl = userFacebook.picture.data.url;
  // }

  return (
    <header className={`${styles.header} container-fluid`}>
      <div className="row">
        <div className="col-4">
          {" "}
          
        </div>
        <div className="col-4 m-auto text-center">
          <img src={logo} alt="logo 20 sorties" className="logo "></img>
        </div>
        <div className="d-flex justify-content-end col-4">
          {/* <ul className={`${styles.desktopHeader}`}>
            {
            (user) ||
            (userGoogle && Object.keys(userGoogle).length !== 0) ||
            (userFacebook && Object.keys(userFacebook).length !== 0) ? (
              <>
                {user ? (
                  <Link onClick={() => signout()}>
                    <button
                      className={`ml10 ${styles.myButton}`}
                      onClick={localStorage.removeItem(ALERT_SHOWN_KEY)}
                    >
                    </button>
                  </Link>
                ) : (
                  ""
                )}
                {userGoogle && Object.keys(userGoogle).length !== 0 ? (
                  <Link onClick={() => signoutGoogle()}>
                    <button
                      className={`ml10 ${styles.myButton}`}
                      onClick={localStorage.removeItem(ALERT_SHOWN_KEY)}
                    >
                      <img
                        src={userPictureUrl}
                        alt=""
                        className="avatar"
                      ></img>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
                {userFacebook && Object.keys(userFacebook).length !== 0 ? (
                  <Link onClick={() => signoutFacebook()}>
                    <button
                      className={`${styles.myButton}`}
                      onClick={localStorage.removeItem(ALERT_SHOWN_KEY)}
                    >
                      {" "}
                      <img
                        src={userPictureUrl}
                        alt="avatar utilisateur facebook"
                        className="avatar"
                      ></img>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <Link to="/signin">
                  <button type="button" className={`${styles.myButtonGreen} mr10`}>
                    <i className=""></i>
                    <span>Connexion</span>
                  </button>
                </Link>
              </>
            )}
          </ul> */}
        </div>
      </div>
    </header>
  );
}
