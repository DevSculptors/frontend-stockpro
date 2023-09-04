import axios from "./config";

import { Person, CreatePerson } from "@/interfaces/Person";


export const getAllPersons = async () => {
  const response = await axios.get<Person[]>("/person");
  return response.data;
}