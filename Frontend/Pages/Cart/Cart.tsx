import './Cart.css'
import img1 from "../../src/assets/loginimage.png"

const Cart = () => {
  return (
    <div className="cart-container">
        <p className="cart-location"><a href="/">Home / </a>  Cart</p>
        <div className="cart-details">
            <div className='cart-headers'>
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            <div className='cart-items'>
              <div className='single-item'>
              <div>
                <div><img src={img1} alt="LCD MONITOR" /></div>
                <p>LCD MONITOR</p>
              </div>
              <div>
                <p>$100</p>
              </div>
              <div>
                <input type="number" defaultValue={1}/>
              </div>
              <div>
                <p>$300</p>
              </div>
              </div>

              <div className='single-item'>
              <div>
                <div><img src={img1} alt="LCD MONITOR" /></div>
                <p>LCD MONITOR</p>
              </div>
              <div>
                <p>$100</p>
              </div>
              <div>
                <input type="number" defaultValue={1}/>
              </div>
              <div>
                <p>$300</p>
              </div>
            </div>
            </div>

            <div className="cart-total">
              <p>Cart Total</p>
              <div>
                <p>Subtotal:</p>
                <p>$1000</p>
              </div>
              <div>
                <p>Shipping:</p>
                <p>$20</p>
              </div>
              <div>
                <p>Total:</p>
                <p>$1020</p>
              </div>
              <a href="">Proceed to Checkout</a>
            </div>
        </div>
    </div>
  )
}

export default Cart