import React from "react";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import Navbar from "./globals/components/navbar/Navbar";
import Footer from "./globals/components/footer/Footer";
import Login from "./pages/auth/login/Login";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
