import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../utility/supabaseClient";

const supabaseApi = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ["accounts"],
  endpoints: (builder) => ({
    getJokes: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("accounts")
          .select('*')

        if (error) {
          throw { error };
        }

        return { data };
      },
    providesTags: ["accounts"],
    }),
  }),
});

export const { useGetJokesQuery} = supabaseApi;
export { supabaseApi };
