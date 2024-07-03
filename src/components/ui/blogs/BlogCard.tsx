import { Card } from "antd";
import { TBlog } from "../../../types/blogType";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  return (
    <div className="mt-5">
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={<img className="h-80" alt="example" src={blog?.image} />}
      >
        <h1 className="text-xl font-semibold mb-3">{blog?.title}</h1>
        <p>{blog?.content}</p>
      </Card>
    </div>
  );
};

export default BlogCard;
