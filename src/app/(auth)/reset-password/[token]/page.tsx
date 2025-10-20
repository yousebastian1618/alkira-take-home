import {mockServerApi} from "@/lib/mock-server-api";
import {redirect} from "next/navigation";
import ResetPasswordClient from "@/app/(auth)/reset-password/[token]/client";

export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const p = await params;
  const isValid = await mockServerApi.checkMFATokenApi({ token: p.token, type: 'reset-password' });
  if (!await isValid.json()) {

    redirect('/login');
  }
  return (
    <ResetPasswordClient />
  )
}