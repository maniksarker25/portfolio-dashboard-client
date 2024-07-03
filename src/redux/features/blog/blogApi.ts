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
      invalidatesTags: ["blogs"],
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "blogs",
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
  }),
});

export const { useAddBlogMutation, useGetAllBlogsQuery } = blogApi;
