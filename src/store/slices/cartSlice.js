import { createSlice } from "@reduxjs/toolkit";

export const cartSlice= createSlice({
    name: 'cart',

    initialState: {
        items: [],
        restaurantInfo: {}
    },

    reducers: {
        addItem: (state, action)=>{
            if(state.items.length!==0){
                if(state.restaurantInfo.id===action.payload.restaurantDetails.id){
                    const item= state.items.find((item)=> item.id===action.payload.itemDetails.id);
                    if(item)
                        item.count++;
                    else
                        state.items.push({...action.payload.itemDetails, count: 1});
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
        }
    }
})

export const {addItem, removeItem, increaseItem} = cartSlice.actions;
export default cartSlice.reducer;