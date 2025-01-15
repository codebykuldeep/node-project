import { v2 as cloudinary } from 'cloudinary'
import constant from '../constants.js';
import fs from 'node:fs';

cloudinary.config({ 
    cloud_name: constant.CLOUD_NAME, 
    api_key: constant.CLOUD_KEY, 
    api_secret: constant.CLOUD_SECRET
  });


export async function uploadImage(path) {
    try {
        const res = await cloudinary.uploader.upload(
            path,
            {
                folder: "investment",
            },
        );
        try {
            fs.unlinkSync(path)
        } catch (error) {
            console.log('delete',error);
            
        }
        return res.secure_url;
    } catch (error) {
        throw new Error(error.message);
    }

}