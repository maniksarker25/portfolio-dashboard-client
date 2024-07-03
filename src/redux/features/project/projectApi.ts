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
    }),
  }),
});

export const { useAddProjectMutation } = projectApi;
