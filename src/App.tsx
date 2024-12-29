import { AppRoutes } from "./routes/App.routes";
import { Toaster } from "@/components/ui/toaster";
function App() {
	return (
		<>
			<AppRoutes />
			<Toaster />
		</>
	);
}

export default App;
