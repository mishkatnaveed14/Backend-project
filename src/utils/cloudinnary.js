import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
//   const UploadCloudinaryImage = (localFilePath) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(
//         localFilePath,
//         { resource_type: "auto" },
//         { public_id: "shoes" },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//     });
//   };
// Upload an image
const uploadCloudinaryImage = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(
            localFilePath,
            { resource_type: "auto" },
            {
                public_id: "shoes",
            })
        console.log("file uploaded to Cloudinary successfully", response.url);
        return response.url;
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the local file if upload fails
        console.log(error);
        return null;
    }
}


export { uploadCloudinaryImage };
    
