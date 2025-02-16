import { DiaryComponent } from "@/components/custom/DiaryComponent/DiaryComponent";

export const Home = () => {
  return (
    <div className="p-5">
      <div className="m-5">
        <h1 className="text-2xl font-semibold">¡Bienvienido de vuelta Adel!</h1>
        <p></p>
      </div>
      <DiaryComponent data={data} />
    </div>
  );
};
const data = {
  "7:00 am": {
    Lunes: "Actividad 1",
    Martes: "Actividad 2",
    Miercoles: "Actividad 3",
    Jueves: "Actividad 4",
    Viernes: "Actividad 5",
  },
  "13:00 pm": {
    Lunes: "Actividad 6",
    Martes: "Actividad 7",
    Miercoles: "Actividad 8",
    Jueves: "Actividad 9",
    Viernes: "Actividad 10",
  },
};
