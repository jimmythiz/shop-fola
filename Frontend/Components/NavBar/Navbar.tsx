import "./Navbar.css"
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [toggleprofile, setToggleProfile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="nav-container">
        <nav>
            <div className="nav-logo">
                <h2>Shop Fola</h2>
            </div>
            
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
                </ul>
            </div>
            <div className="nav-actions">
                <div className="nav-icons">
                    {/* <FaRegHeart  className="nav-heart-icon"/> */}
                    <div><Link to="/cart"><MdOutlineShoppingCart className="nav-heart-icon"/></Link></div>
                    <div><CgProfile className="nav-heart-icon" onClick={() => setToggleProfile(prev => !prev)}/></div>
                        {toggleprofile && (
                            <div className="nav-profile-dropdown">
                                <Link to="/myaccount"><CgProfile/>Manage My Account</Link>
                                <Link to="/cart"><MdOutlineShoppingCart/>My Orders</Link>
                                <Link to="/"><CiLogout/>Logout</Link>
                            </div>
                        )}

                </div>
            </div>
            <div className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <IoMdClose size={28}/> : <GiHamburgerMenu size={28} />}
            </div>
        </nav>
        <div className="nav-search">
            <input type="text" name="search" id="" placeholder="What are you looking for ?" />
            <CiSearch className="nav-search-icon"/>
        </div>
    </div>
  )
}

export default Navbar