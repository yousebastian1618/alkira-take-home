import {mockServerApi} from "@/lib/mock-server-api";

export function GET() {
  return mockServerApi.healthCheck();
}