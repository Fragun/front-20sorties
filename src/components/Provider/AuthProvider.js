// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import { signin as login } from "../../apis/auth";
// import { signout as logout } from "../../apis/auth";
// import { AuthContext } from "../../context";

// export default function AuthProvider({ children }) {
//   const initialUser = useLoaderData();
//   const [user, setUser] = useState(initialUser);
  
//   const [userGoogle, setUserGoogle] = useState({});
//   const [userFacebook, setUserFacebook] = useState({});
//   // console.log(userFacebook);
//   // console.log(userGoogle);
//   // console.log(user);

//   useEffect(() => {
//     /** @type {*} 
//      * exécuté une fois, lors du montage initial du composant. 
//      * Il récupère les données de l'utilisateur Google à partir du stockage local. 
//      * Si des données sont présentes, elles sont analysées en tant qu'objet JSON à l'aide de JSON.parse() 
//      * puis l'état userGoogle est mis à jour avec ces données.
//     */
//     const userGoogleData = localStorage.getItem("userGoogle");
//     if (userGoogleData) {
//       const parsedData = JSON.parse(userGoogleData);
//       setUserGoogle(parsedData);
//     }
//   }, []);

//   async function signInFacebook(response) {
//     setUserFacebook(response)
//   }

//   async function signin(credentials) {
//     const newUser = await login(credentials);
//     setUser(newUser);
//   }

//   async function signout() {
//     await logout();
//     setUser(null);
//   }

//   async function signoutGoogle() {
//     localStorage.removeItem("userGoogle"); //permet d'enlever le token google
//     setUserGoogle({});
//   }

//   async function signoutFacebook() {
//     localStorage.removeItem("fblst_6447709785249838");
//     sessionStorage.removeItem("fbssls_6447709785249838");
//     setUserFacebook({});
//   }

//   return (

//       <AuthContext.Provider
//         value={{
//           userGoogle,
//           user,
//           signin,
//           signout,
//           signoutGoogle,
//           userFacebook,
//           signoutFacebook,
//           signInFacebook
//         }}
//       >
//         {children}
//       </AuthContext.Provider>

//   );
// }
