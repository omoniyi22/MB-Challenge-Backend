const cloudinary = require('cloudinary').v2
const {
	CLOUDNARY_CLOUD_NAME,
	CLOUDNARY_API_KEY,
	CLOUDNARY_API_SECRET,
} = require("./../config")

module.exports.FileValidation = (records, projectSequence) => {
	let strigifyRecord = JSON.stringify(records)

	let sequence = new RegExp("sequence", "i").test(records[0][0])
	let fitness = new RegExp("fitness", "i").test(records[0][1])
	let muts = new RegExp("muts", "i").test(records[0][2])

	let checkIfHeadersAreRight = (sequence && fitness && muts) ? "" : " CSV Header must be Sequence, Fitness and Muts only."
	let eachRowContains3Column = records.every(data => data.length === 3) ? "" : " Each Rows must have only three columns."
	let recordsHasProjectSequence = new RegExp(projectSequence, "i").test(strigifyRecord) ? "" : " Project Sequence must be included in CSV Sequence Column."

	FinalErroMessage = checkIfHeadersAreRight + eachRowContains3Column + recordsHasProjectSequence

	if (FinalErroMessage) return FinalErroMessage
	else return null
}

cloudinary.config({
	cloud_name: CLOUDNARY_CLOUD_NAME,
	api_key: CLOUDNARY_API_KEY,
	api_secret: CLOUDNARY_API_SECRET
})

module.exports.Cloudinary = cloudinary