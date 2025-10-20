import { FormInput } from "@/types/utils";
import style from "./TextInput.module.scss";
import {useFormInputHook} from "@/stores/formStore";
import React from "react";

type Props = {
  formInput: FormInput,
};

export default function TextInputComponent({ formInput }: Props) {
  const { value, set } = useFormInputHook(formInput.name);

  return (
    <div className={style.inputContainer}>
      <span className={style.inputLabel}>
        {formInput.label}
        <span id={style.required}>{formInput.required ? "*" : ""}</span>
      </span>

      <input
        className={style.textInput}
        name={formInput.name}
        type={formInput.type}
        placeholder={formInput.label}
        value={String(value ?? "")}
        onChange={(e) => set(e.target.value)}
      />

      {formInput.error && (
        <p className={style.formInputError}>
          &nbsp;&nbsp;&nbsp;{" *** "}{formInput.errorMessage}{" *** "}
        </p>
      )}
    </div>
  );
}