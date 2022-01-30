import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { Redirect, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import { mobile } from "../responsive";
import Axios from "axios";
import { useAuth } from "../contexts/AuthContext";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 90vh;
  object-fit: cover;
`;
const Image = styled.img`
  width: 100%;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  //const [quantity, setQuantity] = useState(1);
  const { search } = useLocation();
  const productParam = new URLSearchParams(search);
  // const imageurl = productParam.get("imageurl");
  const item = productParam.get("itemId");
  const {
    garmentDetails,
    setGarmentDetails,
    currentUser,
    setCartBadge,
    cartBadge,
  } = useAuth();
  console.log("srtsrtsrtsrtsrt  ", garmentDetails);
  if (garmentDetails === undefined) {
    //alert("???");
    Axios.get(`http://localhost:3001/getallproducts/item?id=${item}`).then(
      (response) => {
        console.log("from server", response.data);
        setGarmentDetails({ ...response.data });
      }
    );
  }
  function addToCart() {
    if (currentUser === null) {
      //alert
      console.log("current user is null");
    } else {
      Axios.post(`http://localhost:3001/cart/addtocart`, {
        Owner: currentUser.email,
        ID: garmentDetails._id,
        Quantity: quantity,
        Size: size,
      }).then((response) => {
        console.log("juju", response);
        if (response.statusText === "OK") {
          setCartBadge(cartBadge + 1);
        }
      });
    }
  }
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <ImgContainer>
          <Image src={garmentDetails?.imgUrl}></Image>
        </ImgContainer>
        <InfoContainer>
          <Title>{garmentDetails?.garmentName}</Title>
          <Desc>{garmentDetails?.description}</Desc>
          <Price>{garmentDetails?.price} ETB</Price>
          <FilterContainer>
            {/* <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter> */}
            <Filter>
              <FilterTitle>size</FilterTitle>
              <FilterSize
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                <FilterSizeOption selected disabled>
                  select
                </FilterSizeOption>
                {garmentDetails?.size.map((s) => {
                  return <FilterSizeOption>{s}</FilterSizeOption>;
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              />
              <Amount>{quantity}</Amount>
              <Add
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
