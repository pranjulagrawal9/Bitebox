import "./SearchItem.scss";

function SearchItem({text, metadata}) {
   const cloudinaryId= JSON.parse(metadata).data.cloudinaryId;

  return (
    <div className="search-item">
      <div>
        <img
          src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${cloudinaryId}`}
          alt="restaurant"
        />
      </div>
      <div>{text}</div>
    </div>
  );
}

export default SearchItem;
