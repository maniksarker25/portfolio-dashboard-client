// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { Button, Row } from "antd";
// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FieldValues } from "react-hook-form";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useAddProjectMutation } from "../../../redux/features/project/projectApi";
// import { ApiError } from "../../../types/responseType";
// import { uploadFile } from "../../../utils/uploadFile";
// import PForm from "../../form/PFrom";
// import PInput from "../../form/PInput";
// import PTextArea from "../../form/PTextArea";

// const AddProjectContainer = () => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [projectImages, setProjectImages] = useState<string[]>([]);
//   const [addProject, { isLoading }] = useAddProjectMutation();
//   const maxImages: number = 10;
//   const minImages: number = 5;
//   const navigate = useNavigate();

//   // handle project submit
//   const handleProjectSubmit = async (values: FieldValues) => {
//     if (projectImages.length < minImages) {
//       toast.error(`Please upload at least ${minImages} images.`);
//       return;
//     }

//     const projectData = {
//       ...values,
//       images: projectImages,
//     };
//     setErrorMessage("");
//     try {
//       const res = await addProject(projectData);
//       if (res?.data?.success) {
//         toast.success("Project added successfully");
//         navigate("/projects");
//       } else if (res?.error) {
//         if ("data" in res.error) {
//           const errorData = (res.error as FetchBaseQueryError).data as {
//             message?: string;
//           };
//           setErrorMessage(errorData?.message || "An unknown error occurred");
//         } else {
//           setErrorMessage("An unknown error occurred");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       const apiError = error as ApiError;
//       setErrorMessage(apiError?.data.errorMessage || "Something went wrong");
//     }
//   };

//   // handle image upload
//   const onDrop = async (acceptedFiles: any) => {
//     if (projectImages.length + acceptedFiles.length > maxImages) {
//       toast.error(`You can upload a maximum of ${maxImages} images.`);
//       return;
//     }

//     let fileError = false;
//     const uploadedImages: string[] = [];

//     for (const file of acceptedFiles) {
//       if (file.size > 2 * 1024 * 1024) {
//         fileError = true;
//         continue;
//       }
//       try {
//         const uploadedUrl = await uploadFile(file);
//         uploadedImages.push(uploadedUrl);
//       } catch (err) {
//         console.error("Upload failed for:", file.name, err);
//         toast.error(`Failed to upload ${file.name}`);
//       }
//     }

//     if (fileError) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Some files were too large (max 2MB).",
//       });
//     }

//     setProjectImages((prev) => [...prev, ...uploadedImages]);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div>
//       <Row justify={"center"}>
//         <div className="mb-4 w-full max-w-screen-lg">
//           <h2 className="my-4 text-xl pb-2 border-b-2">Add Project Images (minimum 5)</h2>

//           <div>
//             <div
//               {...getRootProps()}
//               style={{
//                 border: "2px dashed #cccccc",
//                 borderRadius: "4px",
//                 padding: "20px",
//                 textAlign: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <input {...getInputProps()} />
//               {isDragActive ? (
//                 <p>Drop the images here...</p>
//               ) : (
//                 <p>Drag & drop images here, or click to select files</p>
//               )}
//             </div>

//             {projectImages.length > 0 && (
//               <div>
//                 <h4>Uploaded Carousel Images:</h4>
//                 <ul className="grid grid-cols-5 gap-x-4 mt-4">
//                   {projectImages.map((image, index) => (
//                     <li key={index}>
//                       <img
//                         src={image}
//                         alt={`uploaded-${index}`}
//                         style={{
//                           width: "100%",
//                           height: "100px",
//                           objectFit: "cover",
//                           borderRadius: "6px",
//                         }}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           <PForm onSubmit={handleProjectSubmit}>
//             <div className="md:flex  gap-4">
//               <PInput type={"text"} name={"title"} label={"Title"} />
//               <PInput type={"text"} name={"shortDescription"} label={"Short Description"} />
//             </div>
//             <div>
//               <PInput
//                 type={"text"}
//                 name={"technologyUsed"}
//                 label={"Technology Used"}
//                 width={"100%"}
//               />
//             </div>
//             <div>
//               <PInput
//                 type={"text"}
//                 name={"frontEndRepo"}
//                 label={"Frontend Repository"}
//                 width={"100%"}
//               />
//             </div>
//             <div>
//               <PInput
//                 type={"text"}
//                 name={"backEndRepo"}
//                 label={"Backend Repository"}
//                 width={"100%"}
//               />
//             </div>
//             <div>
//               <PInput type={"text"} name={"liveLink"} label={"Live Link"} width={"100%"} />
//             </div>

//             <PTextArea name={"featureOne"} label={"Feature One"} width="100%" />
//             <PTextArea name={"featureTwo"} label={"Feature Two"} width="100%" />
//             <PTextArea name={"featureThree"} label={"Feature Three"} width="100%" />
//             <PTextArea name={"note"} label={"Note (optional)"} width="100%" notRequired />

//             {errorMessage && <p style={{ color: "red", marginBottom: "7px" }}>{errorMessage}</p>}
//             <div>
//               <Button
//                 style={{
//                   backgroundColor: "#1677FF",
//                   color: "white",
//                 }}
//                 htmlType="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Submitting" : "Submit"}
//               </Button>
//             </div>
//           </PForm>
//         </div>
//       </Row>
//     </div>
//   );
// };

