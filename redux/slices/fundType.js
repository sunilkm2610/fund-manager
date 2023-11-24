import { createSlice } from '@reduxjs/toolkit'


// Define the initial state using that type
const initialState = {
    fundType: null,
    fundTypeLoading: false
}

export const fundTypeSlice = createSlice({
    name: 'fundType',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setFundType: (state, action) => {
            state.fundType = action.payload;
        },
        setFundTypeLoading: (state, action) => {
            state.fundTypeLoading = action.payload;
        }
    },
})

export const { setFundType, setFundTypeLoading } = fundTypeSlice.actions


export default fundTypeSlice.reducer