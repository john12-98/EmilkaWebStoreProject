import React, { useRef, useState } from "react";
//import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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
  width: 40%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault(); //disables clearing/refreshing the form

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true); //prevents the user from multiple clicks of the sign up button and create multiple accounts
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/"); //goes to dashboard
    } catch {
      setError("failed to create an account");
    }
    setLoading(false);
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        {
          //currentUser.email //for testting purpuses
        }
        {error && <p>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Input type="email" ref={emailRef} required placeholder="E-mail" />

          <Input
            type="password"
            ref={passwordRef}
            required
            placeholder="password"
          />

          <Input
            type="password"
            ref={passwordConfirmRef}
            required
            placeholder="confirm password"
          />

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVARCY POLICY</b>
          </Agreement>

          <Button disabled={loading} type="submit">
            Sign Up
          </Button>

          <div>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Signup;
