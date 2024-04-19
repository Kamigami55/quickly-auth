export type Profile = {
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
