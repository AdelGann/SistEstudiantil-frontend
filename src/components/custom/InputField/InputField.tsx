import { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function InputField({ label, className, ...props }: InputFieldProps) {
    return (
			<div>
				<Label className="text-[#71717A]">{label}</Label>
				<Input className={`${className} hover:bg-gray-100`} {...props} />
			</div>
		);
}
