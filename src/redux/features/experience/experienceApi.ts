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
    }),
  }),
});

export const { useCreateExperienceMutation } = experienceApi;
