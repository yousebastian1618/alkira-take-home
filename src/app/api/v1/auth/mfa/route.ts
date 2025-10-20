import {mockServerApi} from "@/lib/mock-server-api";

type MFABody = {
  code: string;
  token: string;
}

export async function POST(req: Request) {
  const body: MFABody = await req.json();
  const requestData = {
    code: body.code,
    token: body.token
  }
  return await mockServerApi.mfaAPI(requestData);
}