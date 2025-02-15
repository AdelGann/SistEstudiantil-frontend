import { InputField } from "@/components/custom/InputField/InputField";
import { ModalProps } from "@/interfaces";
import { CreateRepresentativeProps, ResponseData } from "../Representative";
import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ValidationSchema = Yup.object({
  CI: Yup.string().min(8).required("Cedula de Identidad Requerida"),
  names: Yup.string().required("Nombres Requeridos"),
  lastnames: Yup.string().required("Apellidos Requeridos"),
  email: Yup.string().email().required("Correo Requerido"),
  phone: Yup.string()
    .matches(
      /^\+58 (414|424|426|412|416) \d{3} \d{4}$/,
      "Número de Telefono debe ser un número venezolano válido, ejemplo: +58 424 757 5882",
    )
    .required("Número de Telefono Requerido"),
});

export const Modal = ({
  InitialData,
  postFetchData,
  updateFetchData,
  onClose,
}: ModalProps<CreateRepresentativeProps, ResponseData>) => {
  const { toast } = useToast();

  const { values, handleSubmit, handleChange, setFieldValue, setValues } =
    useFormik({
      initialValues: { CI: "", names: "", lastnames: "", email: "", phone: "" },
      onSubmit: async () => {
        if (!InitialData) {
          if (typeof postFetchData === "function") {
            await postFetchData({
              data: values,
            });
          } else {
            console.error("postFetchData is not a function");
          }
        } else {
          if (typeof updateFetchData === "function") {
            await updateFetchData({ ids: [InitialData.ID], data: values });
          } else {
            console.error("updateFetchData is not a function");
          }
        }
        if (onClose) onClose();
      },
      validationSchema: ValidationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      validate: (values) => {
        const errors = {};
        try {
          ValidationSchema.validateSync(values, { abortEarly: false });
        } catch (validationErrors) {
          (validationErrors as Yup.ValidationError).inner.forEach(
            (error: Yup.ValidationError) => {
              (errors as Record<string, string>)[error.path!] = error.message;
            },
          );
          showErrorToast(errors);
        }
        return errors;
      },
    });
  useEffect(() => {
    if (InitialData !== null && InitialData !== undefined) {
      setValues(InitialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [InitialData]);
  const showErrorToast = (errors: { [key: string]: string }) => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      toast({
        title: "Error",
        description: errors[firstErrorKey],
        variant: "destructive",
      });
    }
  };

  const phoneFormat = (key: string, value: string) => {
    const cleanedValue = value.replace(/\D/g, ""); // Elimina todos los caracteres no numéricos
    const countryCode = "58"; // Código de país fijo para Venezuela

    let formattedValue = `+${countryCode} `;

    if (cleanedValue.length > 2) {
      formattedValue += cleanedValue.substring(2, 5) + " ";
    } else if (cleanedValue.length <= 2) {
      formattedValue = `+${countryCode}`;
    }

    if (cleanedValue.length > 5) {
      formattedValue += cleanedValue.substring(5, 8) + " ";
    }

    if (cleanedValue.length > 8) {
      formattedValue += cleanedValue.substring(8, 12);
    }

    setFieldValue(key, formattedValue);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputField
          label="CI:"
          name="CI"
          value={values.CI}
          onChange={handleChange}
        />
        <InputField
          label="Nombres:"
          name="names"
          value={values.names}
          onChange={handleChange}
        />
        <InputField
          label="Apellidos:"
          name="lastnames"
          value={values.lastnames}
          onChange={handleChange}
        />
        <InputField
          label="Email:"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <InputField
          label="Número de Telefono:"
          name="phone"
          value={values.phone}
          onChange={(e) => {
            console.log(values.phone);
            phoneFormat("phone", e.target.value);
          }}
        />
        <DialogFooter className="pt-5">
<<<<<<< HEAD
          <DialogClose>
            <Button type="button">Cerrar</Button>
          </DialogClose>
=======
          <DialogClose>Cerrar</DialogClose>
>>>>>>> 318badf (fix: dialog state)

          <Button type="submit">Aceptar</Button>
        </DialogFooter>
      </form>
    </>
  );
};
