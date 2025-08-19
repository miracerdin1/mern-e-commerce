import {imageUploadUtils} from "../../helpers/cloudinary";
import {RequestHandler} from "express";

export const handleImageUpload: RequestHandler = async (req, res) => {
    try {
        const file = req.file as Express.Multer.File;
        const b64 = Buffer.from(file.buffer).toString('base64');
        const url = `data:${file.mimetype};base64,${b64}`;
        const result = await imageUploadUtils(url);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Image upload failed',
        })
    }
}