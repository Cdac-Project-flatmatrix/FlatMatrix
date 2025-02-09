import { useState, useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarLogout from "./components/NavbarLogout";
import Homepage from "./screens/Homepage"; // Import Homepage component
import Login from "./screens/Login"; // Import Login component
import Register from "./screens/Register"; // Import Register component
import PasswordReset from "./screens/PasswordReset";
import OurTeam from "./screens/OurTeam";
import Searching from "./screens/Searching";
import Profile from "./screens/Profile";
import Wishlist from "./screens/Wishlist";
// import { WishlistProvider } from "./WishlistContext";
import { WishlistProvider } from "./screens/WishlistContext";
import "./styles/Profile.css";
import "./styles/Searching.css";
import "./styles/Wishlist.css";
import "./App.css";
import PropertyList from "./screens/PropertyList";
import PropertyDetails from "./screens/PropertyDetails";
import PropertyAdd from "./screens/PropertyAdd";
import PropertyUpdate from "./screens/PropertyUpdate";
import MyProperties from "./screens/MyProperties";
import AboutUs from "./screens/aboutUs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem("token"));
  }, []);
  return (
    <WishlistProvider>
      <div className="App">
        {isLoggedIn ? <NavbarLogout /> : <Navbar />}
        <div className="main-container p-4">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/searching" element={<Searching />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/propertyList" element={<PropertyList />} />
            <Route path="/propertyDetails" element={<PropertyDetails />} />
            <Route path="/property-add" element={<PropertyAdd />} />
            <Route path="/property-update" element={<PropertyUpdate />} />
            <Route path="/my-properties" element={<MyProperties />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </WishlistProvider>
  );
}

export default App;
