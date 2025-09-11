import './Home.css';

const Home = () => {
  // Mock data (can be fetched from backend later)
  const totalProducts = 200;
  const availableProducts = 160;
  const outOfStock = totalProducts - availableProducts;

  const totalOrders = 1200;
  const pendingOrders = 75;
  const completedOrders = 1125;

  const totalRevenue = 865000; // in currency
  const monthlyRevenue = 54000;

  const totalCustomers = 540;

  return (
    <div className='dashboard-container'>
      <h3>Dashboard</h3>
      <div className='dashboard-main'>
        <div className="dashboard-card">
          <p className='card-header'>Total Products</p>
          <p>{totalProducts}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Available Products</p>
          <p>{availableProducts}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Out Of Stock</p>
          <p>{outOfStock}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Total Orders</p>
          <p>{totalOrders}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Pending Orders</p>
          <p>{pendingOrders}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Completed Orders</p>
          <p>{completedOrders}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Total Revenue</p>
          <p>₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Revenue (This Month)</p>
          <p>₦{monthlyRevenue.toLocaleString()}</p>
        </div>
        <div className="dashboard-card">
          <p className='card-header'>Registered Customers</p>
          <p>{totalCustomers}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
