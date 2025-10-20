import MFAClient from "@/app/(auth)/mfa/[token]/client";
import {mockServerApi} from "@/lib/mock-server-api";
import {redirect} from "next/navigation";

export default async function MFAPage({ params }: { params: Promise<{ token: string }> }) {
  const p = await params;
  const isValid = await mockServerApi.checkMFATokenApi({ token: p.token, type: 'mfa' });
  if (!await isValid.json()) {
    redirect('/login');
  }
  return (
    <MFAClient />
  )
}