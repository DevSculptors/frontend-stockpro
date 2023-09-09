'use client'
import {Form} from "@/components/Form";
function User() {
    const onSubmit = (values:any) => {
        console.log(values)
    }
    return (
        <Form
            title="Añadir Usuario"
            onSubmit={onSubmit}
        ><div className='my-[10px] grid grid-cols-2 gap-4'>
            <Form.ListBox
                name="typeDoc"
                label="Tipo de documento"
                placeholder="Selecciona tu tipo de documento"
                options={[
                    { value: 'CC', label: 'Cédula de Ciudadanía' },
                    { value: 'CE', label: 'Cédula de Extranjería' },
                    { value: 'TI', label: 'Tarjeta de Identidad' }
                ]}
            />
            <Form.Input
                name="document"
                label="Número de documento"
                placeholder="Ingresa tu número de documento"
            />
            <Form.Input
                name="name"
                label="Nombre"
                placeholder="Ingresa tu nombre"
            />
            <Form.Input
                name="lastName"
                label="Apellido"
                placeholder="Ingresa tu apellido"
            />
            <Form.Input
                name="cellphone"
                label="Número de celular"
                placeholder="Ingresa tu número de celular"
            />
            <Form.Input
                name="email"
                label="Correo electrónico"
                placeholder="Ingresa tu correo electrónico"
            />
            <Form.Input
                name="user"
                label="Usuarior"
                placeholder="Ingresa tu usuario"
            />
            <Form.Input
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
            />
            <Form.CancelButton
                buttonText="Cancelar"
            />
            <Form.SubmitButton
                buttonText="Aceptar"
            />
        </div>
        </Form>
    )
}

export default User
