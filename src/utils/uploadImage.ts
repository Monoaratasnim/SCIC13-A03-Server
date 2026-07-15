import cloudinary from "../config/cloudinary";

/*
|--------------------------------------------------------------------------
| Upload Image To Cloudinary
|--------------------------------------------------------------------------
*/

const uploadImage = async (
  file: Express.Multer.File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "propertynest",
        },
        (error, result) => {
          if (error || !result) {
            return reject(error);
          }

          resolve(result.secure_url);
        }
      )
      .end(file.buffer);
  });
};

export default uploadImage;