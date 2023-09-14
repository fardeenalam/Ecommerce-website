import "./App.css";
import {
    Link,
    Navigate,
    Outlet,
    Route,
    Router,
    Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navigation = styled.div`
    width: 500px;
    height: 20px;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
`;

function App() {
    const isLoggedIn = false;

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    );
}

export default App;
