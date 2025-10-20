import {mockServerApi} from "@/lib/mock-server-api";

type ResetPasswordBody = {
  token: string;
  password: string;
  confirmPassword: string;
}

export async function POST(
  req: Request,
) {
  const body: ResetPasswordBody = await req.json();
  return await mockServerApi.resetPasswordAPI(body);
}