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
      providesTags: ["project"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useGetAllProjectQuery,
  useDeleteProjectMutation,
} = projectApi;
