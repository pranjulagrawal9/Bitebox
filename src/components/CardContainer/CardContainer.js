import React, { useEffect, useState } from "react";
import "./CardContainer.scss";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { SWIGGY_RESTAURANTS_API_URI } from "../../utils/constants";
import ShimmerUI from "../ShimmerUI/ShimmerUI";
import { Link } from "react-router-dom";

function CardContainer() {
  const [restaurantsArray, setRestaurantsArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(SWIGGY_RESTAURANTS_API_URI);
      const jsonData = await response.json();
      setRestaurantsArray(jsonData?.data?.cards[2]?.data?.data?.cards);
      setFilteredArray(jsonData?.data?.cards[2]?.data?.data?.cards);
    }

    getData();
  }, []);

  useEffect(() => {
    filterRestaurants(searchText);
  }, [searchText]);

  function filterRestaurants(searchText) {
    const filteredArray = restaurantsArray.filter((restaurant) =>
      restaurant.data.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredArray(filteredArray);
  }

  if (restaurantsArray.length === 0) return <ShimmerUI />;

  return (
    <>
      <div className="search-box">
        <div className="container">
          <input
            type="text"
            placeholder="Search for restaurants"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <svg viewBox="5 -1 12 25" height="17" width="17" fill="#686b78">
            <path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path>
          </svg>
        </div>
      </div>

      {filteredArray.length === 0 ? (
        <div className="not-found">
          <h2>No match found for "{searchText}"</h2>
        </div>
      ) : (
        <div className="card-container">
          {filteredArray?.map((restaurant) => (
            <Link
              to={`/restaurants/${restaurant.data.name.toLowerCase().split(" ").join("-")}-${restaurant.data.locality.toLowerCase().split(" ").join("-")}-${restaurant.data.area.toLowerCase().split(" ").join("-")}-${restaurant.data.slugs.city.toLowerCase()}-${restaurant.data.id}`}
              key={restaurant.data.id}
            >
              <RestaurantCard resData={{ ...restaurant.data }} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default CardContainer;
