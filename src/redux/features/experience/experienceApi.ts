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
  }),
});

export const { useCreateExperienceMutation, useGetAllExperienceQuery } =
  experienceApi;
