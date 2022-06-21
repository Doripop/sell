import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    prdItem : []
}

  //상품목록 가져오기  
  export const prdAll_list = createAsyncThunk(
    'prdList/prdAllList',
    async() => {
        const response = await axios.get('http://13.125.112.232/market/list');
        return response.data
    }
  )

export const prdListSlice = createSlice({
    name: 'prdList',
    initialState: initialState,
    reducers: {
        listLoad : (state, action) => {
            state.data = action.payload
        }
    },
    extraReducers: {
        [prdAll_list.pending]: (state) => {
            console.log("호출중")
        },
        [prdAll_list.fulfilled]: (state, action) => {
            state.prdItem = action.payload
        },
        [prdAll_list.rejected]: (state) => {
            console.log("호출 실패")
        }
    }
})


export const {listLoad} = prdListSlice.actions
export default prdListSlice.reducer

