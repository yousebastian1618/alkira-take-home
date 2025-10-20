import {loginForm} from "@/objects/forms";
import AuthShell from "@/app/(auth)/_components/AuthShell";
import {loginButtons} from "@/objects/buttons";

export default function LoginPage() {
  return (
    <AuthShell
      pageTitle="LOGIN"
      image="/auths/login.png"
      form={loginForm}
      buttons={loginButtons}
    />
  )
}