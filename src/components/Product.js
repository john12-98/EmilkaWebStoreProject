import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Search from "@material-ui/icons/Search";
//import Product from "../Pages/Product";
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  background-color: rgba(0,0,0,0.2):
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center; 
  transition :all 0.5s ease;
  cursor: pointer
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-item: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
`;
const Image = styled.img`
  height: 75%;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const h = useHistory();
  const { garmentDetails, setGarmentDetails } = useAuth();
  return (
    <div>
      <Container>
        {/* <Circle /> */}
        <Image src={item.imgUrl} />
        <Info>
          <Icon>
            <ShoppingCartOutlinedIcon />
          </Icon>
          <Icon>
            <Search />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
        <label>price: {item.price}</label>
      </Container>
      <button
        onClick={() => {
          setGarmentDetails(item);
          h.push(`/product?itemId=${item._id}`);
        }}
      >
        view garment
      </button>
      {/* <Link to={`/product?imageurl=${item.imgUrl}&price=${item.price}`}>
        view garment
      </Link> */}
    </div>
  );
};

export default Product;
