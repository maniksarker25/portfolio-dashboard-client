// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button, Row } from "antd";
// import { useState } from "react";
// import { compressAndConvertToBase64 } from "../../../config/base64";
// import Swal from "sweetalert2";
// import { useDropzone } from "react-dropzone";
// import PForm from "../../form/PFrom";
// import { FieldValues } from "react-hook-form";
// import PInput from "../../form/PInput";
// import { useAddProjectMutation } from "../../../redux/features/project/projectApi";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { ApiError } from "../../../types/responseType";
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
//           // Type assertion to access error data safely
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
//   // project images code here
//   const onDrop = async (acceptedFiles: any) => {
//     if (projectImages.length + acceptedFiles.length <= maxImages) {
//       let fileError = false;
//       const base64Images = await Promise.all(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         acceptedFiles.map((file: any) => {
//           if (file.size > 2 * 1024 * 1024) {
//             return (fileError = true);
//           } else {
//             return compressAndConvertToBase64(file, 800, 600, 0.8);
//           }
//         })
//       );

//       if (fileError) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong!",
//           footer:
//             "File size exceeds the limit (2MB). Please choose a smaller file.",
//         });
//       } else {
//         setProjectImages([...projectImages, ...base64Images]);
//       }
//     }
//   };
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//   return (
//     <div>
//       <Row justify={"center"}>
//         <div className="mb-4 w-full max-w-screen-lg">
//           <h2 className="my-4 text-xl pb-2 border-b-2">
//             Add Project Images(minimum 5 image )
//           </h2>

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
//                 <p>Drag and drop images here, or click to select files</p>
//               )}
//             </div>

//             {projectImages.length > 0 && (
//               <div>
//                 <h4>Uploaded Carusel Images:</h4>
//                 <ul className="grid grid-cols-5 gap-x-4 mt-4">
//                   {projectImages.map((image, index) => (
//                     <li key={index}>
//                       <img
//                         src={image}
//                         alt={`uploaded-${index}`}
//                         style={{
//                           width: "100%",
//                           height: "100px",
//                         }}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {projectImages.length < minImages && projectImages.length !== 0 && (
//               <p style={{ color: "red" }}>
//                 Please upload a minimum of {minImages} images.
//               </p>
//             )}

//             {projectImages.length > maxImages && (
//               <p style={{ color: "red" }}>
//                 You can't upload more than {maxImages} images.
//               </p>
//             )}
//           </div>
//         </div>
//         <div>
//           <PForm onSubmit={handleProjectSubmit}>
//             <div className="md:flex  gap-4">
//               <PInput type={"text"} name={"title"} label={"Title"} />
//               <PInput
//                 type={"text"}
//                 name={"shortDescription"}
//                 label={"Short Description"}
//               />
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
//             <div style={{ width: "100%" }}>
//               <PInput
//                 type={"text"}
//                 name={"liveLink"}
//                 label={"Live Link"}
//                 width={"100%"}
//               />
//             </div>
//             <div style={{ width: "100%" }}>
//               <PTextArea
//                 name={"featureOne"}
//                 label={"Feature One"}
//                 width={"100%"}
//               />
//             </div>
//             <div style={{ width: "100%" }}>
//               <PTextArea
//                 name={"featureTwo"}
//                 label={"Feature Two"}
//                 width={"100%"}
//               />
//             </div>
//             <div style={{ width: "100%" }}>
//               <PTextArea
//                 name={"featureThree"}
//                 label={"Feature Three"}
//                 width={"100%"}
//               />
//             </div>
//             <div style={{ width: "100%" }}>
//               <PTextArea
//                 name={"note"}
//                 label={"Note If Have"}
//                 width={"100%"}
//                 notRequired
//               />
//             </div>
//             {errorMessage && (
//               <p style={{ color: "red", marginBottom: "7px" }}>
//                 {errorMessage}
//               </p>
//             )}
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
import { Button, Row } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import PForm from "../../form/PFrom";
import { FieldValues } from "react-hook-form";
import PInput from "../../form/PInput";
import { useAddProjectMutation } from "../../../redux/features/project/projectApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiError } from "../../../types/responseType";
import PTextArea from "../../form/PTextArea";
import { uploadFile } from "../../../utils/uploadFile";

