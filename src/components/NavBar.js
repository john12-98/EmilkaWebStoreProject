import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Search from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useAuth } from "../contexts/AuthContext";
import { mobile } from "../responsive.js";
import { Badge } from "@material-ui/core";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "30px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "18px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const NavBar = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("failed to logout");
    }
  }

  function checkCurrentUser() {
    if (currentUser === null) {
      console.log("current user is:    ", currentUser);
      return false;
    } else {
      console.log("current user is:    ", currentUser);
      return true;
    }
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        {/* {error && <p>{error}</p>} */}
        <Center>
          <Logo>Emilka.</Logo>
        </Center>
        <Right>
          {checkCurrentUser() ? (
            <span>{1}</span>
          ) : (
            <MenuItem
              onClick={() => {
                history.push("/signup");
              }}
            >
              REGISTER
            </MenuItem>
          )}

          {checkCurrentUser() ? (
            <span>{1}</span>
          ) : (
            <MenuItem
              onClick={() => {
                history.push("/login");
              }}
            >
              SIGN IN
            </MenuItem>
          )}
          {checkCurrentUser() ? (
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          ) : (
            <span>{1}</span>
          )}
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
