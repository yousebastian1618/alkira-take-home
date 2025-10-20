'use client'
import {mfaForm} from "@/objects/forms";
import {mfaButtons} from "@/objects/buttons";
import AuthShell from "@/app/(auth)/_components/AuthShell";

export default function MFAClient() {

  return (
    <AuthShell
      pageTitle="MFA"
      image="/auths/mfa.png"
      form={mfaForm}
      buttons={mfaButtons}
    />
  )
}