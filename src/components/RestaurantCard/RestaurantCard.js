import React from "react";
import "./RestaurantCard.scss";
import { FaStar } from "react-icons/fa";
import { CLOUDINARY_RESTAURANT_URI } from "../../utils/constants";

function RestaurantCard({ resData }) {
  const { name, cloudinaryImageId, cuisines, avgRating, sla, costForTwo } =
    resData;

  function onImageLoad(event) {
    event.target.classList.add("animate");
  }

  return (
    <div className="restaurant-card">
      <div className="restaurant-img">
        <img
          src={`${CLOUDINARY_RESTAURANT_URI}/${cloudinaryImageId}`}
          alt="restaurant"
          loading="lazy"
          onLoad={(event) => onImageLoad(event)}
        />
      </div>
      <h3 className="restaurant-name">{name}</h3>
      <div className="cuisines">{cuisines.join(", ")}</div>
      <div className="rating-time-price">
        <div className={avgRating >= 4 ? "rating-box" : "rating-box orange"}>
          <span>
            <FaStar />
          </span>
          <span>{avgRating}</span>
        </div>
        <div className="dot">•</div>
        <div className="time">{sla.slaString}</div>
        <div className="dot">•</div>
        <div className="cost-for-two">₹ {costForTwo}</div>
      </div>
    </div>
  );
}

export default RestaurantCard;
