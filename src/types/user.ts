export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  code: string;
  mfa: boolean;
  token: string;
  password: string;
}