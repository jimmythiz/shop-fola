import './Orders.css'
import { CiSearch } from "react-icons/ci";

const Orders = () => {
  const orderList = [
    {trackingID : "#1111",
    customerID : "C1000",
    orderList : 
      ["rice","yam","bread","beans","brothers"],
    currentStatus :"Not paid" },
    {trackingID : "#2222",
    customerID : "C2000",
    orderList : 
      ["fish","meat","egg","milk","brothers"],
    currentStatus :"Not paid" },
    {trackingID : "#3333",
    customerID : "C3000",
    orderList : 
      ["maltina","malta guiness","amstel","dew","brothers"],
    currentStatus :"Not paid" },
    {trackingID : "#4444",
    customerID : "C4000",
    orderList : 
      ["fanta","coke","sprite","bigi apple","brothers"],
    currentStatus :"Not paid" },
    {trackingID : "#5555",
    customerID : "C5000",
    orderList : 
      ["nokia","blackberry","iphone","butter","brothers"],
    currentStatus :"Not paid" },
    {trackingID : "#6666",
    customerID : "C6000",
    orderList : 
      ["bread","beans","egg","butter","brothers"],
    currentStatus :"Not paid" }
  ]
  const orderStatusList = [
  { status: "Cancelled", color: "#e74c3c" },
  { status: "Not paid", color: "#f39c12" },
  { status: "Processing", color: "#3498db" },
  { status: "Ready for pickup", color: "#2ecc71" },
  { status: "Shipped out", color: "#9b59b6" }
];
  const orders = {
    trackingID : "#7963",
    customerID : "C12345",
    orderList : 
      ["bread","beans","egg","butter","brothers"],
    currentStatus :"Not paid"
  }
  const currentStatusObj = orderStatusList.find(
  (statusObj) => statusObj.status === orders.currentStatus
);

  return (
    <div className='orders-container'>
          <h3>Order Lists</h3>
          <div className='orders-search'>
            <input type="text" placeholder='Search By Tracking Number'/>
            <CiSearch />
          </div>
          <label htmlFor=""> Filter By Status : 
          <select name="" id="">
        <option value="" selected>All</option>
        <option value="">Cancelled</option>
        <option value="">Not Paid</option>
        <option value="">Processing</option>
        <option value="">Ready For Pickup</option>
        <option value="">Shipped Out</option>
      </select>
      </label>
          <div className='orders-header'>
                <p>Tracking Number</p>
                <p>Customer ID</p>
                <p>Order Details</p>
                <p>Status</p>
                <p>Action</p>
          </div>
          <div className='orders-grid'>
            {/* Actual Orders */}
              <div className="orders-grid-list">
                  <p>{orders.trackingID}</p>
                  <p>{orders.customerID}</p>
                  <ul>
                    {orders.orderList.slice(0, 2).map((order,index)=>(
                      <li key={index}>{order.charAt(0).toUpperCase()+ order.slice(1)}</li>
                    ))}
                    
                  {orders.orderList.length > 2 && <span> ...and {orders.orderList.length - 2} more</span>}
                  </ul>
                  <div>
                      <div style={{ backgroundColor: currentStatusObj?.color }}></div>
                      <p>{currentStatusObj?.status}</p>
                  </div>
                  <button>View</button>
              </div>


              <div className="orders-grid-list">
                  <p>{orders.trackingID}</p>
                  <p>{orders.customerID}</p>
                  <ul>
                    {orders.orderList.slice(0, 2).map((order,index)=>(
                      <li key={index}>{order.charAt(0).toUpperCase()+ order.slice(1)}</li>
                    ))}
                    
                  {orders.orderList.length > 2 && <span> ...and {orders.orderList.length - 2} more</span>}
                  </ul>
                  <div>
                      <div style={{ backgroundColor: currentStatusObj?.color }}></div>
                      <p>{currentStatusObj?.status}</p>
                  </div>
                  <button>View</button>
              </div>


              <div className="orders-grid-list">
                  <p>{orders.trackingID}</p>
                  <p>{orders.customerID}</p>
                  <ul>
                    {orders.orderList.slice(0, 2).map((order,index)=>(
                      <li key={index}>{order.charAt(0).toUpperCase()+ order.slice(1)}</li>
                    ))}
                    
                  {orders.orderList.length > 2 && <span> ...and {orders.orderList.length - 2} more</span>}
                  </ul>
                  <div>
                      <div style={{ backgroundColor: currentStatusObj?.color }}></div>
                      <p>{currentStatusObj?.status}</p>
                  </div>
                  <button>View</button>
              </div>

              <div className="orders-grid-list">
                  <p>{orders.trackingID}</p>
                  <p>{orders.customerID}</p>
                  <ul>
                    {orders.orderList.slice(0, 2).map((order,index)=>(
                      <li key={index}>{order.charAt(0).toUpperCase()+ order.slice(1)}</li>
                    ))}
                    
                  {orders.orderList.length > 2 && <span> ...and {orders.orderList.length - 2} more</span>}
                  </ul>
                  <div>
                      <div style={{ backgroundColor: currentStatusObj?.color }}></div>
                      <p>{currentStatusObj?.status}</p>
                  </div>
                  <button>View</button>
              </div>


              <div className="orders-grid-list">
                  <p>{orders.trackingID}</p>
                  <p>{orders.customerID}</p>
                  <ul>
                    {orders.orderList.slice(0, 2).map((order,index)=>(
                      <li key={index}>{order.charAt(0).toUpperCase()+ order.slice(1)}</li>
                    ))}
                    
                  {orders.orderList.length > 2 && <span> ...and {orders.orderList.length - 2} more</span>}
                  </ul>
                  <div>
                      <div style={{ backgroundColor: currentStatusObj?.color }}></div>
                      <p>{currentStatusObj?.status}</p>
                  </div>
                  <button>View</button>
              </div>


              <div className="orders-grid-list">
                  <p>{orders.trackingID}</p>
                  <p>{orders.customerID}</p>
                  <ul>
                    {orders.orderList.slice(0, 2).map((order,index)=>(
                      <li key={index}>{order.charAt(0).toUpperCase()+ order.slice(1)}</li>
                    ))}
                    
                  {orders.orderList.length > 2 && <span> ...and {orders.orderList.length - 2} more</span>}
                  </ul>
                  <div>
                      <div style={{ backgroundColor: currentStatusObj?.color }}></div>
                      <p>{currentStatusObj?.status}</p>
                  </div>
                  <button>View</button>
              </div>



          </div>
     </div>   
  )
}

export default Orders