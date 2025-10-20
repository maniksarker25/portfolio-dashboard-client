// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import { message, Upload } from "antd";
// import type { UploadProps } from "antd";
// import "./UploadButton.css";
// type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

// const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };

// const UploadButton = ({ imageUrl, setImageUrl }: any) => {
//   const [loading, setLoading] = useState(false);

//   const handleChange: UploadProps["onChange"] = async (info) => {
//     if (info.file.status === "uploading") {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === "done") {
//       const file = info.file.originFileObj as FileType;
//       getBase64(file, (url) => {
//         setImageUrl(url);
//       });
//     }
//   };

//   const uploadButton = (
//     <button style={{ border: 0, background: "none" }} type="button">
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );

//   return (
//     <Upload
//       name="avatar"
//       listType="picture-card"
//       className="avatar-uploader w-full"
//       showUploadList={false}
//       beforeUpload={beforeUpload}
//       onChange={handleChange}
//       customRequest={({ onSuccess }) => onSuccess && onSuccess("ok")}
//     >
//       {imageUrl ? (
//         <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
//       ) : (
//         uploadButton
//       )}
//     </Upload>
//   );
// };

// export default UploadButton;

import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import { uploadFile } from "../../../utils/uploadFile";

// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng =
//     file.type === "image/jpeg" ||
//     file.type === "image/png" ||
//     file.type === "webp";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must be smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };

const UploadButton = ({ imageUrl, setImageUrl }: any) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = async (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    setLoading(true);
    try {
      const url = await uploadFile(file); // Upload to Cloudinary
      setImageUrl(url); // Save uploaded URL
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader w-full"
      showUploadList={false}
      // beforeUpload={beforeUpload}
      onChange={handleChange}
      accept="*"
      customRequest={({ onSuccess }) => onSuccess && onSuccess("ok")}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadButton;
