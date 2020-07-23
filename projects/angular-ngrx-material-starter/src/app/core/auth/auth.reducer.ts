import { AuthState } from './auth.models';
import { authLogout, authLoginSuccess, authLoginFailure } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  isAdmin: 0,
  username: null,
  token: ''
};

const reducer = createReducer(
  initialState,
  on(authLoginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    isAdmin: user.isAdmin,
    username: user.username,
    token: user.token
  })),
  on(authLogout, state => ({
    ...state,
    isAuthenticated: false,
    username: null,
    isAdmin: 0,
    token: ''
  })),
  on(authLoginFailure, state => ({
    ...state,
    isAuthenticated: false,
    username: null,
    isAdmin: 0,
    token: ''
  }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
