import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Blogspage from "./pages/Blogspage";
import Footer from "./components/Footer";
import BlogFormPage from "./pages/BlogFormPage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<Blogspage />} />
        <Route path="/write" element={<BlogFormPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
