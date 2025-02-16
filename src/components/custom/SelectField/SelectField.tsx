import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Importa el componente Label
import { SelectProps } from "@radix-ui/react-select";

interface SelectFieldProps extends SelectProps {
  options: { value: string; name: string }[] | [];
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  options,
  placeholder,
  className,
  disabled = false,
  name,
  value,
  onChange,
  label,
  ...rest
}) => {
  return (
    <div>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Select
        disabled={disabled}
        value={value}
        onValueChange={onChange}
        name={name}
        {...rest}
      >
        <SelectTrigger
          className={`${className}  hover:bg-gray-100`}
          disabled={disabled}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
