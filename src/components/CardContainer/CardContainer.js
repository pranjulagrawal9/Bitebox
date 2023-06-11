import React, { useEffect, useRef, useState } from "react";
import "./CardContainer.scss";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { SWIGGY_RESTAURANTS_API_URI } from "../../utils/constants";
import ShimmerUI from "../ShimmerUI/ShimmerUI";
import { Link } from "react-router-dom";

function CardContainer() {
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState();
  const [offset, setOffset] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (
        entry.isIntersecting &&
        !isLoading &&
        restaurants.length < totalRestaurants
      ) {
        fetchMoreData();
      }
    }, options);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isLoading]);

  async function getData() {
    setIsLoading(true);
    const response = await fetch(SWIGGY_RESTAURANTS_API_URI);
    const jsonData = await response.json();
    setRestaurants(jsonData?.data?.cards[2]?.data?.data?.cards);
    setTotalRestaurants(jsonData.data.cards[2].data.data.totalRestaurants);
    setIsLoading(false);
  }

  async function fetchMoreData() {
    setIsLoading(true);
    const response = await fetch(
      'https://corsproxy.io/?' + encodeURIComponent(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.8973944&lng=78.0880129&offset=${offset}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`)
    );
    const jsonData = await response.json();
    setTotalRestaurants(jsonData.data.totalSize);
    const newCardsArray = jsonData.data.cards.map((card) => card.data);
    const newCards = newCardsArray.filter(
      (newCard) => newCard.type === "restaurant"
    );

    setRestaurants([...restaurants, ...newCards]);
    setOffset(offset + 16);
    setIsLoading(false);
  }

  if (restaurants.length === 0) return <ShimmerUI />;

  return (
    <>
      <h2 className="restaurant-count">{totalRestaurants} restaurants</h2>
      <div className="card-container">
        {restaurants?.map((restaurant) => (
          <Link
            to={`/restaurants/${restaurant.data.name
              .toLowerCase()
              .split(" ")
              .join("-")}-${restaurant.data.locality
              .toLowerCase()
              .split(" ")
              .join("-")}-${restaurant.data.area
              .toLowerCase()
              .split(" ")
              .join("-")}-${restaurant.data.slugs.city.toLowerCase()}-${
              restaurant.data.id
            }`}
            key={restaurant.data.id}
          >
            <RestaurantCard resData={{ ...restaurant.data }} />
          </Link>
        ))}

        {isLoading && (
          <>
            <div className="box">
              <div className="image"></div>
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
            <div className="box">
              <div className="image"></div>
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
            <div className="box">
              <div className="image"></div>
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
            <div className="box">
              <div className="image"></div>
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
            <div className="box">
              <div className="image"></div>
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
          </>
        )}

        <div ref={sentinelRef}></div>
      </div>
    </>
  );
}

export default CardContainer;
