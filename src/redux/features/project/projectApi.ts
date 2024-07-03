import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => {
        return {
          url: "projects",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["project"],
    }),
    getAllProject: builder.query({
      query: () => ({
        url: "projects",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddProjectMutation, useGetAllProjectQuery } = projectApi;
