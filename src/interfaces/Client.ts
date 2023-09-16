export interface Client {
  id: string;
  id_document: string;
  type_document: any;
  name: string;
  last_name: string;
  phone: string;
}

//Persona sin ID, para crear
export type UpdateClient = Omit<Client, "id">;

//Persona sin ID, para actualizar
// export type UpdatePerson = Partial<CreateClient>;

export interface RequestClient {
  userFound: {
    id: string;
    id_document: string;
    type_document: any;
    name: string;
    last_name: string;
    phone: string;
  }
  token: string;
}

export const documentTypes = [
  {
    value: 'CC',
    label: 'Cedula de Ciudadania',
  },
  {
    value: 'PP',
    label: 'Pasaporte',
  },
  {
    value: 'CE',
    label: 'Cedula de Extranjeria',
  },
  {
    value: 'TI',
    label: 'Tarjeta de Identidad',
  },
  {
    value: 'NIT',
    label: 'NIT',
  }]

