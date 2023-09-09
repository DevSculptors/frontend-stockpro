import axios from "./config";

import { Person, CreatePerson } from "@/interfaces/Person";
import Cookies from "js-cookie";


export const getAllPersons = async () => {
  
  const response = await axios.get<Person[]>("/person",{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

