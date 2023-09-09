'use client'
import {Form} from "@/components/Form";
function AddUser() {
    const onSubmit = (values: any) => {
        console.log(values)
    }
    return (
        <Form
            title="Añadir Usuario"
            onSubmit={onSubmit}
        ><div className='my-[10px] row flex-row gap-4'>
            <Form.Input
                name="typeDoc"
                label="Tipo de documento"
                placeholder="Ingresa tu tipo de documento"
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
                name="name"
                label="Nombre"
                placeholder="Ingresa tu nombre"
            />
            <Form.Input
                name="lastName"
                label="Apellido"
                placeholder="Ingresa tu apellido"
            />
        </div>


        </Form>
    )
}

export default test