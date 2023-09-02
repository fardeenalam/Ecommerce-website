import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "productList",
            element: <ProductList />
          },
          {
            path: "product",
            element: <Product />
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
