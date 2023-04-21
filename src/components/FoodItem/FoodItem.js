import React from 'react'
import './FoodItem.scss'
import vegIcon from '../../assets/images/veg-icon.png'
import nonVegIcon from '../../assets/images/non-veg-icon.png'

function FoodItem({name, price, description, imageId, itemAttribute}) {
  return (
    <div className='food-item'>
        <div className="left">
            <div className="veg-non-veg-icon">
                <img src={itemAttribute.vegClassifier==="VEG" ? vegIcon : nonVegIcon} alt="veg-non-veg-icon" />
            </div>
            <div className="food-name">{name}</div>
            <div className="cost">₹ {price/100}</div>
            <div className="description">{description}</div>
        </div>
        <div className="right">
            <div className={imageId ? "food-image" : "food-image center-with-flex"}>
                {imageId && <img src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`} alt={name} />}
                <button className={imageId ? "add-btn" : "add-btn img-not-present" }>ADD</button>
            </div>
        </div>
    </div>
  )
}

export default FoodItem