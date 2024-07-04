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
    deleteSkill: builder.mutation({
      query: () => {
        return {
          url: "skills",
          method: "DELETE",
        };
      },
      invalidatesTags: ["skill"],
    }),
  }),
});

export const {
  useAddSkillMutation,
  useGetAllSkillQuery,
  useDeleteSkillMutation,
} = authApi;
