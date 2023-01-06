const fs = require("fs");
const path = require("path");
const resizeCompress = require("../app/resizer");

async function uploadImage(image) {
	const imageMeta = image;
	const filename = path.join(__dirname, "..", "data", "input", imageMeta.filename);
	const originalname = path.join(__dirname, "..", "data", "input", imageMeta.originalname);

	fs.rename(`${filename}`, `${originalname}`, err => {
		if (err) {
			console.log("houve um erro ao renomear o arquivo!");
		} else {
			console.log("arquivo renomeado com sucesso!");
		}
		resizeCompress();
	});
}

module.exports = {
	uploadImage
};