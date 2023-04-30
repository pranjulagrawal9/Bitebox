import React, { useRef } from 'react'
import './FoodCategory.scss'
import {SlArrowDown} from 'react-icons/sl'
import FoodItem from '../FoodItem/FoodItem'

function FoodCategory(props) {
    const {itemCards, title, restaurantData}= props;

    const categoryRef = useRef(null);
    function toggleFoodItems(){
        if(categoryRef.current.style.display==='block')
            categoryRef.current.style.display="none";
        else
            categoryRef.current.style.display="block";
    }

  return (
    <div className='food-category'>
        <div className="title" onClick={toggleFoodItems} >
            <h3>{title} {`(${itemCards.length})`}</h3>
            <SlArrowDown />
        </div>
        
        <div className="food-items" ref={categoryRef} style={{display:"block"}} >
            {itemCards?.map((card)=> (
                <FoodItem {...{foodItem: card.card.info, restaurantData}} key={card.card.info.id} />
            ))}
        </div>
        <div className="separator"></div>
    </div>
  )
}

export default FoodCategory