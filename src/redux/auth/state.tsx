export type AuthState = {
  token: any;
  userInfo: any;
};

export const INITIAL_STATE_AUTH: AuthState = {
  token: null,
  userInfo: null,
};
