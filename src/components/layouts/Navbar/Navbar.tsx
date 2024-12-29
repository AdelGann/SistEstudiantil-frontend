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
	const navigate = useNavigate();
	return (
		<div className="flex p-5 bg-white justify-between">
			<div className="flex gap-5 px-12">
				<div className="flex gap-3 items-center">
					<Avatar>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<h1 className="font-semibold text-lg">U.E Colegio Aplicación</h1>
				</div>
				<NavigationMenu className="pl-12">
					<NavigationMenuList>
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
			<NavigationMenu className="px-12">
				<NavigationMenuList>
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
								<ListItem title={"Perfil"} href={"/profile"} />
								<ListItem title="Cerrar Sesión" onClick={() => {}} />
							</ul>
						</PopoverComponent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};
