export type InputType = 'text' | 'password' | 'email' | 'number';
export type CrudType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';

export type FormInput = {
  name: string;
  label: string;
  type: InputType;
  description?: string;
  value: FormInputValue
  required?: boolean,
  error: boolean,
  errorMessage: string,
  checkErrors: Record<string, { criteria: string; message: string }>
}

export type FormInputValue = string | number | readonly string[] | undefined;

export type Button = {
  name: string;
  label: string;
  color?: string;
  hoveringColor?: string;
  function: string;
  route?: string;
  crudType?: CrudType,
  keyDown?: string
}

export type ButtonAction = (args: {
  button: Button;
  navigate: (href: string) => void;
}) => void | Promise<void>;