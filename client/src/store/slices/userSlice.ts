import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: null,
  favoriteOutfits: [],
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.accessToken;
      state.favoriteOutfits = action.payload.user.favoriteOutfits;
      state.isLoading = false;
      state.error = false;
    },
    signInFailed: (state, action) => {
      state.isLoading = false;
      state.error = false;
    },
    signUpStart: (state) => {
      state.isLoading = true;
    },
    signUpSuccess: (state) => {
      state.isLoading = false;
      state.error = false;
    },
    signUpFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
   
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.favoriteOutfits = [];
      state.isLoading = false;
      state.error = false;
    },
    
  },
});
export const { signInStart, signInSuccess, signInFailed,signUpStart,signUpSuccess, signUpFailed, signOut } = userSlice.actions;
export default userSlice.reducer;