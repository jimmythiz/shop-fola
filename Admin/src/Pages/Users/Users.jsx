import "./Users.css";
import { CiSearch } from "react-icons/ci";
import blob from "../../../src/assets/blob.svg"

const Users = () => {
  const userDetails = {
    customerName : "Adelaide Usamat",
    customerID : "C12345",
    customerpicture : blob
  }
  return (
    <div className="users-container">
      <h3>Our Customers</h3>
      <div className="users-search">
        <input type="text" placeholder="Search User"/>
        <CiSearch />
      </div>
      
      <div className="users-header">
        <p>Customer Name</p>
        <p>Customer ID</p>
        <p>Action</p>
      </div>
      <div className="users-grid">
        {/* Actual Products */}
        <div className="users-grid-list">
          <div>
            <img src={userDetails.customerpicture} alt="" />
            <p>{userDetails.customerName}</p>
          </div>
          <p>{userDetails.customerID}</p>
          <button>View Orders</button>
        </div>

      </div>
    </div>
  );
};

export default Users;
