import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  error: null,
  loading: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    signInAdminStart: (state) => {
      state.loading = true;
    },
    signInAdminSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInAdminFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    Adminlogout:(state)=>{
      state.admin = null;
  }
  },
});

export const {
  signInAdminStart,
  signInAdminSuccess,
  signInAdminFailure,
  Adminlogout
} = adminSlice.actions;

export default adminSlice.reducer;