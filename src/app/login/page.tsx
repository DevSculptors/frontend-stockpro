'use client'
import { Form } from "@/components/Form"
import { useAuthFetch } from "@/hook/useAuthFetch"
import { useLoading } from "@/hook/useLoading"
import { getLogin } from "@/api/Test"

function LoginPage() {

  const {finishLoading,isLoading,startLoading}= useLoading()
  
  const {authRouter} = useAuthFetch()

  const loginSubmit = async (formData: any) => {
    startLoading()
    await authRouter({
      endpoint: "login",
      formData,
      redirectRoute: "/dashboard",
    });

    finishLoading()

  }

  return (
   <>
   <Form
    onSubmit={loginSubmit}
    title="Iniciar sesión"
    description="Ingresa tus datos para iniciar sesión"
   >
    <div className='my-[10px] flex flex-col gap-4'>
      <Form.Input
        name="email"
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico..."
      />
      <Form.Input
            placeholder='Ingresa tu contraseña...'
            label='Contraseña'
            name='password'
            type='password'
          />
    </div>
    <Form.SubmitButton 
    buttonText="Iniciar sesión"
    isLoading={isLoading}
    />
    <Form.Footer 
    description="Te olvidaste de tu contraseña?"
    link="/login/forget-password"
    textLink="Recupérala"
    />
   </Form>
   </>
  )
}

export default LoginPage