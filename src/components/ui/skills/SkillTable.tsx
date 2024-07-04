import { Button } from "antd";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { useDeleteSkillMutation } from "../../../redux/features/skill/skillApi";

type TSkill = {
  _id: string;
  image: string;
  title: string;
  category: string;
};

const SkillTable = ({ data }: { data: TSkill[] }) => {
  const [deleteSkill] = useDeleteSkillMutation();
  const handleDeleteSkill = async (id: string) => {
    try {
      const res = await deleteSkill(id);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Skill deleted successfully");
      } else if (res?.error) {
        if ("data" in res.error) {
          // Type assertion to access error data safely
          const errorData = (res.error as FetchBaseQueryError).data as {
            message?: string;
          };
          toast.error(errorData?.message || "Something went wrong");
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="min-w-full w-11/12 bg-white  overflow-scroll mt-6">
      {" "}
      <table className="min-w-full w-11/12 bg-white border border-gray-300 overflow-scroll">
        <thead>
          <tr>
            <th className="py-2 px-1 border-b">Image</th>
            <th className="py-2 px-1 border-b">Title</th>
            <th className="py-2 px-1 border-b">Category</th>
            <th className="py-2 px-1 border-b">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((item, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                <img src={item?.image} className="w-12 h-12 rounded m-3" />
              </td>
              <td className="py-2 px-4 border-b">{item?.title}</td>
              <td className="py-2 px-4 border-b">{item?.category}</td>
              <td className="py-2 px-4 border-b">
                <Button onClick={() => handleDeleteSkill(item?._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillTable;
