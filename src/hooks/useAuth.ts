import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

import { accessTokenAtom, authStateAtom, profileAtom } from '@/atoms/authAtoms';
import { QUICKLY_API_URL } from '@/constants/apiUrl';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { quicklyApi } from '@/services/quicklyApi';
import { AuthState } from '@/types/auth';
import { Company, Profile, User } from '@/types/profile';

interface ProfileResponse {
  success: boolean;
  message: string;
  user?: User;
  company?: Company;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  earlyPayIntent: boolean;
  expectedActivity: string;
  industry: string;
  businessType: string;
  website: string;
  businessRegistration: string;
  phone: string;
  businessNumber: string;
  hasTradeName: boolean;
  legalName: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface SignupPayload {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
  company: {
    activity: {
      early_pay_intent: boolean;
      expected_activity: string;
    };
    early_pay_intent: boolean;
    industry: { value: string; label: string };
    business_type: {
      value: string;
      label: string;
    };
    website: string;
    business_registration: string;
    phone: string;
    business_number: string;
    has_trade_name: boolean;
    legal_name: string;
    expected_activity: string;
  };
}

function signupDataToPayload(data: SignupData): SignupPayload {
  return {
    user: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    },
    company: {
      activity: {
        early_pay_intent: data.earlyPayIntent,
        expected_activity: data.expectedActivity,
      },
      early_pay_intent: data.earlyPayIntent,
      industry: {
        value: data.industry,
        label: data.industry,
      },
      business_type: {
        value: data.businessType,
        label: data.businessType,
      },
      website: data.website,
      business_registration: data.businessRegistration,
      phone: data.phone,
      business_number: data.businessNumber,
      has_trade_name: data.hasTradeName,
      legal_name: data.legalName,
      expected_activity: data.expectedActivity,
    },
  };
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

  const signup = async (signupData: SignupData) => {
    try {
      const payload = signupDataToPayload(signupData);
      const response = await fetch(QUICKLY_API_URL.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as SignupResponse;
      if (data.success) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.token);
        setAccessToken(data.token);
        setAuthState(AuthState.LOGGED_IN);
        return true; // success
      }
      console.error(data.message);
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
        return true; // success, return true
      }
      console.error(response.message);
      return false; // error, return false
    } catch (error) {
      console.error(error);
      return false; // error, return false
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
