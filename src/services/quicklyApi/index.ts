import { getProfile } from './getProfile';
import { postLogin } from './postLogin';
import { postSignup } from './postSignup';

export * from './getProfile';
export * from './postLogin';
export * from './postSignup';

export const quicklyApi = {
  postLogin,
  postSignup,
  getProfile,
};
