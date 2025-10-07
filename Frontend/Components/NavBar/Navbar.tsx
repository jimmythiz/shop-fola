import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../utilities/Context/authcontext";

const Navbar = () => {
  const [toggleProfile, setToggleProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logoutUser } = useAuth();
  const profileRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setToggleProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="nav-container">
      <nav>
        <div className="nav-logo">
          <h2>Shop Fola</h2>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {!isAuthenticated && (
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="nav-actions">
          <div className="nav-icons" ref={profileRef}>
            <div>
              <Link to="/cart">
                <MdOutlineShoppingCart className="nav-heart-icon" />
              </Link>
            </div>
            <div>
              <CgProfile
                className="nav-heart-icon"
                onClick={() => setToggleProfile((prev) => !prev)}
              />
            </div>

            <div className={`nav-profile-dropdown ${toggleProfile ? "show" : ""}`}>
              {isAuthenticated ? (
                <>
                  <p>
                    Hello, <strong>{user?.firstname}</strong>
                  </p>
                  <Link to="/myaccount">
                    <CgProfile /> Manage My Account
                  </Link>
                  <Link to="/cart">
                    <MdOutlineShoppingCart /> My Orders
                  </Link>
                  <button className="logout-btn" onClick={logoutUser}>
                    <CiLogout /> Logout
                  </button>
                  
                </>
              ) : (
                <div className="nav-loggIn">
                  <Link to="/signup">
                    <CgProfile /> Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoMdClose size={28} /> : <GiHamburgerMenu size={28} />}
        </div>
      </nav>

      <div className="nav-search">
        <input type="text" placeholder="What are you looking for ?" />
        <CiSearch className="nav-search-icon" />
      </div>
    </div>
  );
};

export default Navbar;
