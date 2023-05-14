import { createSlice } from "@reduxjs/toolkit";

export const cartSlice= createSlice({
    name: 'cart',

    initialState: {
        items: [],
        restaurantInfo: {},
        isOtherRestaurant: false,
        otherRestaurantData: {
            items: [],
            restaurantInfo: {}
        }
    },

    reducers: {
        addItem: (state, action)=>{
            // if cart is not empty
            if(state.items.length!==0){
                // if cart already contains items from same restaurant
                if(state.restaurantInfo.id===action.payload.restaurantDetails.id){
                    const item= state.items.find((item)=> item.id===action.payload.itemDetails.id);
                    if(item)
                        item.count++;
                    else
                        state.items.push({...action.payload.itemDetails, count: 1});
                }
                // if cart already contains items from other restaurant
                else{
                    state.isOtherRestaurant=true; 
                    state.otherRestaurantData.items.push({...action.payload.itemDetails, count: 1});
                    state.otherRestaurantData.restaurantInfo= action.payload.restaurantDetails;
                }
                return;
            }
               
            state.items.push({...action.payload.itemDetails, count: 1});
            state.restaurantInfo= action.payload.restaurantDetails;
        },

        removeItem: (state, action)=>{
            const item= state.items.find((item)=> item.id===action.payload);
            if(item){
                if(item.count===1){
                    const index= state.items.indexOf(item);
                    state.items.splice(index, 1);
                }
                else
                    item.count--;
            }

            if(state.items.length===0)
                state.restaurantInfo={};
        },

        increaseItem: (state, action)=>{
            const item= state.items.find((item)=> item.id===action.payload);
            item.count++;
        },
        closeModal: (state)=>{
            state.isOtherRestaurant=false;
            state.otherRestaurantData.items=[];
            state.otherRestaurantData.restaurantInfo={};
        },

        resetCart: (state)=>{
            state.items=state.otherRestaurantData.items;
            state.restaurantInfo=state.otherRestaurantData.restaurantInfo;
        }
    }
})

export const {addItem, removeItem, increaseItem, closeModal, resetCart} = cartSlice.actions;
export default cartSlice.reducer;