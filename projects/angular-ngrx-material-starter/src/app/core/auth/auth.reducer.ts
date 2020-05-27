import { AuthState } from './auth.models';
import { authLogout, authLoginSuccess, authLoginFailure } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

const reducer = createReducer(
  initialState,
  on(authLoginSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user: user.username
  })),
  on(authLogout, state => ({ ...state, isAuthenticated: false, user: null })),
  on(authLoginFailure, state => ({ ...state, isAuthenticated: false }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return reducer(state, action);
}
