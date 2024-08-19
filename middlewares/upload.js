import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    return cb(HttpError(400, ".exe not allow extention"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
}).single("avatarURL");

const uploadMiddleware = async (req, res, next) => {
  upload(req, res, function (error) {
    if (error?.code === "LIMIT_UNEXPECTED_FILE") {
      return next(HttpError(400, "Add one file for uploading"));
    }
    if (error instanceof multer.MulterError) {
      return next(HttpError(400, error.message));
    }
    next(error);
  });
};

export default uploadMiddleware;
