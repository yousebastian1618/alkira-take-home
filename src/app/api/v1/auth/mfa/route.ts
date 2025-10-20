import {mockServerApi} from "@/lib/mock-server-api";

type MFABody = {
  code: string;
}

export async function POST(req: Request) {
  const body: MFABody = await req.json();
  const requestData = {
    code: body.code
  }
  return await mockServerApi.mfaAPI(requestData);
}