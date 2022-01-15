import { MailOutlined, PhoneAndroid, RoomOutlined } from "@material-ui/icons";
import { Facebook, Instagram, Pinterest, Twitter } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import telebirr from "../images/telebirr-logo.png";
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const LOGO = styled.h1``;
const DESC = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-item: center;
`;
const Payment = styled.img`
  padding-top: 0;
  margin-top: 0;
  width: 15%;
  height: 15%;
`;
const Footer = () => {
  return (
    <Container>
      <Left>
        <LOGO>EMILKA.</LOGO>
        <DESC>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
          voluptates explicabo alias nostrum consequatur, in eligendi nesciunt
          beatae placeat eum eveniet ratione atque itaque temporibus deleniti.
          Illo consectetur provident exercitationem?
        </DESC>
        <SocialContainer>
          <SocialIcon color="385999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>HOME</ListItem>
          <ListItem>CART</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>MY Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomOutlined style={{ marginRight: "10px" }} /> 6 Kilo, Addis Ababa,
          Ethiopia
        </ContactItem>
        <ContactItem>
          <PhoneAndroid style={{ marginRight: "10px" }} /> +251 911******
        </ContactItem>
        <ContactItem>
          <MailOutlined style={{ marginRight: "10px" }} />
          emilka.website@gmail.com
        </ContactItem>
        {/* payment image source should be telebirr image */}
        <Payment src={telebirr}></Payment>
      </Right>
    </Container>
  );
};

export default Footer;
