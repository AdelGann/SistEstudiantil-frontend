import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "@/pages/Login/Login";
import { useEffect } from "react";
import { MainRoutes } from "./Main.routes";
import useAuthStore from "@/store/useAuthStore";

export const AppRoutes = () => {
  const { token, login, logout } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("rt__SistEstudiantil");
    if (storedToken) {
      login(storedToken);
    } else {
      logout();
    }
  }, [login, logout]);
  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            {/* Ruta pública de Login */}
            <Route path="/login" element={<Login />} />

            {/* Si el usuario intenta acceder a una ruta no autorizada, se redirige a Login */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* Si el usuario está autenticado e intenta acceder al login, redirigir al home */}
            <Route path="/login" element={<Navigate to="/" />} />
            {/* Rutas protegidas, solo accesibles si el usuario está autenticado */}
            <Route path="/*" element={<MainRoutes />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
