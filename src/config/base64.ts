export function compressAndConvertToBase64(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Convert canvas content to base64
          const base64String = canvas.toDataURL("image/jpeg", quality);
          resolve(base64String);
        } else {
          reject(new Error("Could not get canvas context"));
        }
      };

      img.onerror = () => reject(new Error("Failed to load image"));

      if (event.target && event.target.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error("FileReader event target is null"));
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
