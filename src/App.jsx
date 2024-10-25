import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "sonner";

///// pages /////

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login/Login";

import Layout from "./components/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";

import Contacts from "./pages/Contacts/Contacts";
import store from "./features/store";
import { Provider } from "react-redux";
import Photography from "./pages/Photography/Photography";
import AddPhotography from "./pages/Photography/AddPhotography";
import { injectStore } from "./Service/axiosintercepter";

const isUserLoggedIn = localStorage.getItem("ismtnusrlgd");

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn ? <Layout /> : <Navigate to="/login" />,

      children: [
        {
          path: "/",
          element: <Dashboard />,
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
          path: "/photography/add",
          element: <AddPhotography />,
        },
        {
          path: "/contacts",
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
  injectStore(store)
  return (
    <>
      <Provider store={store}>
        <Toaster richColors containerClassName="overflow-auto" />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
