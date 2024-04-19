import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

import { accessTokenAtom, authStateAtom, profileAtom } from '@/atoms/authAtoms';
import { QUICKLY_API_URL } from '@/constants/apiUrl';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { quicklyApi, SignupData } from '@/services/quicklyApi';
import { AuthState } from '@/types/auth';
import { Company, Profile, User } from '@/types/profile';

interface ProfileResponse {
  success: boolean;
  message: string;
  user?: User;
  company?: Company;
}

export const useAuth: () => {
  authState: AuthState;
  accessToken?: string;
  signup: (data: SignupData) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getProfile: () => Promise<ProfileResponse>;
  profile: Profile | null;
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

  const signup = async (signupData: SignupData): Promise<boolean> => {
    try {
      const response = await quicklyApi.signup(signupData);
      if (response.success) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.token);
        setAccessToken(response.token);
        setAuthState(AuthState.LOGGED_IN);
        return true; // success
      }
      console.error(response.message);
      return false; // error
    } catch (error) {
      console.error(error);
      return false; // error
    }
  };

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const response = await quicklyApi.login({ email, password });
      if (response.success) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.token);
        setAccessToken(response.token);
        setAuthState(AuthState.LOGGED_IN);
        return true; // success
      }
      console.error(response.message);
      return false; // error
    } catch (error) {
      console.error(error);
      return false; // error
    }
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    setAccessToken('');
    setAuthState(AuthState.LOGGED_OUT);
    setProfile(null);
  };

  const getProfile = useCallback(async () => {
    const response = await fetch(QUICKLY_API_URL.USER, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = (await response.json()) as ProfileResponse;
    setProfile({
      user: data.user,
      company: data.user.Company,
    });
    return data;
  }, [accessToken, setProfile]);

  return {
    accessToken,
    authState,
    signup,
    login,
    logout,
    getProfile,
    profile,
  };
};
