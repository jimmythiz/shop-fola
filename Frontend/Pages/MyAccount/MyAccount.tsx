import './MyAccount.css'

const MyAccount = () => {
  return (
    <div className='myaccount-container'>
        <div className='myaccount-header'>
            <p className="myaccount-location"><a href="/">Home / </a>  Contact</p>
            <p>Welcome <span className='myaccount-username'>Folajimi</span></p>
        </div>
        <div className="myaccount-details">
            <div className=''>
                <p>Manage My Account</p>
                <ul>
                    <li><a href="/myaccount">My Profile</a></li>
                    <li><a href="/paymentoptions">My Payment Options</a></li>
                </ul>
                <p>My Orders</p>
                <ul>
                    <li><a href="/cart">My Cart</a></li>
                </ul>
            </div>
            <form action="">
                <p>Edit Your Profile</p>
                <section>
                <div>
                    <label htmlFor="">First Name</label><br />
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Last Name</label><br />
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Email</label><br />
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor="">Address</label><br />
                    <input type="text" />
                </div>
                <div className='password-field'>
                    <label htmlFor="">Password</label><br />
                    <input type="password" name="" id="" placeholder='Input Current Password'/><br />
                    <input type="password" name="" id="" placeholder='Input New Password'/><br />
                    <input type="password" name="" id="" placeholder='Confirm New Password'/>
                </div>
                </section>
                <div className='action-buttons'>
                    <button>Cancel</button>
                    <input type="submit" value="Save Changes" />
                </div>
            </form>
        </div> 
    </div>
  )
}

export default MyAccount