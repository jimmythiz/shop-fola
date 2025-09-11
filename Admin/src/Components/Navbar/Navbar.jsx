import './Navbar.css'
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../../../lib/Context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
     const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
  return (
    <div className='nav-container'>
        <div className="nav-logo">
            <p>Shop Fola <span>Admin</span></p>
        </div>
        <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/products">All Products</Link>
            <Link to="/add-products">Add Products</Link>
            <Link to="/users">Customers</Link>
            <Link to="/orders">Orders</Link>
            <button onClick={handleLogout} className='handleLogout'>Logout</button>
        </div>
    </div>
  )
}

export default Navbar