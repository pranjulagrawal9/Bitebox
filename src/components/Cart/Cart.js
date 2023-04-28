import "./Cart.scss";
import CartItem from "../CartItem/CartItem";

function Cart() {
  return (
    <div className="cart">
      <div className="container">
        <div className="item-details">
          <div className="restaurant">
            <div className="restaurant-img">
              <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/mfixzwwfeupqyaxoturn" />
            </div>
            <div className="restaurant-name-address">
              <h3>Kwality Walls Frozen Dessert and Ice Cream Shop</h3>
              <div className="address">Civil Lines</div>
            </div>
          </div>

          <div className="cart-items">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </div>
        <div className="billing-details">
            <h3>Billing Details</h3>
            <div className="item-total">
                <span>Item Total</span>
                <span>₹ 2046</span>
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
                <span>₹ 2068</span>
            </div>

            <div className="pay-now-btn">
                <button>Pay Now</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
