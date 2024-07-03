import { baseApi } from "../../api/baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSkill: builder.mutation({
      query: (data) => {
        return {
          url: "skills",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["skill"],
    }),
    getAllSkill: builder.query({
      query: () => {
        return {
          url: "skills",
          method: "GET",
        };
      },
      providesTags: ["skill"],
    }),
  }),
});

export const { useAddSkillMutation, useGetAllSkillQuery } = authApi;
