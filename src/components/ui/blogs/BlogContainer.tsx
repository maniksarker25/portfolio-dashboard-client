import { useGetAllBlogsQuery } from "../../../redux/features/blog/blogApi";
import { TBlog } from "../../../types/blogType";
import AddBlogModal from "./AddBlogModal";
import BlogCard from "./BlogCard";

const BlogContainer = () => {
  const { data } = useGetAllBlogsQuery(undefined);
  const blogs = data?.data;
  return (
    <div>
      <AddBlogModal />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ">
        {blogs?.map((blog: TBlog, index: number) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogContainer;
