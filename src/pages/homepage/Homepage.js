// import { useContext, useEffect } from "react";
// import { AuthContext } from "../../context";
// import { Navigate } from "react-router-dom";
import MapOfGoogle from "./components/MapOfGoogle";
import 'animate.css';
// import AlertSweet from "../../components/alert/AlertSweetWithoutRefresh";
// const ALERT_SHOWN_KEY = "alertShown";

export default function Homepage() {
  // const { user, userGoogle, userFacebook } = useContext(AuthContext);
  //console.log(userGoogle);

  // useEffect(() => {
  //   const isAlertShown = localStorage.getItem(ALERT_SHOWN_KEY);
  //   if (!isAlertShown && (userGoogle.name)) {
  //     AlertSweet(`Bravo ${userGoogle.name}`, `Vous êtes connecté avec votre compte Google ${userGoogle.email}`);
  //     localStorage.setItem(ALERT_SHOWN_KEY, "true");
  //   }
  // }, [userGoogle]);

  // useEffect(() => {
  //   const isAlertShown = localStorage.getItem(ALERT_SHOWN_KEY);
  //   if (!isAlertShown && (userFacebook.name)) {
  //     AlertSweet(`Bravo ${userFacebook.name}`, `Vous êtes connecté avec votre compte Facebook ${userFacebook.email}`);
  //     localStorage.setItem(ALERT_SHOWN_KEY, "true");
  //   }
  // }, [userFacebook]);

  return (
    <>
      {/* {user||
      (userGoogle && Object.keys(userGoogle).length !== 0) ||
      (userFacebook && Object.keys(userFacebook).length !== 0) ? ( */}
        <div className="container">
             <MapOfGoogle className='animate__animated animate__bounce'/> 
        </div>
      {/* ) : (
        <Navigate to="/signin" />
      )} */}
    </>
  );
}
