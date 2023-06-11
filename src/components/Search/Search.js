import { useState } from "react";
import "./Search.scss";
import { useEffect } from "react";
import SearchItem from "../SearchItem/SearchItem";
import { Link, useFetcher, useFetchers } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toggleOnSearch } from "../../store/slices/highlightNavItemSlice";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const dispatch= useDispatch();

  useEffect(() => {
    const timeout= setTimeout(() => {
      if (searchText.length > 1)
       fetchData();
      else
       setFoundItems([]);
    }, 200);

    return ()=>{
      clearTimeout(timeout);
    }
  }, [searchText]);

  useEffect(() => {
    dispatch(toggleOnSearch());

    return ()=>{
      dispatch(toggleOnSearch());
    }
  }, [])
  

  async function fetchData() {
    const response = await fetch(
      'https://corsproxy.io/?' + encodeURIComponent(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=27.882255&lng=78.071612&str=${searchText}`)
    );
    const jsonData = await response.json();
    const suggestions = jsonData.data.suggestions.filter(
      (suggestion) => suggestion.type === "RESTAURANT"
    );
    setFoundItems(suggestions);
    console.log(suggestions);
  }

  function handleCross() {
    setFoundItems([]);
    setSearchText("");
  }

  return (
    <div className="search">
      <div className="search-box">
        <div className="container">
          <input
            type="text"
            placeholder="Search for restaurants"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          {foundItems.length === 0 ? (
            <svg viewBox="5 -1 12 25" height="17" width="17" fill="#686b78">
              <path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path>
            </svg>
          ) : (
            <RxCross1
              onClick={handleCross}
              style={{ cursor: "pointer", strokeWidth: "1px" }}
            />
          )}
        </div>
      </div>

      <div className="search-items">
        {foundItems?.map((item) => (
          <Link
            to={`/restaurants/${
              JSON.parse(item.metadata).data.primaryRestaurantId
            }`}
            key={JSON.parse(item.metadata).data.primaryRestaurantId}
          >
            <SearchItem {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
