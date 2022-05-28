import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
   cartItems:[],
   amount: 1,
   total: 0,
   isLoading: true
}


export const getCartItems = createAsyncThunk('cart/getCartItems', async() => {
   return fetch(url)
      .then(resp => resp.json())
      .catch(err => console.log(err))

})
const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      clearCart: (state) => {
         state.cartItems = []
      },
      removeItem: (state, action) => {
         const { id } = action.payload
         const removedItem = state.cartItems.filter(item => item.id !== id)
         state.cartItems = removedItem
      },
      increase: (state, action) => {
         const { id } = action.payload
         const index = state.cartItems.findIndex(item => item.id === id)
         const cartItem = state.cartItems[index]
         cartItem.amount = cartItem.amount + 1
         // state.cartItems.index = updatedItem
      },
      decrease: (state, action) => {
         const { id } = action.payload
         const index = state.cartItems.findIndex(item => item.id === id)
         const cartItem = state.cartItems[index]
         cartItem.amount = cartItem.amount - 1

      },
      calculatTotals: (state, action) => {
         state.amount = state.cartItems.reduce((prev, curr) => {
            return prev + curr.amount
         }, 0)
         state.total = state.cartItems.reduce((prev, curr) => {
            return prev + (curr.price * curr.amount)
         }, 0)
      },
   },
   extraReducers: {
      [getCartItems.pending]: (state, action) => {
         state.isLoading = true
      },
      [getCartItems.fulfilled]: (state, action) => {
         state.isLoading = false
         state.cartItems = action.payload
      },
      [getCartItems.rejected]: (state, action) => {
         state.isLoading = false
      },
   }
})
export const { clearCart, removeItem, increase, decrease, calculatTotals } = cartSlice.actions;
export default cartSlice.reducer