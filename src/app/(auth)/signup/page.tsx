import {signupForm} from "@/objects/forms";
import {signupButtons} from "@/objects/buttons";
import AuthShell from "@/app/(auth)/_components/AuthShell";

export default function SignUpPage() {
  return (
    <AuthShell
      pageTitle="SIGNUP"
      image="/auths/signup.png"
      form={signupForm}
      buttons={signupButtons}
    />
  )
}