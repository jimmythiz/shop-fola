import './MyAccount.css'
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import api from "../../utilities/api"

import { useAuth } from "../../utilities/Context/authcontext"; 

type UserData = {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
};
type PasswordData = {
  current: string;
  newPass: string;
  confirmNew: string;
};

const MyAccount = () => {
     const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    current: "",
    newPass: "",
    confirmNew: "",
  });
  

    const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
    useEffect(() => {
    const loadProfile  = async () => {
         if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      try {
         const { data } = await api.get("/user/profile");
        setUserData({
          firstname: data.firstname || user.firstname,
          lastname: data.lastname || user.name,
          email: data.email || user.email,
          address: data.address || "",
        });
      } catch (err: any) {
        console.warn("Failed to fetch user profile. Using fallback.");
        setUserData({
          firstname: user.firstname,
          lastname: user.name,
          email: user.email,
          address: "",
        });
      } finally {
        setLoading(false);
      }
    };
    loadProfile ();
  },  [user, isAuthenticated]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const payload = { ...userData, ...passwordData };
      await api.put("/user/profile", payload);
      setMessage("Profile updated successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error saving changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="myaccount-container">
        <p>Loading your account details...</p>
      </div>
    );
  }
  if (!isAuthenticated || !user) {
    return (
      <div className="myaccount-container">
        <p>You must be logged in to view this page.</p>
        <a href="/login" className="login-redirect">Go to Login</a>
      </div>
    );
  }


  return (
    <div className='myaccount-container'>
        <div className='myaccount-header'>
            <p className="myaccount-location"><a href="/">Home / </a>  Contact</p>
            <p>Welcome <span className='myaccount-username'>{userData.firstname}</span></p>
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
            <form onSubmit={handleSubmit}>
                <p>Edit Your Profile</p>
                <section>
                <div>
                    <label htmlFor="">First Name</label><br />
                    <input type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Last Name</label><br />
                    <input type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Email</label><br />
                    <input type="email"
                name="email"
                value={userData.email}
                onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Address</label><br />
                    <input type="text"
                name="address"
                value={userData.address}
                onChange={handleChange} />
                </div>
                <div className='password-field'>
                    <label htmlFor="">Password</label><br />
                    <input type="password"
                name="current"
                placeholder="Input Current Password"
                onChange={handlePasswordChange}/><br />
                    <input type="password"
                name="newPass"
                placeholder="Input New Password"
                onChange={handlePasswordChange}/><br />
                    <input type="password"
                name="confirmNew"
                placeholder="Confirm New Password"
                onChange={handlePasswordChange}/>
                </div>
                </section>
                

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
                <div className='action-buttons'>
                     <button type="button" onClick={() => window.location.reload()}>
              Cancel
            </button>
                    <input
              type="submit"
              value={saving ? "Saving..." : "Save Changes"}
              disabled={saving}
            />
                </div>
            </form>
        </div> 
    </div>
  )
}

export default MyAccount