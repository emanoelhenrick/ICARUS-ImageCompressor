const sharp = require("sharp");
const compressImages = require("compress-images");
const path = require("path");
const fs = require("fs");

module.exports = function(){

	const inputPath = path.join(__dirname, "..", "data", "input");
    
	const imageName = (function(){
		const file = fs.readdirSync(inputPath);
		return file[0];
	})();
    
	const inputPathName = path.join(__dirname, "..", "data", "input", imageName);
	const tempPathImage = path.join(__dirname, "..", "data", "tmp", imageName);
    
	function resizeCompress(inputPathName, tempPathImage, width) {
		sharp(inputPathName)
			.resize({width: width})
			.toFile(tempPathImage, (err) => {
				if(err){
					console.log(err);
				} else {
					console.log("Imagem redimensionada com sucesso!");
					compress("./src/data/tmp/"+imageName, "./src/data/output/");
				} 
			});
	}
    
	function compress(inputPath, outputPath) {
    
		compressImages(inputPath, outputPath,
			{ compress_force: false, statistic: true, autoupdate: true },
			false,
			{ jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
			{ png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
			{ svg: { engine: "svgo", command: "--multipass" } },
			{
				gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
			},
			function (err, completed) {
				if (completed === true) {
					removeTemp();
					console.log("compressao efetuada");
				} else {
					console.log("deu erro na compressao");
				}
			}
		);
	}
    
	function removeTemp() {
		fs.unlinkSync(tempPathImage, (err) => {
			if (err) {
				console.log("Ocorreu um erro ao remover o arquivo temporario");
			} else {
				console.log("Imagem temporaria removida com sucesso!");
			}
		});

		fs.unlinkSync(inputPathName, (err) => {
			if (err) {
				console.log("Ocorreu um erro ao remover o arquivo temporario");
			} else {
				console.log("Imagem temporaria removida com sucesso!");
			}
		});
	} 
	resizeCompress(inputPathName, tempPathImage, 1920);
};

