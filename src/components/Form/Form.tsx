"use client";
import {Button, FormInput} from "@/types/utils";
import React, {useEffect} from "react";
import TextInputComponent from "@/components/Form/input/TextInput";
import style from "./Form.module.scss";
import { useFormStore } from "@/stores/formStore";
import {useClicks} from "@/providers/clickProvider";

type Props = {
  form: FormInput[];
  formName: string ,
  buttons?: Button[]
};

export default function FormComponent({ form, formName, buttons }: Props) {
  const setCurrentForm = useFormStore((state) => state.setCurrentForm);
  const clearForm = useFormStore((state) => state.clearForm);
  const currentForm   = useFormStore((s) => s.currentForm);

  const { invoke } = useClicks();

  useEffect(() => {
    setCurrentForm(form, formName);
    return () => clearForm();
  }, [form, formName, setCurrentForm, clearForm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement> ) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (buttons !== undefined) {
      for (const button of buttons) {
        if (button.keyDown === 'Enter') {
          invoke(button);
          return;
        }
      }
    }
  }

  return (
    <form className={style.form} onKeyDown={(e) => handleKeyDown(e)}>
      {currentForm.map((fi) => (
        <TextInputComponent key={fi.name} formInput={fi} />
      ))}
    </form>
  );
}
