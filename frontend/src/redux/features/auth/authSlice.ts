import { createSlice } from '@reduxjs/toolkit';

const name: any = typeof window !== "undefined" && window.localStorage.getItem("name")

const initialState = {
  isLoggedIn: false,
  otp:"",
  name: name ? name : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
    role:""
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload
    },
    SET_OTP(state, action) {
      state.otp = action.payload
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload))
      state.name = action.payload
    },
    SET_USER(state, action) {
      const profile = action.payload
      state.user.name = profile.name
      state.user.email = profile.email
      state.user.photo = profile.photo
      state.user.phone = profile.phone
      state.user.bio = profile.bio
      state.user.role = profile.role
    }
  }
});

export const { SET_LOGIN, SET_NAME, SET_USER , SET_OTP} = authSlice.actions;

export const selectIsLoggedIn = (state: { auth: { isLoggedIn: any; }; }) => state.auth.isLoggedIn;
export const selectName = (state: { auth: { name: any; }; }) => state.auth.name;
export const selectOtp = (state: { auth: { otp: any; }; }) => state.auth.otp;
export const selectUser = (state: { auth: { user: any; }; }) => state.auth.user;

export default authSlice.reducer