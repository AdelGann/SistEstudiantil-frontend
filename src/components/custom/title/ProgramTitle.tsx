import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ProgramTitle = () => {
	return (
		<div className="flex gap-3 items-center">
			<Avatar>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<h1 className="font-semibold text-lg text-center md:text-left">U.E Colegio Aplicación</h1>
		</div>
	);
};
