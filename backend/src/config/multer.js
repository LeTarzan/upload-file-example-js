const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        const filename = `${hash.toString('hex')}-${file.originalname}`

        cb(null, filename)
      })
    }
  })
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      return cb(null, true)
    }
    cb(new Error('Invalid file type.'))
  }
}