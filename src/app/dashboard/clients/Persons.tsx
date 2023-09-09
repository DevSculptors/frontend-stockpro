'use client'
import { Person } from "@/interfaces/Person";

import { usePerson } from "@/context/PersonContext";

export function Persons() {
  
  const { persons } = usePerson();  

  console.log(persons);
  
  
  return (
    <>
      <h1>Persons</h1>
      {
        persons?.map((person:Person) => {
          return (
            <div key={person.id}>
              {/* <p>{person.id}</p> */}
              <p>{person.name}</p>
              {/* <p>{person.last_name}</p>
              <p>{person.id_document}</p>
              <p>{person.type_document}</p>
              <p>{person.phone}</p> */}
            </div>
          )
        }
        )
      }

    </>
  );
}
