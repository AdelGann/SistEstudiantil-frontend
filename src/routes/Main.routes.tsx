import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { NavBar } from "@/components/layouts/Navbar/Navbar";
import { Admin_NavData } from "@/data/routes/data";
import { SideBar } from "@/components/layouts/Sidebar/Sidebar";
import { StudentsRoute } from "./Students.routes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const MainRoutes = () => {
	return (
		<div className="">
			<div className="hidden xl:block">
				<NavBar data={Admin_NavData} />
			</div>
			<div className="w-full h-[60px] bg-white xl:hidden">
				<SidebarProvider>
					<SideBar data={Admin_NavData} />
					<div className="flex gap-5 px-6 w-full h-[60px] items-center">
						<SidebarTrigger />
					</div>
				</SidebarProvider>
			</div>
			<Routes>
				<>
					<Route path="/inicio" element={<Home />} />
					<Route path="/students" element={<StudentsRoute />} />
					<Route path="/*" element={<Navigate to="/inicio" />} />
				</>
			</Routes>
		</div>
	);
};
