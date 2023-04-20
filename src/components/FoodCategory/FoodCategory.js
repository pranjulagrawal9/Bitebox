import React, { useRef } from 'react'
import './FoodCategory.scss'
import {SlArrowDown} from 'react-icons/sl'
import FoodItem from '../FoodItem/FoodItem'

function FoodCategory() {

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
            <h3>Recommended (27)</h3>
            <SlArrowDown />
        </div>
        
        <div className="food-items" ref={categoryRef} style={{display:"block"}} >
            <FoodItem />
            <FoodItem />
            <FoodItem />
        </div>
        <div className="separator"></div>
    </div>
  )
}

export default FoodCategory