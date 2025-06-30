export interface FormControl {
  name: string; // Name of the form field
  label: string; // Label displayed for the field
  placeholder?: string; // Placeholder text in the input field
  type?: "text" | "email" | "password" | string; // Input type (restricted to valid HTML input types)
  componentType: "input" | "textarea" | "select"; // Component type
  id?: number;
  options?: { value: string; label: string }[];
}
