import {useFormStore} from "@/stores/formStore";
import {FormInput, FormInputValue} from "@/types/utils";

const formStore = useFormStore.getState();

export async function passCheckError() {
  const formStore = useFormStore.getState();
  formStore.clearErrors();
  const currentForm = formStore.currentForm;
  for (const formInput of currentForm) {
    if (!passError(formInput, currentForm)) {
      return false;
    }
  }
  return true;
}

function passError(formInput: FormInput, currentForm: FormInput[]) {
  const errorChecks = formInput.checkErrors;
  for (const [errorName, errorCheck] of Object.entries(errorChecks)) {
    if (errorName === 'NOT_EMPTY') {
      if (!checkNotEmpty(formInput.value)) {
        formStore.addError(formInput.name, errorCheck.message);
        return false;
      }
    }
    if (errorName === 'FORMAT') {
      if (!checkFormat(formInput.value, errorCheck)) {
        formStore.addError(formInput.name, errorCheck.message);
        return false;
      }
    }
    if (errorName === 'MIN_LENGTH') {
      if (!checkMinLength(formInput.value, errorCheck)) {
        formStore.addError(formInput.name, errorCheck.message);
        return false;
      }
    }
    if (errorName === 'MAX_LENGTH') {
      if (!checkMaxLength(formInput.value, errorCheck)) {
        formStore.addError(formInput.name, errorCheck.message);
        return false;
      }
    }
    if (errorName === 'MATCH') {
      const matchingFormInput = currentForm.find((formInput) => formInput.name === errorCheck.criteria);
      if (matchingFormInput === undefined) return true;
      if (!checkMatch(formInput.value, matchingFormInput.value)) {
        formStore.addError(formInput.name, errorCheck.message);
        return false;
      }
    }
  }
  return true;
}

function checkNotEmpty(value: FormInputValue) {
  if (value === undefined || value === null) return true;
  return value.toString().length !== 0;
}

function checkFormat(value: FormInputValue, errorCheck: Record<string, string>) {
  if (value === undefined || value === null) return true;
  if (errorCheck.criteria === 'EMAIL') {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.toString());
  }
  if (errorCheck.criteria === 'PASSWORD') {
    const lowercase = /[a-z]/;
    const number = /\d/;
    const special = /[^A-Za-z0-9]/;
    const strVal = value.toString();
    return lowercase.test(strVal) && number.test(strVal) && special.test(strVal);
  }
  if (errorCheck.criteria === 'MFA') {
    return /^[0-9]+$/.test(value.toString()) && value.toString().length === 6;
  }
  return true;
}

function checkMinLength(value: FormInputValue, errorCheck: Record<string, string>) {
  return value!.toString().length >= parseInt(errorCheck.criteria);
}

function checkMaxLength(value: FormInputValue, errorCheck: Record<string, string>) {
  return value!.toString().length <= parseInt(errorCheck.criteria);
}

function checkMatch(value: FormInputValue, matchingValue: FormInputValue) {
  return value === matchingValue;
}