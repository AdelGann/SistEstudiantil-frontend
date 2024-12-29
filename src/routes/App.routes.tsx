import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { NavBar } from "@/components/layouts/Navbar/Navbar";
import { Admin_NavData } from "@/data/routes/data";

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<div>
				<NavBar data={Admin_NavData} />
				<Routes>
					<>
						<Route path="/inicio" element={<Home />} />

						<Route path="/*" element={<Navigate to="/inicio" />} />
					</>
				</Routes>
			</div>
		</BrowserRouter>
	);
};
