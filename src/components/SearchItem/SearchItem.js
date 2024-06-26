import { CLOUDINARY_RESTAURANT_URI } from "../../utils/constants";
import "./SearchItem.scss";

function SearchItem({ text, metadata }) {
  const cloudinaryId = JSON.parse(metadata).data.cloudinaryId;

  return (
    <div className="search-item">
      <div>
        <img
          src={`${CLOUDINARY_RESTAURANT_URI}/${cloudinaryId}`}
          alt="restaurant"
        />
      </div>
      <div>{text}</div>
    </div>
  );
}

export default SearchItem;
