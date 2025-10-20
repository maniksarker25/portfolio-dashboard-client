// src/utils/uploadFile.ts
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  // Use your env vars
  const uploadPreset =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const uploadUrl =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_URL ||
    process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

  formData.append("upload_preset", uploadPreset!);

  const res = await fetch(uploadUrl!, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  return data.secure_url; // Return the uploaded image URL
};
