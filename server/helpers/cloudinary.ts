import {v2 as cloudinary, UploadApiResponse} from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = multer.memoryStorage();

async function imageUploadUtils(file: string): Promise<UploadApiResponse> {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
}

const upload = multer({storage});

export {upload, imageUploadUtils};
