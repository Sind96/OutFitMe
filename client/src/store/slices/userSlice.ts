import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthResponse,
  UpdateUserFormData,
  User,
} from "../../Types/auth.types";

interface UserState {
  currentUser: User | null;
  token: string | null;
  favoriteOutfits: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  favoriteOutfits: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state, action: PayloadAction<AuthResponse>) => {
      state.currentUser = action.payload.user ?? null;
      state.token = action.payload.accessToken;
      state.favoriteOutfits = [];
      state.isLoading = false;
      state.error = null;
    },
    signInFailed: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload ?? "Sign in failed";
    },
    signUpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signUpSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    signUpFailed: (state, action: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.error = action.payload ?? "Sign up failed";
    },
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.favoriteOutfits = [];
      state.isLoading = false;
      state.error = null;
    },
    updateUserInfo: (state, action: PayloadAction<UpdateUserFormData>) => {
      if (!state.currentUser) return;

      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signOut,
  updateUserInfo,
} = userSlice.actions;

export default userSlice.reducer;