const router = require("express").Router();
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "./src/data/input/" });
const { uploadImage } = require("../app/upload");
const path = require("path");
const fs = require("fs");

router.use(cors());

router.post("/upload", upload.single("image"), function (req, res,) {

	const image = req.file;

	uploadImage(image);
	
	const imagePath = path.join(__dirname, "..", "data", "output", image.originalname);

	function recur(){
		if(fs.existsSync(imagePath) === false){
			console.log("output ainda nao existe");
			setTimeout(()=>{
				recur();
			}, 500);
            
		} else {
			console.log("output encontrado");
			sendOps();
		}
	}

	recur();

	function sendOps(){
		const outputPath = path.join(__dirname, "..", "data", "output");
		const imageName = (function(){
			const file = fs.readdirSync(outputPath);
			return file[0];
		})();
		const pathImage = path.join(__dirname, "..", "data", "output/");

		res.download(pathImage+imageName);

		setTimeout(() =>{
			fs.unlinkSync(pathImage+imageName, (err) => {
				if (err) {
					console.log("Ocorreu um erro ao remover o arquivo output");
				} else {
					console.log("output removido com sucesso!");
				}
			});
		}, 500);      
	}
});



module.exports = router;

