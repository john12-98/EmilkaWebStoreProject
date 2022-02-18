import React, { useRef, useState } from "react";
//import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault(); //disables clearing/refreshing the form

    try {
      setError("");
      setLoading(true); //prevents the user from multiple clicks of the sign up button
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/"); //goes to dashboard/Home
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <Container>
      <Wrapper>
        <Title>Log In</Title>
        {
          //currentUser.email //for testting purposes
        }
        {error && <Alert severity="error"> {error && <p>{error}</p>}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Input type="email" ref={emailRef} required placeholder="E-mail" />

          <Input
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />

          <Button disabled={loading} type="submit">
            Login
          </Button>

          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div>
            Need an account?<Link to="/signup">Sign up</Link>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
