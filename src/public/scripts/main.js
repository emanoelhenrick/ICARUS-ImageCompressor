const Main = {
	init: function(){
		this.cacheSelectors();
		this.bindEvents();
	},

	cacheSelectors: function(){
		this.$btnUpload = document.querySelector("#inputFile");
	},

	bindEvents: function (){
		this.$btnUpload.onchange = () => document.formulario.submit();

	},
};

Main.init();