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
    const url = "http://23.22.58.241:8080";
    const [jwtToken, setJwtToken] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            await axios
                .post(`${url}/api/login`, {
                    email: "admin@gmail.com",
                    password: "admin",
                })
                .then((response) => {
                    const data = response.data;
                    const token = data["jwt-token"];
                    setJwtToken(token);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };
        getToken();
    }, []);

    useEffect(() => {
        console.log("Fetched Data:", data);
    }, [data]);

    const getProducts = async () => {
        await axios
            .get(`${url}/api/public/products`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => setData((prev) => (prev = response)))
            .catch((err) => {
                if (err.response.status === 302) {
                    setData(err.response.data.content);
                    console.log(data);
                } else {
                    console.log(err);
                }
            });
    };

    // const accessToken =
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJFdmVudCBTY2hlZHVsZXIiLCJpYXQiOjE2OTQxODUwOTIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0.cKG9YaZBX-OVUVHOvoOEYCJKAnEyATkGvnWljbKs4sM";

    // axios.interceptors.request.use(
    //     (config) => {
    //         config.headers.authorization = `Bearer ${accessToken}`;
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    // const productData = axios.get(`${url}api/public/products`);

    // console.log(productData);

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
