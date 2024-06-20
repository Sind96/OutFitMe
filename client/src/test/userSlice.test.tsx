import { configureStore } from '@reduxjs/toolkit';
import userReducer, { signInStart, signInSuccess, signInFailed, signUpStart, signUpSuccess, signUpFailed, signOut } from '../store/slices/userSlice';

describe('userSlice', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
  });

  // Sign In Actions

  it('should set isLoading to true on signInStart', () => {
    store.dispatch(signInStart());
    const state = store.getState();
    expect(state.user.isLoading).toBe(true);
  });

  it('should update state with user data on signInSuccess', () => {
    const mockUser = { username: 'test_user', token: '12345' };
    store.dispatch(signInSuccess({ user: mockUser, accessToken: '12345' }));
    const state = store.getState();
    expect(state.user.currentUser).toEqual(mockUser);
    expect(state.user.token).toEqual('12345');
    expect(state.user.isLoading).toBe(false);
    expect(state.user.error).toBe(false);
  });

  it('should reset isLoading and error on signInFailed', () => {
    store.dispatch(signInFailed());
    const state = store.getState();
    expect(state.user.isLoading).toBe(false);
    expect(state.user.error).toBe(false);
  });

  // Sign Up Actions

  it('should set isLoading to true on signUpStart', () => {
    store.dispatch(signUpStart());
    const state = store.getState();
    expect(state.user.isLoading).toBe(true);
  });

  it('should reset isLoading and error on signUpSuccess', () => {
    store.dispatch(signUpSuccess());
    const state = store.getState();
    expect(state.user.isLoading).toBe(false);
    expect(state.user.error).toBe(false);
  });

  it('should set error to true on signUpFailed', () => {
    store.dispatch(signUpFailed());
    const state = store.getState();
    expect(state.user.isLoading).toBe(false);
    expect(state.user.error).toBe(true);
  });

  // Sign Out Action

  it('should reset all user state on signOut', () => {
    store.dispatch(signOut());
    const state = store.getState();
    expect(state.user.currentUser).toBeNull();
    expect(state.user.token).toBeNull();
    expect(state.user.favoriteOutfits).toEqual([]);
    expect(state.user.isLoading).toBe(false);
    expect(state.user.error).toBe(false);
  });
});