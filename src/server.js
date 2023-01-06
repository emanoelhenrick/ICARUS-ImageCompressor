const express = require("express");
const routesApi = require("./routes/routes");
const path = require("path");

const app = express();

app.use("/api", routesApi);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({  extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("index");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));