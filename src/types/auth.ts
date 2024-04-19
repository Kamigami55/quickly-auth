export enum AuthState {
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT',
  LOADING = 'LOADING',
}

export type ApiResponse = {
  success: boolean;
  message: string;
};
