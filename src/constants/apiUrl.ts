const QUICKLY_API_BASE_URL = process.env.NEXT_PUBLIC_QUICKLY_API_BASE_URL;

export const QUICKLY_API_URL = {
  LOGIN: `${QUICKLY_API_BASE_URL}/auth/login`,
  SIGNUP: `${QUICKLY_API_BASE_URL}/auth/signup`,
  USER: `${QUICKLY_API_BASE_URL}/auth/user`,
};
