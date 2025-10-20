import {FormInput} from "@/types/utils";

export const loginForm: FormInput[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Email cannot be empty"
      },
      "FORMAT": {
        criteria: "EMAIL",
        message: "Your email is not in the right format."
      }
    }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      },
    },
  }
]

export const signupForm: FormInput[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Email cannot be empty"
      },
      "FORMAT": {
        criteria: "EMAIL",
        message: "Your email is not in the right format."
      }
    }
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "First Name cannot be empty"
      },
      "MIN_LENGTH": {
        criteria: "3",
        message: "Your first name needs to be at least 3 characters long"
      }
    }
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Last Name cannot be empty"
      },
      "MIN_LENGTH": {
        criteria: "3",
        message: "Your last name needs to be at least 3 characters long"
      }
    }
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      },
      "FORMAT": {
        criteria: "PASSWORD",
        message: "Your password needs to contain at least 1 lower character, 1 number, and 1 special character."
      }
    }
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "MATCH": {
        criteria: "password",
        message: "Password does not match"
      }
    }
  }
]

export const mfaForm: FormInput[] = [
  {
    name: 'code',
    label: 'MFA Code',
    type: 'text',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "FORMAT": {
        criteria: "MFA",
        message: "Your code should be a 6-digit code"
      }
    }
  },
]

export const forgotPasswordForm: FormInput[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Email cannot be empty"
      },
      "FORMAT": {
        criteria: "EMAIL",
        message: "Your email is not in the right format."
      }
    }
  },
]

export const resetPasswordForm: FormInput[] = [
  {
    name: 'password',
    label: 'New Password',
    type: 'password',
    value: '',
    description: "Password must be at least 8 characters",
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "NOT_EMPTY": {
        criteria: "",
        message: "Password cannot be empty"
      },
      "FORMAT": {
        criteria: "PASSWORD",
        message: "Your new password should contain at least 1 lower character, 1 number, and 1 special character"
      }
    }
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    value: '',
    required: true,
    error: false,
    errorMessage: '',
    checkErrors: {
      "MATCH": {
        criteria: "password",
        message: "Password does not match"
      }
    }
  }
]
