'use client'

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hook/useAuthFetch";
import { useLoading } from "@/hook/useLoading";

export default function ForgetPasswordPage() {

  const { finishLoading, isLoading, startLoading } = useLoading();
  const { authRouter } = useAuthFetch();

  const forgetPasswordSubmit = async (formData: any) => {
    startLoading();
    await authRouter({
      endpoint: "forget-password",
      formData,
      redirectRoute: "/login",
    });
    finishLoading();
  }

  return (
    <>
      <Form
        onSubmit={forgetPasswordSubmit}
        title="Recuperar contraseña"
        description="Ingresa tu correo electrónico para recuperar tu contraseña"
      >
      <div className='my-[10px] flex flex-col gap-4'>
        <Form.Input 
        label="Correo electrónico"
        name="email"
        placeholder="Ingresa tu correo electrónico..."
        />
      </div>
      <Form.SubmitButton
          buttonText='Recuperar Contraseña'
          isLoading={isLoading}
        />
        <Form.Footer
          description='Volver al inicio'
          textLink='Inicio'
          link='/'
        />
      </Form>
    </>
  );
}