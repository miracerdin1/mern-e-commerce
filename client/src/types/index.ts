export interface FormControl<T extends string = string> {
  name: T;
  label: string;
  placeholder?: string;
  type?:
    | "email"
    | "text"
    | "password"
    | "number"
    | "date"
    | "textarea"
    | "file"
    | "select";
  componentType: "input" | "textarea" | "select";
  id?: number;
  options?: SelectOption[];
}

export interface EntityModel<Id = any> {
  id?: Id;
  state?: number;
}

export interface SelectOption extends EntityModel {
  text: string;
  value: string;
  label?: string;
}

export interface BaseFormElement {
  name: string;
  label: string;
  placeholder?: string;
}

export interface FormElement extends BaseFormElement {
  componentType: "select" | "input";
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "date"
    | "file";
  options?: SelectOption[];
}

export type AddProductFormElement = FormElement;
