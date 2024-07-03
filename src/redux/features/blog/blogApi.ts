import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (data) => {
        return {
          url: "blogs",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useAddBlogMutation } = blogApi;
