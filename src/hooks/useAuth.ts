import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect } from 'react';

import {
  accessTokenAtom,
  isLoggedInAtom,
  profileAtom,
} from '@/atoms/authAtoms';
import { PROXY_API_URL, QUICKLY_API_URL } from '@/constants/apiUrl';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { Company, Profile, User } from '@/types/profile';

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  user?: User;
  company?: Company;
}

export const useAuth: () => {
  isLoggedIn: boolean;
  accessToken?: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getProfile: () => Promise<ProfileResponse>;
  profile: Profile | null;
} = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [profile, setProfile] = useAtom(profileAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [setAccessToken]);

  async function login(email: string, password: string) {
    try {
      const response = await fetch(QUICKLY_API_URL.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = (await response.json()) as LoginResponse;
      if (data.success) {
        setAccessToken(data.token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.token);
        return true; // success
      }
      console.error(data.message);
      return false; // error
    } catch (error) {
      console.error(error);
      return false; // error
    }
  }

  const logout = () => {
    setAccessToken('');
    setProfile(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  };

  const getProfile = useCallback(async () => {
    const response = await fetch(PROXY_API_URL.USER, {
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
    isLoggedIn,
    login,
    logout,
    getProfile,
    profile,
  };
};
