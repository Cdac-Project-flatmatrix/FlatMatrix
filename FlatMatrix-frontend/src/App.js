
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
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import MyPropertyList from './screens/MyPropertiesList';
import MyPropertyDetails from './screens/MyPropertyDetails';
import AboutUs from './screens/aboutUs';
import ContactOwnerForm from './screens/ContactOwnerForm';
import SellerEnquiries from './screens/SellerEnquiries';
import BuyerEnquiries from './screens/BuyerEnquiries';
import EnquiryForm from './screens/EnquiryForm';



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
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/seller-enquiries" element={<SellerEnquiries />} />
          <Route path="/buyer-enquiries" element={<BuyerEnquiries />} />
          <Route path="/submit-enquiry/:propertyId" element={<EnquiryForm />} />
          <Route
            path="/my-properties-details"
            element={<MyPropertyDetails />}
          />
          <Route path="/contact-owner" element={<ContactOwnerForm />} />
        </Routes>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
