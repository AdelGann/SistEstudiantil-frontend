import React from "react";
import { cn } from "@/lib/utils";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

export const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a"> & { title: string; description?: string | undefined }
>(({ className, title, description, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<div className="text-sm font-light text-neutral-400">{description}</div>
				</a>
			</NavigationMenuLink>
		</li>
	);
});

ListItem.displayName = "ListItem";
