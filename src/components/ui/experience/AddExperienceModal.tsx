import { useState } from "react";
import { Button, Modal } from "antd";
import PForm from "../../form/PFrom";
import { FieldValues } from "react-hook-form";
import PInput from "../../form/PInput";

import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiError } from "../../../types/responseType";
import { useCreateExperienceMutation } from "../../../redux/features/experience/experienceApi";
import PDatePicker from "../../form/PDatePicker";

const AddExperienceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createExperience, { isLoading }] = useCreateExperienceMutation();
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
  const handleAddExperience = async (values: FieldValues) => {
    try {
      const res = await createExperience(values);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Experience added successfully");
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
        Add New Skill
      </Button>
      <Modal
        title="Add Experience"
        open={isModalOpen}
        onOk={handleOk}
        footer={""}
        onCancel={handleCancel}
      >
        <div className="w-full flex items-center">
          <div>
            <PForm onSubmit={handleAddExperience}>
              <PInput
                type={"text"}
                name={"companyName"}
                label={"Company Name"}
              />
              <PInput
                type={"text"}
                name={"designation"}
                label={"Designation"}
              />
              <PDatePicker name="startDate" label="Select Start Date" />
              <PDatePicker
                name="endDate"
                label="Select End Date (If currently working ignore it)"
              />

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

export default AddExperienceModal;
