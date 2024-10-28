import { createSlice } from '@reduxjs/toolkit';

const authSlice= createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:false,
        token:null,
    },
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.token=action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
        },
    }
})

export const {login,logout}=authSlice.actions;
export default authSlice.reducer;