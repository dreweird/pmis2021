import { createSelector } from '@ngrx/store';

import { selectAuthState } from '../core.state';
import { AuthState } from './auth.models';

export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

export const selectUserName = createSelector(
  selectAuthState,
  (state: AuthState) => state.username
);

export const selectUserType = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAdmin
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
