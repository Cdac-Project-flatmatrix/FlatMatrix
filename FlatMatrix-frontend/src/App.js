
import { useState, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import NavbarLogout from './components/NavbarLogout'; 
import Homepage from './screens/Homepage';  // Import Homepage component
import Login from './screens/Login';  // Import Login component
import Register from './screens/Register';  // Import Register component
import PasswordReset from './screens/PasswordReset'; 
import OurTeam from './screens/OurTeam';
import Searching from './screens/Searching';
import Profile from './screens/Profile'; 
import Wishlist from './screens/Wishlist';
import './styles/Profile.css'; 
import './styles/Searching.css';
import './styles/Wishlist.css';
import './App.css';
import PropertyList from './screens/PropertyList';
import PropertyDetails from './screens/PropertyDetails';
import PropertyAdd from './screens/PropertyAdd';
import PropertyUpdate from './screens/PropertyUpdate';
import MyProperties from './screens/MyProperties';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem('token'));
  }, []);
  return (
    <div className="App">
      {isLoggedIn ? <NavbarLogout /> : <Navbar />}
      <div className="main-container p-4">
        <Routes>
          {/* <Route path="/" element={<h2>Welcome to MyApp</h2>} />
          <Route path="/about" element={<h2>About Us Page</h2>} />
          <Route path="/team" element={<h2>Our Team Page</h2>} />
          <Route path="/login" element={<h2>Login Page</h2>} />
          <Route path="/register" element={<h2>Register Page</h2>} /> */}
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
