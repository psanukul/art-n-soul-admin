import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";
import { injectStore } from "./Service/axiosintercepter";

import Layout from "./components/Layout/Layout";
import store from "./features/store";
import {
  AddFilms,
  AddPhotography,
  Dashboard,
  Films,
  HomePage,
  Login,
  NotFound,
  Photography,
  ViewFilm,
  ViewPhotography,
} from "./pages";
import Contacts from "./pages/Contacts/Contacts";


const isUserLoggedIn = localStorage.getItem("ismtnusrlgd");

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn ? <Layout /> : <Navigate to="/login" />,

      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: "/*",
          element: <NotFound />,
        },
        {
          path: "/photography",
          element: <Photography />,
        },

        {
          path: "/films",
          element: <Films />,
        },
        {
          path: "/films/add",
          element: <AddFilms />,
        },

        {
          path: "/films/edit/:id",
          element: <AddFilms />,
        },
        {
          path: "/photography/add",
          element: <AddPhotography />,
        },

        {
          path: "/photography/edit/:id",
          element: <AddPhotography />,
        },
        {
          path: "/photography/view/:id",
          element: <ViewPhotography />,
        },
        {
          path: "/films/view/:id",
          element: <ViewFilm />,
        },
        {
          path: "contacts",
          element: <Contacts />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  injectStore(store);
  return (
    <>
      <Toaster richColors containerClassName="overflow-auto" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
