export const SWIGGY_RESTAURANTS_API_URI =
  process.env.REACT_APP_PROXY_URL +
  "https://www.swiggy.com/dapi/restaurants/list/v5?&page_type=DESKTOP_WEB_LISTING";

export const CLOUDINARY_RESTAURANT_URI =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill";
export const GEOCODING_URI = `https://geocode.maps.co/reverse?api_key=${process.env.REACT_APP_GEOCODING_API_KEY}`;
