/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { useState } from "react";
import { compressAndConvertToBase64 } from "../../../config/base64";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import PForm from "../../form/PFrom";
import { FieldValues } from "react-hook-form";
import PInput from "../../form/PInput";
const AddProjectContainer = () => {
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const maxImages: number = 10;
  const minImages: number = 5;

  // handle project submit
  const handleProjectSubmit = async (values: FieldValues) => {};
  // project images code here
  const onDrop = async (acceptedFiles: any) => {
    if (projectImages.length + acceptedFiles.length <= maxImages) {
      let fileError = false;
      const base64Images = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        acceptedFiles.map((file: any) => {
          if (file.size > 2 * 1024 * 1024) {
            return (fileError = true);
          } else {
            return compressAndConvertToBase64(file, 800, 600, 0.8);
          }
        })
      );

      if (fileError) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer:
            "File size exceeds the limit (2MB). Please choose a smaller file.",
        });
      } else {
        setProjectImages([...projectImages, ...base64Images]);
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <Row justify={"center"}>
        <div className="mb-4 w-full max-w-screen-lg">
          <h2 className="my-4 text-xl pb-2 border-b-2">Add Project Images</h2>

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
                <p>Drag and drop images here, or click to select files</p>
              )}
            </div>

            {projectImages.length > 0 && (
              <div>
                <h4>Uploaded Carusel Images:</h4>
                <ul className="grid grid-cols-5 gap-x-4 mt-4">
                  {projectImages.map((image, index) => (
                    <li key={index}>
                      <img
                        src={image}
                        alt={`uploaded-${index}`}
                        style={{
                          width: "100%",
                          height: "100px",
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {projectImages.length < minImages && projectImages.length !== 0 && (
              <p style={{ color: "red" }}>
                Please upload a minimum of {minImages} images.
              </p>
            )}

            {projectImages.length > maxImages && (
              <p style={{ color: "red" }}>
                You can't upload more than {maxImages} images.
              </p>
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
                name={"fontEndRepo"}
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
            <div style={{ width: "100%" }}>
              <PInput
                type={"text"}
                name={"liveLink"}
                label={"Live Link"}
                width={"100%"}
              />
            </div>
            <div style={{ width: "100%" }}>
              <PInput
                type={"text"}
                name={"featureOne"}
                label={"Feature One"}
                width={"100%"}
              />
            </div>
            <div style={{ width: "100%" }}>
              <PInput
                type={"text"}
                name={"featureTwo"}
                label={"Feature Two"}
                width={"100%"}
              />
            </div>
            <div style={{ width: "100%" }}>
              <PInput
                type={"text"}
                name={"featureThree"}
                label={"Feature Three"}
                width={"100%"}
              />
            </div>
            <div style={{ width: "100%" }}>
              <PInput
                type={"text"}
                name={"note"}
                label={"Note If Have"}
                width={"100%"}
              />
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: "#1677FF",
                  color: "white",
                }}
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </PForm>
        </div>
      </Row>
    </div>
  );
};

export default AddProjectContainer;
