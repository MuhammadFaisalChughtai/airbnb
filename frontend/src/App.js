import "./App.css";
import React, { useEffect } from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Pricing from "./components/pricing/Pricing";
import AddProperty from "./components/AddProperty";
import ShowProperty from "./components/ShowProperty";
import Detaill from "./components/Detaill";

function App() {
  useEffect(() => {}, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/properties" element={<Services />} />
            <Route exact path="/pricing" component={<Pricing />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/properties/:type" element={<ShowProperty />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/show-property/:title" element={<Detaill />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
