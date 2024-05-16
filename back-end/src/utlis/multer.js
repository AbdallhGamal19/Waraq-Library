import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
const fileType = ["image/jpeg", "image/png"];
export const upload = () => {
  const storage = diskStorage({
    destination: "uploads/booksPicture",
    filename: (req, file, cb) => {
      cb(null, nanoid() + "_" + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (!fileType.includes(file.mimetype)) {
      return cb(new Error("invaled format", { cause: 403 }), false);
    }
    return cb(null, true);
  };
  const multerUpload = multer({ storage, fileFilter });
  return multerUpload;
};
