/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Card, Row, Spin } from "antd";
// import { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FieldValues } from "react-hook-form";
// import toast from "react-hot-toast";
// import { FiArrowLeft, FiTrash2, FiUploadCloud } from "react-icons/fi";
// import { useNavigate, useParams } from "react-router-dom";
// import PForm from "../components/form/PFrom";
// import PInput from "../components/form/PInput";
// import PTextArea from "../components/form/PTextArea";
// import {
//   useGetSingleProjectQuery,
//   useUpdateProjectMutation,
// } from "../redux/features/project/projectApi";
// import { uploadFile } from "../utils/uploadFile";

// const EditProjectContainer = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // API Hooks
//   const { data: projectRes, isLoading: isFetching } = useGetSingleProjectQuery(id);
//   const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

//   const [projectImages, setProjectImages] = useState<string[]>([]);
//   const [uploading, setUploading] = useState(false);

//   // Sync images when data loads
//   useEffect(() => {
//     if (projectRes?.data?.images) {
//       setProjectImages(projectRes.data.images);
//     }
//   }, [projectRes]);

//   const handleUpdateSubmit = async (values: FieldValues) => {
//     if (projectImages.length < 5) {
//       toast.error("Please keep at least 5 images.");
//       return;
//     }

//     const updatedData = {
//       ...values,
//       images: projectImages,
//     };

//     try {
//       const res = await updateProject({ id, data: updatedData }).unwrap();
//       if (res?.success) {
//         toast.success("Project updated successfully!");
//         navigate("/projects"); // or wherever your list is
//       }
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Update failed");
//     }
//   };

//   // Image Upload Logic
//   const onDrop = async (acceptedFiles: any) => {
//     setUploading(true);
//     const uploadedUrls: string[] = [];
//     for (const file of acceptedFiles) {
//       try {
//         const url = await uploadFile(file);
//         uploadedUrls.push(url);
//       } catch (err) {
//         toast.error(`Failed: ${file.name}`);
//       }
//     }
//     setProjectImages((prev) => [...prev, ...uploadedUrls]);
//     setUploading(false);
//   };

//   const removeImage = (index: number) => {
//     setProjectImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] },
//   });

//   if (isFetching)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Spin size="large" />
//       </div>
//     );

//   return (
//     <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen">
//       <Row justify="center">
//         <div className="w-full max-w-5xl">
//           <div className="flex items-center gap-4 mb-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 hover:bg-gray-200 rounded-full transition-colors"
//             >
//               <FiArrowLeft size={24} />
//             </button>
//             <div>
//               <h1 className="text-3xl font-extrabold text-gray-900">Edit Project</h1>
//               <p className="text-gray-500">
//                 Modify the details for{" "}
//                 <span className="text-green-600">"{projectRes?.data?.title}"</span>
//               </p>
//             </div>
//           </div>

//           <PForm onSubmit={handleUpdateSubmit} defaultValues={projectRes?.data}>
//             <div className="space-y-8">
//               {/* IMAGE GALLERY SECTION */}
//               <Card className="rounded-xl shadow-sm border-gray-200" title="Project Gallery">
//                 <div
//                   {...getRootProps()}
//                   className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-6
//                     ${isDragActive ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-green-400 bg-gray-50"}`}
//                 >
//                   <input {...getInputProps()} />
//                   {uploading ? (
//                     <Spin tip="Uploading..." />
//                   ) : (
//                     <div className="flex flex-col items-center">
//                       <FiUploadCloud className="text-3xl text-gray-400 mb-2" />
//                       <p className="text-gray-600">Drag images to add to the gallery</p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//                   {projectImages.map((image, index) => (
//                     <div key={index} className="relative aspect-video group">
//                       <img
//                         src={image}
//                         alt="prev"
//                         className="w-full h-full object-cover rounded-lg border border-gray-100"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <FiTrash2 size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </Card>

//               {/* GRID INPUTS SECTION */}
//               <Card className="rounded-xl shadow-sm border-gray-200" title="Core Information">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
//                   <PInput type="text" name="title" label="Project Title" />
//                   <PInput type="text" name="shortDescription" label="Short Subtitle" />
//                   <div className="md:col-span-2">
//                     <PInput type="text" name="technologyUsed" label="Technologies Used" />
//                   </div>
//                   <PInput type="text" name="frontEndRepo" label="Frontend Repo" />
//                   <PInput type="text" name="backEndRepo" label="Backend Repo" />
//                   <div className="md:col-span-2">
//                     <PInput type="text" name="liveLink" label="Live URL" />
//                   </div>
//                 </div>
//               </Card>

//               {/* TEXTAREA SECTION */}
//               <Card className="rounded-xl shadow-sm border-gray-200" title="Detailed Features">
//                 <div className="flex flex-col gap-2">
//                   <PTextArea name="featureOne" label="Feature One" width="100%" />
//                   <PTextArea name="featureTwo" label="Feature Two" width="100%" />
//                   <PTextArea name="featureThree" label="Feature Three" width="100%" />
//                   <PTextArea name="note" label="Developer's Note" width="100%" notRequired />
//                 </div>
//               </Card>

