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
    }),
  }),
});

export const { useAddSkillMutation } = authApi;
