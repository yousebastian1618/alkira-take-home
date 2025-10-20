import {Button} from "@/types/utils";

export const healthCheckButton: Button = {
  name: 'health-check',
  label: 'Health Check',
  function: 'crud',
  route: '/health-check/',
  crudType: 'GET'
}

export const homePageLoginButton: Button = {
  name: 'click-to-login-in',
  label: 'Login',
  function: 'navigation',
  route: '/login'
}

export const homePageLogoutButton: Button = {
  name: 'logout',
  label: 'Logout',
  function: 'crud',
  route: '/auth/logout',
  crudType: 'POST',
  color: "#F03F07",
  hoveringColor: "#D63300",
}

export const loginButtons: Button[] = [
  {
    name: "login",
    label: "LOGIN",
    function: "crud",
    route: '/auth/login',
    crudType: 'POST',
    keyDown: "Enter"
  }
]

export const signupButtons: Button[] = [
  {
    name: "signup",
    label: "SIGN UP",
    function: "crud",
    route: '/auth/signup/',
    crudType: 'POST',
    keyDown: "Enter"
  },
  {
    name: "cancel",
    label: "CANCEL",
    function: "navigation",
    color: "#F03F07",
    hoveringColor: "#D63300",
    route: '/login'
  }
]

export const mfaButtons: Button[] = [
  {
    name: "authenticate",
    label: "AUTHENTICATE",
    function: "crud",
    route: '/auth/mfa/',
    crudType: 'POST',
    keyDown: "Enter"
  }
]

export const forgotPasswordButtons: Button[] = [
  {
    name: "forgot-password",
    label: "SUBMIT",
    function: "crud",
    route: '/auth/forgot-password/',
    crudType: 'POST',
    keyDown: "Enter"
  }
]

export const resetPasswordButtons: Button[] = [
  {
    name: "reset-password",
    label: "RESET PASSWORD",
    function: "crud",
    route: '/auth/reset-password/',
    crudType: 'POST',
    keyDown: "Enter"
  }
]
