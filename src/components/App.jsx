import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { ItemListContainer } from "./ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./ItemDetailContainer/ItemDetailContainer";
import { Checkout } from "./Checkout/Checkout";
import { Cart } from "./Cart/Cart";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createProducts } from "../firebase/firebase.js";

export const App = () => {
  //createProducts();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
};
