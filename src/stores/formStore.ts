import { create } from "zustand";
import {FormInput, FormInputValue} from "@/types/utils";
import {useCallback, useMemo} from "react";

type State = {
  currentForm: FormInput[];
  currentFormName: string;
  errorMessage: string;
};

type Actions = {
  setCurrentForm: (form: FormInput[], formName: string) => void;
  clearForm: () => void;
  resetForm: () => void;
  addError: (formInputName: string, errorMessage: string) => void;
  clearErrors: () => void;
  updateFormValue: (name: string, value: FormInputValue) => void;
  getFormParams: () => Record<string, FormInputValue>;
  setErrorMessage: (message: string) => void;
};

export const useFormStore = create<State & Actions>((set, get) => ({
  currentForm: [],
  currentFormName: "",
  errorMessage: "",
  setCurrentForm: (form, formName) =>
    set(() => ({
      currentForm: form,
      currentFormName: formName
    })),
  clearForm: () =>
    set(() => ({
      currentForm: [],
      currentFormName: ""
    })),
  updateFormValue: (name, value) =>
    set((state) => {
      const form = state.currentForm;
      if (!form) return { currentForm: state.currentForm };
      const updated = form.map((fi) =>
        fi.name === name ? { ...fi, value } : fi
      );
      return { currentForm: updated };
    }),
  resetForm: () =>
    set((state) => {
      const form = state.currentForm;
      if (!form) return { currentForm: state.currentForm };
      const cleared = form.map((fi) => ({ ...fi, value: "" }));
      return { currentForm: cleared };
    }),
  addError: (formInputName: string, errorMessage: string) => {
    const form = [...get().currentForm];
    for (const formInput of form) {
      if (formInput.name === formInputName) {
        formInput.error = true;
        formInput.errorMessage = errorMessage;
      }
    }
    set(({
      currentForm: form,
    }))
  },
  clearErrors: () => {
    const form = [...get().currentForm];
    for (const formInput of form) {
      formInput.error = false;
      formInput.errorMessage = '';
    }
    set({
      currentForm: form,
    })
  },
  getFormParams: () => {
    const form = get().currentForm ?? [];
    const params: Record<string, FormInputValue> = {};
    for (const formInput of form) {
      params[formInput.name] = formInput.value ?? ""
    }
    return params;
  },
  setErrorMessage: (message: string) => set(({
    errorMessage: message
  }))
}));

export function useFormInputHook(name: string) {
  const value = useFormStore(
    (state) => state.currentForm?.find((fi) => fi.name === name)?.value ?? ""
  );
  const update = useFormStore((state) => state.updateFormValue);
  const set = useCallback(
    (v: FormInputValue) => update(name, v),
    [update, name]
  );
  return useMemo(() => ({ value, set }), [value, set]);
}
