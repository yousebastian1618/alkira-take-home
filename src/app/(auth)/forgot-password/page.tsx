import {forgotPasswordForm} from "@/objects/forms";
import {forgotPasswordButtons} from "@/objects/buttons";
import AuthShell from "@/app/(auth)/_components/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      pageTitle="FORGOT PASSWORD"
      image="/auths/forgot-password.png"
      form={forgotPasswordForm}
      buttons={forgotPasswordButtons}
    />
  )
}