import "./CartItem.scss";
import vegIcon from "../../assets/images/veg-icon.png";
import nonVegIcon from "../../assets/images/non-veg-icon.png";
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { addItem, increaseItem, removeItem } from "../../store/slices/cartSlice";

function CartItem(props) {
  const {id, name, count, price, itemAttribute}= props;
  const dispatch= useDispatch();

  return (
    <div className="cart-item">
      <div className="item-name">
        <span className="veg-icon">
          <img src={itemAttribute.vegClassifier==="VEG" ? vegIcon: nonVegIcon} />
        </span>
        {name}
      </div>
      <div className="button">
        <span className="minus">
          <AiOutlineMinus onClick={()=> dispatch(removeItem(id))} />
        </span>
        <span className="count">{count}</span>
        <span className="plus">
          <AiOutlinePlus onClick={()=> dispatch(increaseItem(id))} />
        </span>
      </div>
      <div className="price">₹ {price/100}</div>
    </div>
  );
}

export default CartItem;
