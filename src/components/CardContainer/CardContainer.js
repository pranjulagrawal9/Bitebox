import React, { useEffect, useState } from "react";
import "./CardContainer.scss";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import {
  GEOCODING_URI,
  SWIGGY_RESTAURANTS_API_URI,
} from "../../utils/constants";
import ShimmerUI from "../ShimmerUI/ShimmerUI";
import { Link } from "react-router-dom";
import { setCoordinates, setUserAdress } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function CardContainer() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userLocation = useSelector((store) => store.user.coordinates);
  const dispatch = useDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setCoordinates({ latitude, longitude }));
          setIsLoading(true);
          const response = await fetch(
            GEOCODING_URI + `lat=${latitude}&lon=${longitude}`
          );
          const geocodingData = await response.json();
          const userAddress = `${geocodingData.address.state_district}, ${geocodingData.address.state}, ${geocodingData.address.country}`;
          dispatch(setUserAdress(userAddress));
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else console.error("Geolocation is not supported by this browser.");
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation) getData(userLocation.latitude, userLocation.longitude);
  }, [userLocation]);

  async function getData(latitude, longitude) {
    try {
      const response = await fetch(
        SWIGGY_RESTAURANTS_API_URI + `&lat=${latitude}&lng=${longitude}`
      );
      const jsonData = await response.json();
      for (let i = 0; i < jsonData?.data?.cards.length; i++) {
        const restaurantsData =
          jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        if (restaurantsData) {
          setRestaurants(restaurantsData);
          break;
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
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
