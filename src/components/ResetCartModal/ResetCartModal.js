import { useDispatch } from "react-redux";
import "./ResetCartModal.scss";
import { closeModal, resetCart } from "../../store/slices/cartSlice";

function ResetCartModal() {
  const dispatch = useDispatch();

  return (
    <div className='reset'>
      <h3>Items already in cart</h3>
      <div className="desc">
        Your cart contains items from other restaurant. Would you like to reset
        your cart for adding items from this restaurant?
      </div>
      <div className="buttons">
        <div className="no" onClick={() => {dispatch(closeModal())}}>
          No
        </div>
        <div
          className="yes"
          onClick={() => {
            dispatch(resetCart());
            dispatch(closeModal());
          }}
        >
          Yes, start afresh
        </div>
      </div>
    </div>
  );
}

export default ResetCartModal;
