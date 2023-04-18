import React, { useEffect, useState } from "react";
import "./CardContainer.scss";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { SWIGGY_RESTAURANTS_API_URI } from "../../utils/constants";
import ShimmerUI from "../ShimmerUI/ShimmerUI";

function CardContainer() {
  const [restaurantsArray, setRestaurantsArray] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(SWIGGY_RESTAURANTS_API_URI);
      const jsonData = await response.json();
      setRestaurantsArray(jsonData?.data?.cards[2]?.data?.data?.cards);
    }

    getData();
  }, []);

  if(restaurantsArray.length===0)
    return <ShimmerUI />

  return (
    <div className="card-container">
      {restaurantsArray?.map((restaurant) => (
        <RestaurantCard resData={{...restaurant.data}} key={restaurant.data.id} />
      ))}

      {/* <div className='restaurant-card-row'>
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </div> */}
    </div>
  );
}

export default CardContainer;
