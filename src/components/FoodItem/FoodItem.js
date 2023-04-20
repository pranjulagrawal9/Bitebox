import React from 'react'
import './FoodItem.scss'
import vegIcon from '../../assets/images/veg-icon.png'

function FoodItem() {
  return (
    <div className='food-item'>
        <div className="left">
            <div className="veg-non-veg-icon">
                <img src={vegIcon} alt="veg-non-veg-icon" />
            </div>
            <div className="food-name">Salted Caramel Brownie Cornetto 110ml</div>
            <div className="cost">₹ 70</div>
            <div className="description">Sweet And Salty! Crunchy Waffle Cone Loaded With Salted Caramel, Brownies And Topped With A Soft Chocolate Disc. Kcal/Serving: 250</div>
        </div>
        <div className="right">
            <div className="food-image">
                <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/0742b59dc331af994273254c745b0f6a" alt="food" />
                <button>ADD</button>
            </div>
        </div>
    </div>
  )
}

export default FoodItem