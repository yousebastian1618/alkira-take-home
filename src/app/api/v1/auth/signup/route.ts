import {mockServerApi} from "@/lib/mock-server-api";

type SignupBody = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export async function POST(req: Request) {
  const body: SignupBody = await req.json();
  return await mockServerApi.signupAPI(body);
}