import { current } from '@reduxjs/toolkit';
import reducer, { signInStart, signInFailed, signInSuccess } from '../store/slices/userSlice';
import exp from 'constants';
import { error } from 'console';


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
  expect(reducer(initialState, signInStart())).toEqual(
    { 
      currentUser: null,
      token: null,
      favoriteOutfits: [],
      isLoading: true,
      error: false,
    }
  )
})

test('should set isLoading to false and error to false in case of signInFailed', () => {
  const previousState = {
    currentUser: null,
    token: null,
    favoriteOutfits: [],
    isLoading: true,
    error: false,
  };

  expect(reducer(previousState, signInFailed())).toEqual(
    { 
      currentUser: null,
      token: null,
      favoriteOutfits: [],
      isLoading: false,
      error: false,
    }
  )
})

