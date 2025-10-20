import {mockServerApi} from "@/lib/mock-server-api";
import {User} from "@/types/user";
import HomeClient from "@/app/client";
export default async function Home() {
  let checkAuth: User | null = null;
  const ver = await mockServerApi.checkAuthenticated();
  if (ver !== null) {
    checkAuth = await ver.json();
  }

  return (
    <HomeClient user={checkAuth} />
  );
}
