import { getQueryClient } from "@/helpers/get-query-client";

import { getAllPersons } from "@/api/Person";

import { Users } from "./Users";

import { dehydrate,Hydrate } from "@tanstack/react-query";

async function User() {

    const queryClient = getQueryClient();
    await  queryClient.prefetchQuery(['persons'], () => getAllPersons());
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <Users/>
        </Hydrate>
    );
}
export default User
