import React, { useEffect, useState } from "react";
import "./CardContainer.scss";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { SWIGGY_RESTAURANTS_API_URI } from "../../utils/constants";
import ShimmerUI from "../ShimmerUI/ShimmerUI";
import { Link } from "react-router-dom";

function CardContainer() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    const response = await fetch(SWIGGY_RESTAURANTS_API_URI);
    const jsonData = await response.json();
    setRestaurants(
      jsonData?.data?.cards[2]?.card.card.gridElements.infoWithStyle.restaurants
    );
    setIsLoading(false);
  }

  if (isLoading) return <ShimmerUI />;

  return (
    <div className="card-container">
      {restaurants?.map((restaurant) => (
        <Link
          to={`/restaurants/${
            restaurant.cta.link.split("/")[
              restaurant.cta.link.split("/").length - 1
            ]
          }`}
          key={restaurant.info.id}
        >
          <RestaurantCard resData={{ ...restaurant.info }} />
        </Link>
      ))}
    </div>
  );
}

export default CardContainer;
