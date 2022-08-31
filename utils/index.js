const cloudinary = require('cloudinary').v2

const {
	CLOUDNARY_CLOUD_NAME,
	CLOUDNARY_API_KEY,
	CLOUDNARY_API_SECRET,
} = require("./../config")

cloudinary.config({
	cloud_name: CLOUDNARY_CLOUD_NAME,
	api_key: CLOUDNARY_API_KEY,
	api_secret: CLOUDNARY_API_SECRET
})

module.exports.Cloudinary = cloudinary

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

module.exports.GenerateResult = (records) => {
	// Remove the header
	records = records.filter((data, index) => index > 0)

	// sort Records
	records = records.sort((a, b) => b[1] - a[1])

	// Total number of sequence
	let total_sequences = records.length;

	// Calculation of Total number of sequence greater than wild type fitness
	let fitness_for_wild_type = records.filter((data, index) => data[2] === "WT")
	fitness_for_wild_type = fitness_for_wild_type.map((a, b) => Number(a[1]))

	let add_up_fitness_for_wild_type = fitness_for_wild_type.reduce((a, b) => (a + b))

	let average_of_wild_type = add_up_fitness_for_wild_type / fitness_for_wild_type.length

	//Sequence Greater than wild type fitness (Hits)
	// Hits Value
	let hits_value = records.filter((data, index) => data[1] > average_of_wild_type).length

	// Hits Percent
	let hits_percent = (hits_value / total_sequences) * 100


	// Sequence with the highest fitness score (Fitness score)
	let best_sequence = records[0][1]

	// Values of Mutation Ranked based on Fitness (Mutations, Fitness, MutaionLength)
	let unique_fitness = [...new Set(records.map((data, index) => data[1]))];
	let muts_per_fitness = unique_fitness.map((data, index) => {
		let muts = records.filter((a, b) => data === a[1])
		let concat = muts.map(dat => ` ${dat[2]}`).join()
		let length = muts.length
		return [concat, Number(data), length]
	})



	// Fold improvement over wild type
	let fold_improvement_over_wild_type = best_sequence / average_of_wild_type

	let sequence_points = records.map(data => Number(data[1]))

	let result = ({
		total_sequences,
		hits_value,
		parent_sequence: parseFloat(Number(average_of_wild_type).toFixed(2)),
		hits_percent: parseFloat(Number(hits_percent).toFixed(2)),
		best_sequence: parseFloat(Number(best_sequence).toFixed(2)),
		fold_improvement_over_wild_type: parseFloat(Number(fold_improvement_over_wild_type).toFixed(2)),
		muts_per_fitness,
		sequence_points
	})

	return result
}

