import React from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Home from "../Pages/Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { Container } from "react-bootstrap";
import ForgotPassword from "./ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import ProductList from "../Pages/ProductList";
import Products from "./Products";
import Product from "../Pages/Product";
function App() {
  return (
    <AuthProvider>
      <Container>
        <div>
          <Router>
            <AuthProvider>
              <Switch>
                <Route path="/" exact component={Home} />
                {/* <PrivateRoute path="/" exact component={Home} /> */}
                {
                  //<Home /> Dashboard
                }
                <PrivateRoute
                  path="/update-profile"
                  exact
                  component={UpdateProfile}
                />
                <Route path="/signup" exact component={Signup} />
                <Route path="/login" exact component={Login} />
                <Route path="/dash" exact component={Dashboard} />
                <Route path="/products" component={Products} />
                <Route path="/productlist/:category" component={ProductList} />
                <Route path="/product" component={Product} />

                <Route
                  path="/forgot-password"
                  exact
                  component={ForgotPassword}
                />
              </Switch>
            </AuthProvider>
          </Router>
          {/* <Signup /> */}
          {
            //ill remove the signup component
          }
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
