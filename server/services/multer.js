import multer from "multer";
import path from 'node:path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('public','images'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })

const upload = multer({ storage: storage });

export default upload;
  