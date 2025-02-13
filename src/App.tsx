import { AppRoutes } from "./routes/App.routes";
import { Toaster } from "@/components/ui/toaster";
import useInterfaceStore from "./store/useInterfaceStore";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { parseJwt } from "./helpers/jwt-decoder";
import { RolesType } from "./types";

function App() {
  const { setInterface, setNull } = useInterfaceStore();
  const { token } = useAuthStore();
  useEffect(() => {
    if (token) {
      const jwtParsed: { role: RolesType; id: string } = parseJwt(token);
      setInterface(jwtParsed.role);
    } else {
      setNull();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
