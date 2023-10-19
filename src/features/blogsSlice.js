import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogs: [],
  };

export const blogsSlice= createSlice({
    name:"blogsSlice",
    initialState,
    reducers:{
        logIn:(state,action)=>{
        },
        logOut:(state,action)=>{
        }
    }
})
export const {logIn,logOut}= blogsSlice.actions
export default blogsSlice.reducer
