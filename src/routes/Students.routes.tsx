import { Navigate, Route, Routes } from "react-router-dom";

export const StudentsRoute = () => {
	return (
		<div>
			<Routes>
				<>
					<Route path="/" element={<>Hola</>} />

					<Route path="/*" element={<Navigate to="/inicio" />} />
				</>
			</Routes>
		</div>
	);
};
