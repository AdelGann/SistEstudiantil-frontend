"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { PopoverComponent } from "../../custom/PopoverComponent/PopoverComponent";

import { ListItem } from "../../custom/ListItem/ListItem";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { ProgramTitle } from "@/components/custom/title/ProgramTitle";

interface NavItem {
	title: string;
	href?: string;
	width?: string;
	description?: string;
	children?: NavItem[];
}
interface NavBarProps {
	data: NavItem[];
}
export const NavBar = ({ data }: NavBarProps) => {
	const { logout } = useAuthStore();
	const navigate = useNavigate();
	return (
		<div className="flex flex-col md:flex-row p-5 bg-white justify-between items-center md:items-start">
			<div className="flex flex-col md:flex-row gap-5 px-4 md:px-12 items-center">
				<ProgramTitle />
				<NavigationMenu className="w-full md:w-auto md:pl-12">
					<NavigationMenuList className="flex flex-col md:flex-row gap-2 md:gap-5">
						{data.map((item, key) =>
							!item.children ? (
								<NavigationMenuItem key={key}>
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
										onClick={() => {
											if (item.href) {
												navigate(item.href);
											}
										}}
									>
										{item.title}
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : (
								<NavigationMenuItem key={key}>
									<PopoverComponent
										trigger={<div>{item.title}</div>}
										className={`w-[${item.width}px]`}
									>
										<ul className={`w-full gap-3 p-2`}>
											{item.children.map((subcontent, key) => (
												<ListItem
													key={key}
													title={subcontent.title}
													href={subcontent.href}
													description={subcontent?.description}
												/>
											))}
										</ul>
									</PopoverComponent>
								</NavigationMenuItem>
							)
						)}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<NavigationMenu className="w-full md:w-auto px-4 md:px-12 mt-4 md:mt-0">
				<NavigationMenuList className="flex justify-center md:justify-end">
					<NavigationMenuItem>
						<PopoverComponent
							trigger={
								<div className="flex gap-2 items-center">
									<p>Adel Gannem</p>
									<Avatar>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</div>
							}
							className={"w-[180px] mx-5"}
						>
							<ul className="p-3">
								<ListItem title={"Perfil"} href={"/profile"} type="button" />
								<ListItem title="Cerrar Sesión" onClick={() => logout()} type="button" />
							</ul>
						</PopoverComponent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};
