import { FormControl } from "@/types";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";

type CommonFormProps<T extends Record<string, any>> = {
  formControls: FormControl[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (e: React.FormEvent) => void;
  buttonText?: string;
};

function CommonForm<T extends Record<string, any>>({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}: CommonFormProps<T>) {
  function renderInputsByComponentType(getControlItem: FormControl) {
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length
                ? getControlItem.options.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                      {option.text}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            placeholder={getControlItem.placeholder}
            name={getControlItem.name}
            id={getControlItem.id + ""}
            className="w-full rounded-md border-2 border-input p-2"
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
      default:
        return (
          <p>Unsupported component type: {getControlItem.componentType}</p>
        );
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((getControlItem) => (
          <div
            key={getControlItem.name}
            className="text-left grid w-full gap-1.5"
          >
            <Label className="mb-1">{getControlItem.label}</Label>
            {renderInputsByComponentType(getControlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
