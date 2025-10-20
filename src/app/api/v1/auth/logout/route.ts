import {mockServerApi} from "@/lib/mock-server-api";

export async function POST() {
  return await mockServerApi.logoutApi();
}