import { useGetAllBlogsQuery } from "../../../redux/features/blog/blogApi";
import { TBlog } from "../../../types/blogType";
import LoadingCard from "../loader/LoadingCard";
import AddBlogModal from "./AddBlogModal";
import BlogCard from "./BlogCard";

const BlogContainer = () => {
  const { data, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs = data?.data;
  return (
    <div>
      <AddBlogModal />
      {isLoading ? (
        <LoadingCard></LoadingCard>
      ) : blogs?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ">
          {blogs?.map((blog: TBlog, index: number) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      ) : (
        <h1 className="mt-12 text-center text-2xl">There is no blog</h1>
      )}
    </div>
  );
};

export default BlogContainer;
