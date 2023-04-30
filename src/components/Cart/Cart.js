import "./Cart.scss";
import CartItem from "../CartItem/CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((store) => store.cart);
  const itemTotal = cart.items.reduce(
    (total, item) => item.price * item.count + total,
    0
  );
  const { name, areaName, cloudinaryImageId } = cart.restaurantInfo;

  return cart.items.length !== 0 ? (
    <div className="cart">
      <div className="container">
        <div className="item-details">
          <div className="restaurant">
            <div className="restaurant-img">
              <img
                src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${cloudinaryImageId}`}
              />
            </div>
            <div className="restaurant-name-address">
              <h3>{name}</h3>
              <div className="address">{areaName}</div>
            </div>
          </div>

          <div className="cart-items">
            {cart.items.map((item) => (
              <CartItem {...item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="billing-details">
          <h3>Billing Details</h3>
          <div className="item-total">
            <span>Item Total</span>
            <span>₹ {itemTotal / 100}</span>
          </div>
          <div className="delivery-fee">
            <span>Delivery Fee</span>
            <span>₹ 10</span>
          </div>
          <div className="tax">
            <span>Govt Taxes & Other Charges</span>
            <span>₹ 12</span>
          </div>

          <div className="to-pay">
            <span className="text">TO PAY</span>
            <span>₹ {itemTotal / 100 + 22}</span>
          </div>

          <div className="pay-now-btn">
            <button>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="empty-cart">
      <div className="img-container">   
      </div>
      <div className="text">Your cart is empty</div>
      <div className="sub-heading">You can go to home page to view more restaurants</div>
      <Link to="/" >
        <div className="see-btn">See restaurants near you</div>
      </Link>
    </div>
  );
}

export default Cart;
