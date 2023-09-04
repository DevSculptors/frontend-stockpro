'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllPersons } from "@/api/Person";
import { Person } from "@/interfaces/Person";

export function Persons() {
  const {data} = useQuery({
    queryKey: ['persons'],
    queryFn: () => getAllPersons()
  });
  
  return (
    <>
      <h1>Persons</h1>
      {
        data?.map((person:Person) => {
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
