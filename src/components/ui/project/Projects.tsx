/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // swiper
// // import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

// // import "./styles.css";

// // import required modules
// import { Pagination } from "swiper/modules";
// import { Link } from "react-router-dom";
// import { Button } from "antd";
// import { useDeleteProjectMutation } from "../../../redux/features/project/projectApi";
// import toast from "react-hot-toast";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { TProject } from "../../../types/projectType";
// const Projects = ({ projects }: { projects: TProject[] }) => {
//   const pagination = {
//     clickable: true,
//     renderBullet: function (index: number, className: any) {
//       return '<span class="' + className + '">' + (index + 1) + "</span>";
//     },
//   };
//   const [deleteProject] = useDeleteProjectMutation();
//   const handleDeleteProject = async (id: string) => {
//     try {
//       const res = await deleteProject(id);
//       console.log(res);
//       if (res?.data?.success) {
//         toast.success("Project deleted successfully");
//       } else if (res?.error) {
//         if ("data" in res.error) {
//           // Type assertion to access error data safely
//           const errorData = (res.error as FetchBaseQueryError).data as {
//             message?: string;
//           };
//           toast.error(errorData?.message || "Something went wrong");
//         } else {
//           toast.error("An unknown error occurred");
//         }
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <div>
//       {projects?.map((project: any, index: number) => (
//         <div key={index}>
//           <div className="flex justify-between items-center">
//             <h3
//               data-aos="fade-up"
//               data-aos-delay="400"
//               data-aos-offset="100"
//               data-aos-duration="1000"
//               className="text-3xl mb-4"
//             >
//               {project?.title}{" "}
//               <span className="text-2xl">({project?.shortDescription})</span>
//             </h3>
//             <Button
//               onClick={() => handleDeleteProject(project?._id)}
//               style={{
//                 backgroundColor: "red",
//                 color: "white",
//               }}
//             >
//               Delete
//             </Button>
//           </div>
//           <Swiper
//             data-aos="fade-up"
//             data-aos-delay="400"
//             data-aos-offset="100"
//             data-aos-duration="1000"
//             pagination={pagination}
//             modules={[Pagination]}
//             className="mySwiper"
//           >
//             {project?.images?.map((image: string) => (
//               <SwiperSlide>
//                 <img className="md:h-80 w-full" src={image} alt="" />
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <div
//             data-aos="fade-right"
//             data-aos-delay="400"
//             data-aos-offset="100"
//             data-aos-duration="1000"
//             className=" space-x-4 my-4 underline"
//           >
//             <Link to={`${project?.liveLink}`}>Live Site</Link>
//             <Link to={`${project?.backEndRepo}`}>Server Side Code</Link>
//             <Link to={`${project?.frontEndRepo}`}>Client Side Code</Link>
//           </div>
//           <h4
//             data-aos="fade-right"
//             data-aos-delay="400"
//             data-aos-offset="100"
//             data-aos-duration="1000"
//           >
//             <span className="font-bold text-secondary">Technology used:</span>{" "}
//             {project?.technologyUsed}
//           </h4>
//           <div
//             data-aos="fade-right"
//             data-aos-delay="400"
//             data-aos-offset="100"
//             data-aos-duration="1000"
//           >
//             <h3 className="text-3xl font-semibold my-4">Features</h3>
//             <div className="space-y-2">
//               <p>* {project?.featureOne}</p>
//               <p>* {project?.featureTwo}</p>
//               <p>* {project?.featureThree}</p>
//               {project?.note && (
//                 <p>
//                   <span className="font-bold">note:</span>
//                   {project?.note}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Projects;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Tag, Tooltip } from "antd";
import toast from "react-hot-toast";
import { FiCode, FiEdit3, FiExternalLink, FiHash, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteProjectMutation } from "../../../redux/features/project/projectApi";
import { TProject } from "../../../types/projectType";

const Projects = ({ projects }: { projects: TProject[] }) => {
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProject = async (id: string) => {
    Swal.fire({
      title: "Delete Project?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProject(id).unwrap();
          toast.success("Project removed");
        } catch (error: any) {
          toast.error("Failed to delete project");
        }
      }
    });
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
          <p className="text-gray-500">Overview of all your portfolio works</p>
        </div>
        <Link to="/add-project">
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600 border-none h-10 px-6 rounded-lg font-semibold"
          >
            + Add Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects?.map((project: any) => (
          <Card
            key={project?._id}
            hoverable
            className="flex flex-col h-full border-gray-200 rounded-xl overflow-hidden shadow-sm relative"
            cover={
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                {/* PRIORITY BADGE ON IMAGE */}
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-gray-100 flex items-center gap-1">
                  <FiHash className="text-green-600" size={12} />
                  <span className="text-xs font-bold text-gray-700">
                    Order: {project.priority || "N/A"}
                  </span>
                </div>

                <img
                  alt={project.title}
                  src={project?.images?.[0]}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            }
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800 truncate pr-2">{project.title}</h3>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-500"
                  >
                    <FiExternalLink size={18} />
                  </a>
                </div>
                <p className="text-gray-500 text-sm mt-1 line-clamp-1 italic">
                  {project.shortDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mb-6 min-h-[50px]">
                {project.technologyUsed?.split(",").map((tech: string, i: number) => (
                  <Tag
                    key={i}
                    className="bg-gray-100 border-none text-gray-600 text-[10px] rounded-md"
                  >
                    {tech.trim()}
                  </Tag>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex gap-3">
                  <Tooltip title="Edit Project">
                    <Link to={`/edit-project/${project._id}`}>
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                        <FiEdit3 size={20} />
                      </button>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Delete Project">
                    <button
                      onClick={() => handleDeleteProject(project._id as string)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </Tooltip>
                </div>
                <div className="flex gap-2">
                  <Tooltip title="View Source">
                    <a
                      href={project.frontEndRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-gray-800"
                    >
                      <FiCode size={18} />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
