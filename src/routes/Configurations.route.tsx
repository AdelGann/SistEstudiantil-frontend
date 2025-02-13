import { Navigate, Route, Routes } from "react-router-dom";
import { Representative } from "@/pages/configurations/RepresentativePage/Representative";
export const ConfigurationsRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/representative" element={<Representative />} />
        <Route path="/*" element={<Navigate to="/inicio" />} />
      </Routes>
    </div>
  );
};
