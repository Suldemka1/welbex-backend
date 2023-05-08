import multer, { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import { extname } from "path";
import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";

const storage = diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `public/upload`;

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join("");

    cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

const imageTypes = [".jpg", ".png", ".svg", ".jpeg"];
const fileTypes = [".pdf", ".txt", ".doc", "docx", "xls", "xlsx"];

const acceptedFileTypes = [...imageTypes, ...fileTypes];

// есть проблема, потратил 4 часа в попытках отменить создание файла если
// если поле message отсутствует или написано с ошибкой, то файл все равно будет создан
// узнал что нельзя передать req.body в fileFilter

const upload = (req: Request, res: Response, next: NextFunction) => {
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      let ext = extname(file.originalname);
      if (acceptedFileTypes.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error("file does not excepted"));
      }
    },
  }).array("files", 10)(req, res, function (err) {
    try {
      //error handling
      if (err instanceof multer.MulterError) {
      }
      next();
    } catch (e) {
      res.end()
    }
  });
};

export { upload };