//               <div className="flex justify-end gap-4 pb-12">
//                 <Button size="large" onClick={() => navigate(-1)} className="rounded-xl px-8">
//                   Cancel
//                 </Button>
//                 <Button
//                   size="large"
//                   className="px-12 bg-green-500 hover:bg-green-600 border-none text-white font-bold rounded-xl shadow-lg"
//                   htmlType="submit"
//                   loading={isUpdating}
//                 >
//                   Update Project
//                 </Button>
//               </div>
//             </div>
//           </PForm>
//         </div>
//       </Row>
//     </div>
//   );
// };

// export default EditProjectContainer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { FiArrowLeft, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import PForm from "../components/form/PFrom";
import PInput from "../components/form/PInput";
import PTextArea from "../components/form/PTextArea";
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "../redux/features/project/projectApi";
import { uploadFile } from "../utils/uploadFile";

const EditProjectContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: projectRes, isLoading: isFetching } = useGetSingleProjectQuery(id);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (projectRes?.data?.images) {
      setProjectImages(projectRes.data.images);
    }
  }, [projectRes]);

  const handleUpdateSubmit = async (values: FieldValues) => {
    if (projectImages.length < 5) {
      toast.error("Please keep at least 5 images.");
      return;
    }

    const updatedData = {
      ...values,
      priority: Number(values.priority), // Ensure it's sent as a number
      images: projectImages,
    };

    try {
      const res = await updateProject({ id, data: updatedData }).unwrap();
      if (res?.success) {
        toast.success("Project updated successfully!");
        navigate("/projects");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  const onDrop = async (acceptedFiles: any) => {
    setUploading(true);
    const uploadedUrls: string[] = [];
    for (const file of acceptedFiles) {
      try {
        const url = await uploadFile(file);
        uploadedUrls.push(url);
      } catch (err) {
        toast.error(`Failed: ${file.name}`);
      }
    }
    setProjectImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setProjectImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  if (isFetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen">
      <Row justify="center">
        <div className="w-full max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <FiArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Edit Project</h1>
              <p className="text-gray-500">
                Modify details for{" "}
                <span className="text-green-600">"{projectRes?.data?.title}"</span>
              </p>
            </div>
          </div>

          <PForm onSubmit={handleUpdateSubmit} defaultValues={projectRes?.data}>
            <div className="space-y-8">
              <Card className="rounded-xl shadow-sm border-gray-200" title="Project Gallery">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-6 ${isDragActive ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-green-400 bg-gray-50"}`}
                >
                  <input {...getInputProps()} />
                  {uploading ? (
                    <Spin tip="Uploading..." />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiUploadCloud className="text-3xl text-gray-400 mb-2" />
                      <p className="text-gray-600">Drag images to add</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {projectImages.map((image, index) => (
                    <div key={index} className="relative aspect-video group">
                      <img
                        src={image}
                        alt="prev"
                        className="w-full h-full object-cover rounded-lg border border-gray-100"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-xl shadow-sm border-gray-200" title="Core Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <PInput type="text" name="title" label="Project Title" />
                  <PInput type="text" name="shortDescription" label="Short Subtitle" />
                  {/* PRIORITY FIELD ADDED HERE */}
                  <PInput type="number" name="priority" label="Priority Number (e.g. 1 for Top)" />
                  <div className="md:col-span-1">
                    <PInput type="text" name="technologyUsed" label="Technologies Used" />
                  </div>
                  <PInput type="text" name="frontEndRepo" label="Frontend Repo" />
                  <PInput type="text" name="backEndRepo" label="Backend Repo" />
                  <div className="md:col-span-2">
                    <PInput type="text" name="liveLink" label="Live URL" />
                  </div>
                </div>
              </Card>

              <Card className="rounded-xl shadow-sm border-gray-200" title="Detailed Features">
                <div className="flex flex-col gap-2">
                  <PTextArea name="featureOne" label="Feature One" width="100%" />
                  <PTextArea name="featureTwo" label="Feature Two" width="100%" />
                  <PTextArea name="featureThree" label="Feature Three" width="100%" />
                  <PTextArea name="note" label="Developer's Note" width="100%" notRequired />
                </div>
              </Card>

              <div className="flex justify-end gap-4 pb-12">
                <Button size="large" onClick={() => navigate(-1)} className="rounded-xl px-8">
                  Cancel
                </Button>
                <Button
                  size="large"
                  className="px-12 bg-green-500 hover:bg-green-600 border-none text-white font-bold rounded-xl shadow-lg"
                  htmlType="submit"
                  loading={isUpdating}
                >
                  Update Project
                </Button>
              </div>
            </div>
          </PForm>
        </div>
      </Row>
    </div>
  );
};

export default EditProjectContainer;
