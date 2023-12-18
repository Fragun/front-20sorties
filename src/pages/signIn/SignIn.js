import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
//import { createUserGoogle } from "../../apis/users";
import styles from "../../components/Header/Header.module.scss";
import style from "./SignIn.module.scss"

export default function SignIn() {
  const { signin, user, userFacebook, userGoogle, signInFacebook } = useContext(AuthContext);
  //console.log(user);

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email non valide")
      .required("Ce champ doit être saisi"),
    password: Yup.string()
      .required("Required")
      .min(6, "Le mot de passe doit contenir 6 caractères min."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
      await signin(values);
      navigate("/");
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  /**
   * fonction qui est appelée lorsque la connexion avec Google réussit. 
   * Elle récupère le jeton d'authentification (googleToken), le décode en utilisant jwt_decode,
   *  masque le bouton de connexion Google, stocke le décodage du jeton dans le stockage local
   * et recharge la page pour mettre à jour l'état de l'authentification.
   *
   * @param {*} credentialResponse 
   */
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      let googleToken = credentialResponse.credential;
      let decoded = jwt_decode(googleToken);
      document.getElementById("signInGoogle").hidden = true;
      localStorage.setItem("userGoogle", JSON.stringify(decoded));
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  const responseFacebook = async (response) => {
    try {
      await signInFacebook(response);
    } catch (error) {
      console.error(error);
    }
  };
    
  const handleGoogleLoginError = () => {
    console.log("Login Failed");
    alert("Échec de la connexion avec Google. Veuillez réessayer.");
  };

  return (
    <>
      {user ||
      (userGoogle && Object.keys(userGoogle).length !== 0) ||
      (userFacebook && Object.keys(userFacebook).length !== 0) ? (
        <Navigate to="/" />
      ) : (
        <div className="d-flex justify-content-center">
          <div className={` m30`}>
            <h1 className="text-center titleConnexion mb-3"> Connexion </h1>
            <form
              onSubmit={submit}
              className="d-flex flex-column justify-content-center align-items-center p20"
            >
              <div className="d-flex flex-column">
                <label htmlFor="email" className="mb10 pl20">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>

              <div className="d-flex flex-column mt10 mb20">
                <label htmlFor="password" className="m-2">
                  Mot de passe :
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
              </div>
              {errors.generic && (
                <p className="form-error">{errors.generic.message}</p>
              )}
              <div className="mt-3">
                <button 
                  disabled={isSubmitting} 
                  className={`${styles.myButtonGreen}`}>
                    Connexion
                </button>
              </div>
            </form>

            <div className="text-center mt-3">-------------------------------OU-------------------------------</div>

            <div className="d-flex flex-column align-items-center">
              <div id="signInGoogle" className="mt-3">
                <GoogleLogin
                  buttonText="Connexion avec Google"
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div className="mt-3">
                <FacebookLogin
                  cssClass={`${style.facebookButton}`}
                  appId={`${process.env.REACT_APP_FACEBOOK_KEY}`}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  icon="fa-brands fa-facebook-f"
                  textButton="&nbsp;&nbsp;Se connecter avec Facebook"
                />
              </div>
                 

              <div className="text-center mt-3">----------------------Pas encore inscrit ?----------------------</div>

              <Link to="/SignUp">
                <p>
                  Si vous voulez créer un compte sur notre site inscrivez-vous
                  ici
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
