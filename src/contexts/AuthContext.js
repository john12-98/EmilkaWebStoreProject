import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import Axios from "axios";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //view garment details holder
  const [garmentDetails, setGarmentDetails] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartBadge, setCartBadge] = useState(0);
  const [productsList, setProductsList] = useState();
  const [order, setOrderItem] = useState([0]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); //returns a promise
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmailLocal(email) {
    return updateEmail(auth.currentUser, email);
  }
  function updatePasswordLocal(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); //what is user? object or....???

      setLoading(false);
    });

    Axios.get("http://localhost:3001/getallproducts").then((response) => {
      setProductsList([...response.data]);
      console.log("inside auth:", response.data);
      console.log(productsList);
    });

    return unsubscribe; //this is a method returned from onAuthStateChanged that is used to unsubscribe from the listener/event
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmailLocal,
    updatePasswordLocal,
    garmentDetails,
    setGarmentDetails,
    productsList,
    setProductsList,
    setCartBadge,
    cartBadge,
    setOrderItem,
    order,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
