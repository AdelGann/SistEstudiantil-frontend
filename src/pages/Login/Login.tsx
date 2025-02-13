import { InputField } from "@/components/custom/InputField/InputField";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/store/useAuthStore";
export const Login = () => {
  const { toast } = useToast();
  const { login } = useAuthStore();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { user: "", password: "" },
    onSubmit: () => {
      login("dummy__token");
    },
    validationSchema: Yup.object({
      user: Yup.string().required("Usuario Requerido"),
      password: Yup.string().required("Contraseña Requerida"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => {
      const errors = {};
      try {
        Yup.object({
          user: Yup.string().required("Usuario Requerido"),
          password: Yup.string().required("Contraseña Requerida"),
        }).validateSync(values, { abortEarly: false });
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

  return (
    <div className="flex flex-col justify-between sm:flex-row bg-white w-full h-[100vh]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col py-10 mx-auto justify-center self-center align-center xl:w-[405px] h-full"
      >
        <h1 className="tracking-[12px] text-2xl stroke-black text-center">
          INICIAR SESIÓN
        </h1>
        <div className="flex flex-col gap-5 pt-6">
          <InputField
            label="Usuario"
            className="xl:w-[405px] h-[40px] text-[#71717A]"
            name="user"
            value={values.user}
            onChange={handleChange}
          />
          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="xl:w-[405px] h-[40px] text-[#71717A]"
          />
        </div>
        <div className="flex justify-end pt-10">
          <Button type="button" variant={"ghost"}>
            Crear Cuenta
          </Button>
          <Button type="submit">
            Iniciar Sesión
            <ChevronRight />
          </Button>
        </div>
      </form>

      <div className="px-4 hidden xl:block sm:px-16 gap-5 bg-[url('/login/login.svg')] w-[951px] bg-no-repeat bg-cover bg-blend-multiply min-h-screen min-h-screen-100% shadow-md"></div>
    </div>
  );
};
