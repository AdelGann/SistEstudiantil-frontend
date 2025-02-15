import { useEffect, useState } from "react";
import { Modal } from "./Modal/Modal";

import { useModal } from "@/hooks/useModal";
import { useGetFetch } from "@/hooks/getFetchData/useGetFetch";
import { usePostFetch } from "@/hooks/postFetchData/usePostFetch";
import { useUpdateFetch } from "@/hooks/updateFetchData/updateFetchData";

import { Datatable } from "@/components/custom/Datatable/Datatable";
import { DialogComponent } from "@/components/custom/Dialog/Dialog";
import { DropdownComponent } from "@/components/custom/Dropdown/DropdownComponent";

export interface ResponseData {
  ID: string;
  CI: string;
  names: string;
  lastnames: string;
  email: string;
  phone: string;
  createdAt: string;
}
export interface CreateRepresentativeProps {
  CI: string;
  names: string;
  lastnames: string;
  email: string;
  phone: string;
}
export const Representative = () => {
  const modal = useModal();

  const [data, setData] = useState<ResponseData | null>(null);

  const getFetchData = useGetFetch<ResponseData>("/v1/representative");
  const postFetchData = usePostFetch("/v1/representative/create", {
    reloadFetchData: getFetchData.reloadFetchData,
    title: "Representantes",
    description: "¡Registro creado exitosamente!",
  });

  const updateFetchData = useUpdateFetch("/v1/representative/update", {
    reloadFetchData: getFetchData.reloadFetchData,
    title: "Representantes",
    description: "¡Registro actualizado exitosamente!",
  });

  useEffect(() => {
    if (!modal.modalState) {
      setData(null);
    }
  }, [modal.modalState]);

  console.log(modal.modalState);
  const items = (rowData: ResponseData) => {
    return [
      {
        label: "Editar",
        onClick: () => {
          setData(rowData);
          modal.changeModalState();
        },
      },
    ];
  };

  return (
    <div className="p-5">
      <div className="m-5 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Representantes</h1>
        <p></p>

        <div className="w-[100px]">
          <DialogComponent
            open={modal.modalState}
            onOpenChange={modal.changeModalState}
            DialogTitle="Agregar Representante"
            DialogTrigger="Crear"
            onClick={() => setData(null)}
            Children={
              <Modal
                postFetchData={
                  postFetchData.Post<CreateRepresentativeProps, ResponseData>
                }
                updateFetchData={updateFetchData.Update}
                InitialData={data}
                onClose={modal.changeModalState}
              />
            }
          />
        </div>
        <hr />
      </div>

      <Datatable columns={columns} data={getFetchData?.data || []} />

      <Datatable
        columns={columns}
        data={getFetchData?.data || []}
        Render={(rowData: ResponseData, rowIndex) => (
          <div className="">
            <DropdownComponent key={rowIndex} items={() => items(rowData)} />
          </div>
        )}
      />
    </div>
  );
};
const columns = [
  { Header: "CI", Field: "CI" },
  { Header: "Nombres", Field: "names" },
  { Header: "Apellidos", Field: "lastnames" },
  { Header: "Correo electronico", Field: "email" },
  { Header: "Número de telefono", Field: "phone" },
  { Header: "Fecha de registro", Field: "createdAt" },
];
