'use client'
import {Form} from "@/components/Form";
function Test() {
    const onSubmit = (values) => {
        console.log(values)
    }
    return (
        <Form
            title="Añadir Usuario"
            onSubmit={onSubmit}
        ><div className='my-[10px] flex flex-col gap-4'>
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

export default Test