import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

export const PopoverComponent = ({
	trigger,
	children,
	className,
	style,
}: {
	trigger: ReactNode;
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) => {
	return (
		<Popover>
			<PopoverTrigger className={cn(navigationMenuTriggerStyle())} style={style}>
				{trigger}{" "}
				<ChevronDownIcon
					className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
					aria-hidden="true"
				/>
			</PopoverTrigger>
			<PopoverContent className={className}>{children}</PopoverContent>
		</Popover>
	);
};
