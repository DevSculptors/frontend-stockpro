export interface Client {
  id: number;
  id_document: string;
  type_document: any;
  name: string;
  last_name: string;
  phone: string;
}

//Persona sin ID, para crear
export type CreateClient = Omit<Client, "id">;

//Persona sin ID, para actualizar
export type UpdatePerson = Partial<CreateClient>;