import React from "react";
import styled from "styled-components";

import { popularProducts } from "../data";
import Product from "./Product";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ p, gender }) => {
  let g = gender.toString().toLowerCase();
  return (
    <Container>
      {console.log("p is: ", p)}
      {p?.map((item) => {
        // console.log(item.gender);
        console.log("uuuuuuuuuuuu", g);
        if (item.gender === g) {
          return <Product item={item} key={item._id} />;
        }
      })}
    </Container>
  );
};

export default Products;
