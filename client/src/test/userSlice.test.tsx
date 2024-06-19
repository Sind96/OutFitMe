import { current } from '@reduxjs/toolkit';
import reducer, { signInStart, signInFailed, signInSuccess } from '../store/slices/userSlice';


const initialState = {
  currentUser: null,
  token: null,
  favoriteOutfits: [],
  isLoading: false,
  error: false,
};


test('should return the initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(
    { 
      currentUser: null,
      token: null,
      favoriteOutfits: [],
      isLoading: false,
      error: false,
    }
  )
})

test('should set the isLoading to true in case of signInStart', () => {
  const previousState = initialState;

  expect(reducer(previousState, signInStart())).toEqual(
    { 
      currentUser: null,
      token: null,
      favoriteOutfits: [],
      isLoading: true,
      error: false,
    }
  )
})