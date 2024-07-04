import { baseApi } from "../../api/baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExperience: builder.mutation({
      query: (data) => {
        return {
          url: "experiences",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["experience"],
    }),
    getAllExperience: builder.query({
      query: () => ({
        url: "experiences",
        method: "GET",
      }),
      providesTags: ["experience"],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experience"],
    }),
  }),
});

export const {
  useCreateExperienceMutation,
  useGetAllExperienceQuery,
  useDeleteExperienceMutation,
} = experienceApi;
