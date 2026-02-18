// import { baseApi } from "../../api/baseApi";

// const projectApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     addProject: builder.mutation({
//       query: (data) => {
//         return {
//           url: "projects",
//           method: "POST",
//           body: data,
//         };
//       },
//       invalidatesTags: ["project"],
//     }),
//     getAllProject: builder.query({
//       query: () => ({
//         url: "projects",
//         method: "GET",
//       }),
//       providesTags: ["project"],
//     }),
//     deleteProject: builder.mutation({
//       query: (id) => ({
//         url: `projects/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["project"],
//     }),
//   }),
// });

// export const {
//   useAddProjectMutation,
//   useGetAllProjectQuery,
//   useDeleteProjectMutation,
// } = projectApi;

import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (data) => ({
        url: "projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    getAllProject: builder.query({
      query: () => ({
        url: "projects",
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    // Added: Get Single Project
    getSingleProject: builder.query({
      query: (id) => ({
        url: `projects/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "project", id }],
    }),
    // Added: Update Project
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["project"],
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
  useGetSingleProjectQuery, // Exported
  useUpdateProjectMutation, // Exported
} = projectApi;
