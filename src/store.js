import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'
import cartContent from './store/cartContent'


export let {changeName, increaseAge} = user.actions

export let { addCount } = cartContent.actions;


let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})






export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cartContent: cartContent.reducer
    }
}) 