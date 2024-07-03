/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row } from "antd";
import { useState } from "react";
import { compressAndConvertToBase64 } from "../../../config/base64";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
const AddProjectContainer = () => {
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const maxImages: number = 10;
  const minImages: number = 5;
  // carusel images code here
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
      </Row>
    </div>
  );
};

export default AddProjectContainer;
