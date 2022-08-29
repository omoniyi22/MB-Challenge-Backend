const multer = require("multer")
const path = require("path")

//Multer COnfig
module.exports = async () => {

	let Multer = multer({
		storage: multer.diskStorage({}),
		fileFilter: (req, file, cb) => {
			let ext = path.extnamefile(file.originalname);
			console.log({ here: [req, file] })
			if (ext !== ".csv") {
				cb(new Error("File type is not supported"), false);
				return
			}

			cb(null, true)
		}
	})

	return Multer.single("file")
}