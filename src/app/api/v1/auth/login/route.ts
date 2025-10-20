import {mockServerApi} from "@/lib/mock-server-api";

type LoginBody = {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body: LoginBody = await req.json();
  const requestData = {
    email: body.email,
    password: body.password
  }
  return await mockServerApi.loginAPI(requestData);
}