import React from "react";
import styled from "styled-components";
import Search from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../Responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    height: 60px;
    ${mobile({
        height: "50px",
    })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({
        padding: "10px 0px",
    })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
        display: "none",
    })}
`;

const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    outline: none;
    ${mobile({
        width: "50px",
    })}
`;

const Center = styled.div`
    flex: 1;
`;

const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
    ${mobile({
        fontSize: "24px",
    })}
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
        justifyContent: "center",
        flex: "2",
    })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({
        fontSize: "12px",
        marginLeft: "10px",
    })}
`;

const Navbar = () => {
    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Language>EN</Language>
                        <SearchContainer>
                            <Input placeholder="Search" />
                            <Search style={{ color: "gray", fontSize: 16 }} />
                        </SearchContainer>
                    </Left>
                    <Center>
                        <Logo>Amazon</Logo>
                    </Center>
                    <Right>
                        <MenuItem>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                                to={`register`}
                            >
                                Register
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                                to={`login`}
                            >
                                Sign In
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to={`cart`}>
                                <Badge badgeContent={4} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </Link>
                        </MenuItem>
                    </Right>
                </Wrapper>
            </Container>
        </div>
    );
};

export default Navbar;
