'use client'
import { Form } from "@/components/Form"

function Test() {

  const handleSubmit = (formData: any) => {
    console.log(formData);
    
  }
  return (
    <>
    <Form
    onSubmit={handleSubmit}
    title="Test"
    description="Test seda"
    >
      <div className='my-[10px] flex flex-col gap-4'>
        <Form.Input 
        label="Nombre"
        name="name"
        placeholder="Ingresa tu nombre..."
        />

        </div>  
    </Form>
    </>
  )
}

export default Test