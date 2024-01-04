import React, { useEffect, useState } from "react";
import "./RestaurantInfo.scss";
import { useParams } from "react-router-dom";
import { GrStar } from "react-icons/gr";
import FoodCategory from "../FoodCategory/FoodCategory";
import RestaurantInfoShimmer from "../RestaurantInfoShimmer/RestaurantInfoShimmer";
import ResetCartModal from "../ResetCartModal/ResetCartModal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/slices/cartSlice";

function RestaurantInfo() {
  const { restaurantURL } = useParams();
  const array = restaurantURL.split("-");
  const restaurantId = array[array.length - 1];
  const [restaurantData, setRestaurantData] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [licenseInfo, setLicenseInfo] = useState({});
  const dispatch = useDispatch();
  const isOtherRestaurant = useSelector(
    (store) => store.cart.isOtherRestaurant
  );

  if (restaurantData.length !== 0)
    var {
      city,
      areaName,
      name,
      cuisines,
      sla,
      costForTwoMessage,
      avgRatingString,
      totalRatingsString,
    } = restaurantData;

  useEffect(() => {
    getRestaurantData();
  }, []);

  useEffect(() => {
    return () => {
      if (isOtherRestaurant) dispatch(closeModal());
    };
  }, [isOtherRestaurant]);

  async function getRestaurantData() {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/" +
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=27.8973944&lng=78.0880129&restaurantId=${restaurantId}&submitAction=ENTER`
    );
    const jsonData = await response.json();
    setRestaurantData(jsonData.data.cards[0].card.card.info);
    const itemIndex = jsonData.data.cards.length - 1;

    const foodCategories = jsonData.data.cards[
      itemIndex
    ].groupedCard.cardGroupMap.REGULAR.cards.filter(
      (category) =>
        category.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    setFoodCategories(foodCategories);

    const licenseInfo = jsonData.data.cards[
      itemIndex
    ].groupedCard.cardGroupMap.REGULAR.cards.find(
      (card) =>
        card.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
    );
    setLicenseInfo(licenseInfo);
  }

  return (
    <div className="restaurant-info">
      <div className="container">
        {restaurantData.length === 0 ? (
          <RestaurantInfoShimmer />
        ) : (
          <>
            <h6 className="path">{`Home / ${city} / ${areaName} / ${name}`}</h6>
            <div className="top-section">
              <div className="left">
                <h2 className="restaurant-name">{name}</h2>
                <h5 className="cuisines">{cuisines.join(", ")}</h5>
                <h5 className="area-distance">
                  {areaName}, {sla?.lastMileTravelString}
                </h5>
              </div>
              <div className="right">
                <div className="rating-box">
                  <div className="rating">
                    <span>
                      <GrStar />
                    </span>
                    <span className="rating-num">{avgRatingString}</span>
                  </div>
                  <div className="total-ratings">{totalRatingsString}</div>
                </div>
              </div>
            </div>

            <div className="time-cost-box">
              <div className="time-box">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <circle
                    r="8.35"
                    transform="matrix(-1 0 0 1 9 9)"
                    stroke="#3E4152"
                    strokeWidth="1.3"
                  ></circle>
                  <path
                    d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
                    fill="#3E4152"
                  ></path>
                </svg>
                <span>{sla?.slaString}</span>
              </div>
              <div className="cost-box">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.25"
                    stroke="#3E4152"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z"
                    fill="#3E4152"
                  ></path>
                </svg>
                <span>{costForTwoMessage}</span>
              </div>
            </div>

            <div className="food-categories">
              {foodCategories?.map((category) => (
                <FoodCategory
                  {...{ ...category.card.card, restaurantData }}
                  key={category.card.card.title}
                />
              ))}
            </div>

            <div className="bottom">
              <div className="restaurant-license">
                <div className="fssai-img">
                  <img
                    src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i"
                    alt="fssai"
                  />
                </div>
                <span>{licenseInfo?.card?.card?.text[0]}</span>
              </div>

              <div className="restaurant-details">
                <div className="name">{name}</div>
              </div>
            </div>
          </>
        )}
      </div>
      {isOtherRestaurant && (
        <div className="reset-modal">
          <ResetCartModal />
        </div>
      )}
    </div>
  );
}

export default RestaurantInfo;
