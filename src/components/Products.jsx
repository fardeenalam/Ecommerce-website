import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
    console.log(cat, filters, sort);
    const [data, setData] = useState(null);
    const url = "http://23.22.58.241:8080";
    const jwtToken =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJpc3MiOiJFdmVudCBTY2hlZHVsZXIiLCJpYXQiOjE2OTQ1MzEwODIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0.U4Ds_hlFwUua-7nsqjRCBmYyN6u-NMLiUHNGWLbX1og";

    useEffect(() => {
        const getProducts = async () => {
            await axios
                .get(`${url}/api/public/products/keyword/${cat}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
                .then((response) => setData((prev) => (prev = response)))
                .catch((err) => {
                    if (err.response.status === 302) {
                        setData(err.response.data.content);
                        console.log(err.response.data.content);
                    } else {
                        console.log(err);
                    }
                });
        };
        getProducts();
    }, [cat]);

    useEffect(() => {}, [cat, filters]);

    return (
        <Container>
            {popularProducts.map((item) => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Products;
