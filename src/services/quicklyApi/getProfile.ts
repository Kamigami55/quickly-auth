import { QUICKLY_API_URL } from '@/constants/apiUrl';

export type ProfileData = {
  user: User;
  company: Company;
};

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  Company: Company;
}

export interface Company {
  legal_name: string;
  business_registration: string;
  business_type: string;
  industry: string;
  expected_activity: string;
  early_pay_intent: number; // true false
  website: string;
  business_number: string;
  phone: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  user?: User;
  company?: Company;
}

export async function getProfile({
  accessToken,
}: {
  accessToken: string;
}): Promise<ProfileData> {
  const response = await fetch(QUICKLY_API_URL.USER, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const responseJson = (await response.json()) as ProfileResponse;
  const profileData: ProfileData = {
    user: responseJson.user,
    company: responseJson.user.Company,
  };
  return profileData;
}
