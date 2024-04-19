import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

import { accessTokenAtom, authStateAtom, profileAtom } from '@/atoms/authAtoms';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { ProfileData, quicklyApi, SignupData } from '@/services/quicklyApi';
import { ApiResponse, AuthState } from '@/types/auth';

export const useAuth: () => {
  authState: AuthState;
  accessToken?: string;
  signup: (data: SignupData) => Promise<ApiResponse>;
  login: (email: string, password: string) => Promise<ApiResponse>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  profile: ProfileData | null;
} = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [profile, setProfile] = useAtom(profileAtom);
  const [authState, setAuthState] = useAtom(authStateAtom);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      setAccessToken(accessToken);
      setAuthState(AuthState.LOGGED_IN);
    } else {
      setAuthState(AuthState.LOGGED_OUT);
    }
  }, [setAccessToken, setAuthState]);

  const signup = async (signupData: SignupData): Promise<ApiResponse> => {
    try {
      const response = await quicklyApi.postSignup(signupData);
      if (response.success) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.token);
        setAccessToken(response.token);
        setAuthState(AuthState.LOGGED_IN);
      } else {
        console.error(response.message);
      }
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  };

  async function login(email: string, password: string): Promise<ApiResponse> {
    try {
      const response = await quicklyApi.postLogin({ email, password });
      if (response.success) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.token);
        setAccessToken(response.token);
        setAuthState(AuthState.LOGGED_IN);
      } else {
        console.error(response.message);
      }
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    setAccessToken('');
    setAuthState(AuthState.LOGGED_OUT);
    setProfile(null);
  };

  const fetchProfile = useCallback(async () => {
    const profileData = await quicklyApi.getProfile({ accessToken });
    setProfile(profileData);
  }, [accessToken, setProfile]);

  return {
    accessToken,
    authState,
    signup,
    login,
    logout,
    fetchProfile,
    profile,
  };
};
