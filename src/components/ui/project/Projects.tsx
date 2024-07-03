/* eslint-disable @typescript-eslint/no-explicit-any */
// swiper
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useDeleteProjectMutation } from "../../../redux/features/project/projectApi";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TProject } from "../../../types/projectType";
const Projects = ({ projects }: { projects: TProject[] }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  const [deleteProject] = useDeleteProjectMutation();
  const handleDeleteProject = async (id: string) => {
    try {
      const res = await deleteProject(id);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Project deleted successfully");
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
    <div>
      {projects?.map((project: any, index: number) => (
        <div key={index}>
          <div className="flex justify-between items-center">
            <h3
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-offset="100"
              data-aos-duration="1000"
              className="text-3xl mb-4"
            >
              {project?.title}{" "}
              <span className="text-2xl">({project?.shortDescription})</span>
            </h3>
            <Button
              onClick={() => handleDeleteProject(project?._id)}
              style={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete
            </Button>
          </div>
          <Swiper
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
          >
            {project?.images?.map((image: string) => (
              <SwiperSlide>
                <img className="md:h-80 w-full" src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
            className=" space-x-4 my-4 underline"
          >
            <Link to={`${project?.liveLink}`}>Live Site</Link>
            <Link to={`${project?.backEndRepo}`}>Server Side Code</Link>
            <Link to={`${project?.frontEndRepo}`}>Client Side Code</Link>
          </div>
          <h4
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
          >
            <span className="font-bold text-secondary">Technology used:</span>{" "}
            {project?.technologyUsed}
          </h4>
          <div
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
          >
            <h3 className="text-3xl font-semibold my-4">Features</h3>
            <div className="space-y-2">
              <p>* {project?.featureOne}</p>
              <p>* {project?.featureTwo}</p>
              <p>* {project?.featureThree}</p>
              {project?.note && (
                <p>
                  <span className="font-bold">note:</span>
                  {project?.note}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