// export default AddProjectContainer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Row, Spin } from "antd";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { FiInfo, FiLayers, FiLink, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAddProjectMutation } from "../../../redux/features/project/projectApi";
import { uploadFile } from "../../../utils/uploadFile";
import PForm from "../../form/PFrom";
import PInput from "../../form/PInput";
import PTextArea from "../../form/PTextArea";

const AddProjectContainer = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [addProject, { isLoading }] = useAddProjectMutation();

  const maxImages = 10;
  const minImages = 5;
  const navigate = useNavigate();

  const handleProjectSubmit = async (values: FieldValues) => {
    if (projectImages.length < minImages) {
      toast.error(`Please upload at least ${minImages} images.`);
      return;
    }
    const projectData = { ...values, images: projectImages };
    try {
      const res = await addProject(projectData);
      if (res?.data?.success) {
        toast.success("Project added successfully!");
        navigate("/projects");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  const onDrop = async (acceptedFiles: any) => {
    if (projectImages.length + acceptedFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed.`);
      return;
    }
    setUploading(true);
    const uploadedUrls: string[] = [];
    for (const file of acceptedFiles) {
      try {
        const url = await uploadFile(file);
        uploadedUrls.push(url);
      } catch (err) {
        toast.error(`Failed to upload ${file.name}`);
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

  return (
    <div className="p-6 md:p-12 bg-[#F9FAFB] min-h-screen">
      <Row justify="center">
        <div className="w-full max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Add New Project</h1>
            <p className="text-gray-500 mt-2">
              Organize your project details and showcase your technical skills.
            </p>
          </div>

          <PForm onSubmit={handleProjectSubmit}>
            <div className="space-y-8">
              {/* SECTION 1: MEDIA */}
              <Card
                className="rounded-xl border-gray-200 shadow-sm"
                title={
                  <span className="flex items-center gap-2">
                    <FiLayers className="text-green-500" /> Project Gallery
                  </span>
                }
              >
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-6
                    ${isDragActive ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-green-400 bg-gray-50"}`}
                >
                  <input {...getInputProps()} />
                  {uploading ? (
                    <Spin tip="Uploading images..." />
                  ) : (
                    <div className="flex flex-col items-center">
                      <FiUploadCloud className="text-4xl text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                      <p className="text-gray-400 text-sm italic">
                        Min {minImages} images required
                      </p>
                    </div>
                  )}
                </div>

                {projectImages.length > 0 && (
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
                )}
              </Card>

              {/* SECTION 2: CORE DETAILS (2 COLUMN GRID) */}
              <Card
                className="rounded-xl border-gray-200 shadow-sm"
                title={
                  <span className="flex items-center gap-2">
                    <FiInfo className="text-green-500" /> Project Information
                  </span>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <PInput type="text" name="title" label="Project Title" />
                  <PInput type="text" name="shortDescription" label="Short Subtitle/Tagline" />
                  <div className="md:col-span-2">
                    <PInput
                      type="text"
                      name="technologyUsed"
                      label="Technologies Used (e.g. Next.js, Redux, PostgreSQL)"
                    />
                  </div>
                </div>
              </Card>

              {/* SECTION 3: LINKS (2 COLUMN GRID) */}
              <Card
                className="rounded-xl border-gray-200 shadow-sm"
                title={
                  <span className="flex items-center gap-2">
                    <FiLink className="text-green-500" /> Repository & Deployment
                  </span>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <PInput type="text" name="frontEndRepo" label="Frontend Repo Link" />
                  <PInput type="text" name="backEndRepo" label="Backend Repo Link" />
                  <div className="md:col-span-2">
                    <PInput type="text" name="liveLink" label="Live Deployment URL" />
                  </div>
                </div>
              </Card>

              {/* SECTION 4: FEATURES (1 COLUMN) */}
              <Card
                className="rounded-xl border-gray-200 shadow-sm"
                title={
                  <span className="flex items-center gap-2">
                    <FiLayers className="text-green-500" /> Features & Notes
                  </span>
                }
              >
                <div className="flex flex-col gap-2">
                  {/* Explicitly pass width="100%" to override the default 350px */}
                  <PTextArea name="featureOne" label="Core Feature One" width="100%" rows={4} />
                  <PTextArea name="featureTwo" label="Core Feature Two" width="100%" rows={4} />
                  <PTextArea name="featureThree" label="Core Feature Three" width="100%" rows={4} />
                  <PTextArea
                    name="note"
                    label="Developer's Note (Optional)"
                    width="100%"
                    notRequired
                    rows={3}
                  />
                </div>
              </Card>

              {/* ERROR & SUBMIT */}
              <div className="flex flex-col items-end gap-4 pb-12">
                {errorMessage && (
                  <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-100 text-sm">
                    {errorMessage}
                  </p>
                )}
                <Button
                  size="large"
                  className="h-14 px-12 bg-[#4ade80] hover:bg-[#22c55e] border-none text-black font-bold rounded-xl shadow-lg hover:shadow-green-200 transition-all flex items-center gap-2"
                  htmlType="submit"
                  loading={isLoading}
                >
                  {isLoading ? "Publishing..." : "Publish Project"}
                </Button>
              </div>
            </div>
          </PForm>
        </div>
      </Row>
    </div>
  );
};

export default AddProjectContainer;
