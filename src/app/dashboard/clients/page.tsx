import { getQueryClient } from "@/helpers/get-query-client";

import { getAllPersons } from "@/api/Person";

import { Persons } from "./Persons";

import { dehydrate,Hydrate } from "@tanstack/react-query";

async function Clients() {

  const queryClient = getQueryClient();
  await  queryClient.prefetchQuery(['persons'], () => getAllPersons());
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Persons/>
    </Hydrate>
  );
}

export default Clients