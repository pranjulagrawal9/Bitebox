import "./CartItem.scss";
import vegIcon from "../../assets/images/veg-icon.png";
import nonVegIcon from "../../assets/images/non-veg-icon.png";
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'

function CartItem() {
  return (
    <div className="cart-item">
      <div className="item-name">
        <span className="veg-icon">
          <img src={vegIcon} alt="" />
        </span>
        Cadbury Crackle 700ml
      </div>
      <div className="button">
        <span className="minus">
          <AiOutlineMinus />
        </span>
        <span className="count">2</span>
        <span className="plus">
          <AiOutlinePlus />
        </span>
      </div>
      <div className="price">₹ 758</div>
    </div>
  );
}

export default CartItem;
