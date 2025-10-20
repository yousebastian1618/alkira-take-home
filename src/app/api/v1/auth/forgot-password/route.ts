import {mockServerApi} from "@/lib/mock-server-api";

type ForgotPasswordBody = {
  email: string;
}

export async function POST(req: Request) {

  const body: ForgotPasswordBody = await req.json();
  return await mockServerApi.forgotPasswordAPI(body);
}