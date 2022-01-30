import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Axios from "axios";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useAuth } from "../contexts/AuthContext";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.div`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  let totalPrice = 0;
  let orders = [];
  let orderItem = {};
  const {
    currentUser,
    cartBadge,
    setCartBadge,
    productsList,
    setProductsList,
    setOrderItem,
    order,
  } = useAuth();
  const [cartItems, setCartItems] = useState();
  useEffect(() => {
    //get products from the cart
    Axios.post("http://localhost:3001/cart/viewcart", {
      Owner: currentUser?.email,
    }).then((response) => {
      console.log("carrrtttt:  ", response.data.length);
      setCartBadge(response.data.length);
      setCartItems([...response.data]);
    });

    //get all products will be reqested here too
    Axios.get("http://localhost:3001/getallproducts").then((response) => {
      setProductsList([...response.data]);
    });
  }, []);
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Title>Your Bag{console.log(order)}</Title>
        <Top>
          <TopButton>CONTINUE SHOPING</TopButton>
          <TopTexts>
            <TopText>Shoping Bag(2)</TopText>
            <TopText>Your WishList(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItems?.map((i) => {
              return (
                <Product>
                  {productsList?.map((pi) => {
                    if (pi._id.toString() === i.productId.toString()) {
                      totalPrice = totalPrice + pi.price;
                      orderItem = {
                        customer: currentUser.email,
                        productID: i.productId,
                        address: {},
                        quantity: i.quantity,
                        size: i.size,
                      };
                      orders.push(orderItem);

                      return (
                        <div>
                          <ProductDetail>
                            <Image src={pi.imgUrl} />

                            <Details>
                              <ProductName>
                                <b>Product: </b>
                                {pi.garmentName}
                              </ProductName>
                              {/* <ProductId>
                              <b>ID: </b>345345345
                            </ProductId> */}

                              <ProductSize>
                                <b>Size: </b> {i.size}
                              </ProductSize>
                            </Details>
                          </ProductDetail>
                          <PriceDetail>
                            <ProductAmountContainer>
                              <Add />
                              <ProductAmount>{i.quantity}</ProductAmount>
                              <Remove />
                            </ProductAmountContainer>
                            <ProductPrice>{pi.price} ETB</ProductPrice>
                          </PriceDetail>
                        </div>
                      );
                    }
                  })}
                </Product>
              );
            })}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{totalPrice} ETB</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{totalPrice} ETB</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout> */}
            <Button
              onClick={() => {
                setOrderItem([...orders]);
              }}
            >
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
