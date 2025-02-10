import { Link, useNavigate } from 'react-router-dom';

function NavbarLogout() {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem('token');

  const onLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/flatmatrixlogo.png"
            alt="FlatMatrix Logo"
            className="navbar-logo me-2"
          />
          FlatMatrix
        </Link>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/team">
                Our Team
              </Link>
            </li>

            {/* Show Profile if logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-properties">
                  My Properties
                </Link>
              </li>
            )}

            {/* Show Wishlist if logged in, otherwise Register */}
            {isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  Wishlist
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}

            {isLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link" onClick={onLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLogout;
