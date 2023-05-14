import React from "react";
import "./FoodItem.scss";
import vegIcon from "../../assets/images/veg-icon.png";
import nonVegIcon from "../../assets/images/non-veg-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../store/slices/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function FoodItem(props) {
  const { id, name, price, description, imageId, itemAttribute } =
    props.foodItem;
  const cartDetails = {
    itemDetails: props.foodItem,
    restaurantDetails: props.restaurantData,
  };
  const dispatch = useDispatch();
  const item = useSelector((store) =>
    store.cart.items.find((item) => item.id === id)
  );

  return (
    <div className="food-item">
      <div className="left">
        <div className="veg-non-veg-icon">
          <img
            src={itemAttribute.vegClassifier === "VEG" ? vegIcon : nonVegIcon}
            alt="veg-non-veg-icon"
          />
        </div>
        <div className="food-name">{name}</div>
        <div className="cost">₹ {price / 100}</div>
        <div className="description">{description}</div>
      </div>
      <div className="right">
        <div className={imageId ? "food-image" : "food-image center-with-flex"}>
          {imageId && (
            <img
              src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`}
              alt={name}
              loading="lazy"
            />
          )}
          <button className={imageId ? "add-btn" : "add-btn img-not-present"}>
            {!item ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => dispatch(addItem(cartDetails))}
              >
                ADD
              </div>
            ) : (
              <div className="plus-minus-btn">
                <span>
                  <AiOutlineMinus onClick={() => dispatch(removeItem(id))} />
                </span>
                <span>{item.count}</span>
                <span>
                  <AiOutlinePlus
                    onClick={() => dispatch(addItem(cartDetails))}
                  />
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
