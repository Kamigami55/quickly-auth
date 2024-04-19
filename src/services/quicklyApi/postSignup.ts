import { QUICKLY_API_URL } from '@/constants/apiUrl';

export interface SignupData {
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

interface SignupRequestPayload {
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

interface SignupResponse {
  success: boolean;
  message: string;
  token?: string;
}

function signupDataToRequestPayload(data: SignupData): SignupRequestPayload {
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
export async function postSignup(data: SignupData): Promise<SignupResponse> {
  const requestPayload = signupDataToRequestPayload(data);

  const response = await fetch(QUICKLY_API_URL.SIGNUP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  });
  const responseJson = (await response.json()) as SignupResponse;

  return responseJson;
}
