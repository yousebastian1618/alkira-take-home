'use client'
import {resetPasswordForm} from "@/objects/forms";
import {resetPasswordButtons} from "@/objects/buttons";
import AuthShell from "@/app/(auth)/_components/AuthShell";

export default function ResetPasswordClient() {

  return (
    <AuthShell
      pageTitle="RESET PASSWORD"
      image="/auths/reset-password.png"
      form={resetPasswordForm}
      buttons={resetPasswordButtons}
    />
  )
}