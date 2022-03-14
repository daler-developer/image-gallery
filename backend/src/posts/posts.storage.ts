import { diskStorage } from "multer"
import * as path from 'path'
import * as fs from 'fs'

export const postImagesStorage = diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', 'uploads', 'post-images')

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '__' + file.originalname)
  }
})
