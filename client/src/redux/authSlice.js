import { createSlice } from '@reduxjs/toolkit';

const authSlice= createSlice({
    name:'auth',
    initialState:{
        user: null,
        token: null,
        isAuthenticated: false,
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;