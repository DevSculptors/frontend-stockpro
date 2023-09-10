import React, { createContext, useContext, useState, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { getAllPersons } from "@/api/Person";

import { Person } from "@/interfaces/Person";

type PersonContextType = {
  persons: Person[] | undefined;
  setPersons: React.Dispatch<React.SetStateAction<Person[] | undefined>>;
  isLoading: boolean;
};

const personContextState = {
  persons: undefined,
  setPersons: () => {},
  isLoading: false,
};

const PersonContext = createContext<PersonContextType>(personContextState);

export const usePerson = () => {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error("usePerson must be used within a PersonProvider");
  }
  return context;
};

export function PersonProvider({ children }: { children: React.ReactNode }) {

  const { data, isLoading } = useQuery({
    queryKey: ["persons"],
    queryFn: () => getAllPersons(),
  });

  const [persons, setPersons] = useState<Person[] | undefined>([]);

  const personContext = useMemo(
    () => ({
      persons: data,
      isLoading,
      setPersons: setPersons,
    }),
    [data, isLoading]
  );

  

  return (
    <PersonContext.Provider value={personContext}>
      {children}
    </PersonContext.Provider>
  );
}