const AddProjectContainer = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [addProject, { isLoading }] = useAddProjectMutation();
  const maxImages: number = 10;
  const minImages: number = 5;
  const navigate = useNavigate();

  // handle project submit
  const handleProjectSubmit = async (values: FieldValues) => {
    if (projectImages.length < minImages) {
      toast.error(`Please upload at least ${minImages} images.`);
      return;
    }

    const projectData = {
      ...values,
      images: projectImages,
    };
    setErrorMessage("");
    try {
      const res = await addProject(projectData);
      if (res?.data?.success) {
        toast.success("Project added successfully");
        navigate("/projects");
      } else if (res?.error) {
        if ("data" in res.error) {
          const errorData = (res.error as FetchBaseQueryError).data as {
            message?: string;
          };
          setErrorMessage(errorData?.message || "An unknown error occurred");
        } else {
          setErrorMessage("An unknown error occurred");
        }
      }
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      setErrorMessage(apiError?.data.errorMessage || "Something went wrong");
    }
  };

  // handle image upload
  const onDrop = async (acceptedFiles: any) => {
    if (projectImages.length + acceptedFiles.length > maxImages) {
      toast.error(`You can upload a maximum of ${maxImages} images.`);
      return;
    }

    let fileError = false;
    const uploadedImages: string[] = [];

    for (const file of acceptedFiles) {
      if (file.size > 2 * 1024 * 1024) {
        fileError = true;
        continue;
      }
      try {
        const uploadedUrl = await uploadFile(file);
        uploadedImages.push(uploadedUrl);
      } catch (err) {
        console.error("Upload failed for:", file.name, err);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (fileError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Some files were too large (max 2MB).",
      });
    }

    setProjectImages((prev) => [...prev, ...uploadedImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <Row justify={"center"}>
        <div className="mb-4 w-full max-w-screen-lg">
          <h2 className="my-4 text-xl pb-2 border-b-2">
            Add Project Images (minimum 5)
          </h2>

          <div>
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                borderRadius: "4px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the images here...</p>
              ) : (
                <p>Drag & drop images here, or click to select files</p>
              )}
            </div>

            {projectImages.length > 0 && (
              <div>
                <h4>Uploaded Carousel Images:</h4>
                <ul className="grid grid-cols-5 gap-x-4 mt-4">
                  {projectImages.map((image, index) => (
                    <li key={index}>
                      <img
                        src={image}
                        alt={`uploaded-${index}`}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <PForm onSubmit={handleProjectSubmit}>
            <div className="md:flex  gap-4">
              <PInput type={"text"} name={"title"} label={"Title"} />
              <PInput
                type={"text"}
                name={"shortDescription"}
                label={"Short Description"}
              />
            </div>
            <div>
              <PInput
                type={"text"}
                name={"technologyUsed"}
                label={"Technology Used"}
                width={"100%"}
              />
            </div>
            <div>
              <PInput
                type={"text"}
                name={"frontEndRepo"}
                label={"Frontend Repository"}
                width={"100%"}
              />
            </div>
            <div>
              <PInput
                type={"text"}
                name={"backEndRepo"}
                label={"Backend Repository"}
                width={"100%"}
              />
            </div>
            <div>
              <PInput
                type={"text"}
                name={"liveLink"}
                label={"Live Link"}
                width={"100%"}
              />
            </div>

            <PTextArea name={"featureOne"} label={"Feature One"} width="100%" />
            <PTextArea name={"featureTwo"} label={"Feature Two"} width="100%" />
            <PTextArea
              name={"featureThree"}
              label={"Feature Three"}
              width="100%"
            />
            <PTextArea
              name={"note"}
              label={"Note (optional)"}
              width="100%"
              notRequired
            />

            {errorMessage && (
              <p style={{ color: "red", marginBottom: "7px" }}>
                {errorMessage}
              </p>
            )}
            <div>
              <Button
                style={{
                  backgroundColor: "#1677FF",
                  color: "white",
                }}
                htmlType="submit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting" : "Submit"}
              </Button>
            </div>
          </PForm>
        </div>
      </Row>
    </div>
  );
};

export default AddProjectContainer;
