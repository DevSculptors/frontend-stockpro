'use client'
import Link from 'next/link'
import { Input } from '@/components/UI/Input';
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
  username: string,
  password: string,
};

function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Input
      type="text"
      placeholder="Username"
      {...register("username", { required: true })}
    />
    <Input
      type="password"
      placeholder="Password"
      {...register("password", { required: true })}

    />
    <button 
    type='submit'
    className="bg-sky-500 text-white px-4 py-2 rounded-md my-2 w-full"
    >
      Ingresar
    </button>
  </form>
  )
}

export default LoginForm