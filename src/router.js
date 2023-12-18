import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
// import SignUp from "./pages/signUp/SignUp";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
// import SignIn from "./pages/signIn/SignIn";
import MapOfGoogle from "./pages/homepage/components/MapOfGoogle";
// import { userLoader } from './loaders/userLoader';


export const router = createBrowserRouter([
   {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: userLoader,
    children: [
        {
            index: true,
            element: <Homepage />,
        },
        // {
        //     path: "/signup",
        //     element: <SignUp />,
        // },
        // {
        //     path: "/signin",
        //     element: <SignIn />,
        // },
        {
            path:"/MapOfGoogle",
            element:<MapOfGoogle />
        },
    ]
   } 
])