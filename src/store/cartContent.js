import { configureStore, createSlice } from '@reduxjs/toolkit'


let cartContent = createSlice({
    name: 'cartContent',
    initialState:
        [
            { id: 0, name: 'White and Black', count: 2 },
            { id: 2, name: 'Grey Yordan', count: 1 }
        ],
    reducers: {
        addCount(state, action){
            const{ id } = action.payload;
            const product = state.find(item => item.id === id);
            if(product) {
                product.count += 1;
            }
        },
        addItem(state, action){
            const{ id } = action.payload;
            const productIndex = state.findIndex(item => item.id === id);
            if(productIndex !== -1){
                state[productIndex].count += 1;
            } else {
                state.push(action.payload)
            }

        },
        deleteItem(state, action){
            const{ id } = action.payload;
            return state.filter(item => item.id !== id);
        }
    }
})  

export default cartContent;