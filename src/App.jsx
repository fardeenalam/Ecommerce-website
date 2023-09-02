import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import styled from "styled-components";

const Navigation = styled.div`
    width: 500px;
    height: 20px;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
`;

function App() {
    return (
        <div className="App">
            <Navigation>
                <Link to={`/`} className="link">
                    Home
                </Link>
                <Link to={`productList`} className="link">
                    ProductList
                </Link>
                <Link to={`product`} className="link">
                    ProductPage
                </Link>
                <Link to={`cart`} className="link">
                    Cart
                </Link>
                <Link to={`login`} className="link">
                    Login
                </Link>
                <Link to={`register`} className="link">
                    Register
                </Link>
            </Navigation>
            <Outlet />
        </div>
    );
}

export default App;
