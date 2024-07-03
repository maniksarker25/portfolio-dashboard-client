import { useState } from "react";
import { Button, Modal } from "antd";
import PForm from "../../form/PFrom";
import { FieldValues } from "react-hook-form";
import PInput from "../../form/PInput";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiError } from "../../../types/responseType";
import UploadButton from "../skills/UploadButton";
import PTextArea from "../../form/PTextArea";
import { useAddBlogMutation } from "../../../redux/features/blog/blogApi";

const AddBlogModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [addBlog, { isLoading }] = useAddBlogMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // handle skill add
  const handleAddBlog = async (values: FieldValues) => {
    console.log(values);
    try {
      const blogData = {
        image: imageUrl,
        title: values.title,
        content: values.content,
      };
      const res = await addBlog(blogData);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Blog added successfully");
        handleCancel();
      } else if (res?.error) {
        if ("data" in res.error) {
          // Type assertion to access error data safely
          const errorData = (res.error as FetchBaseQueryError).data as {
            message?: string;
          };
          toast(errorData?.message || "An unknown error occurred");
        } else {
          toast("An unknown error occurred");
        }
      }
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      toast(apiError?.data.errorMessage || "Something went wrong");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New Blog
      </Button>
      <Modal
        title="Add Skill"
        open={isModalOpen}
        onOk={handleOk}
        footer={""}
        onCancel={handleCancel}
      >
        <div className="w-full flex items-center">
          <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <div>
            <PForm onSubmit={handleAddBlog}>
              <PInput type={"text"} name={"title"} label={"Title"} />
              <PTextArea rows={5} name="content" label="Content" />
              <Button
                style={{
                  backgroundColor: "#1677FF",
                  color: "white",
                }}
                htmlType="submit"
              >
                {isLoading ? "Submitting" : "Submit"}
              </Button>
            </PForm>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddBlogModal;
