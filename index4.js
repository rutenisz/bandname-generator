import express from "express"; // the main framework used to handle HTTP requests and define routes
import bodyParser from "body-parser"; // middleware that helps parse incoming request bodies in different formats
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url)); // used to get the current directory of the file
const app = express();
const port = 3000;
let bandName = "";

app.use(bodyParser.urlencoded({ extended: true })); // makes it available via req.body

function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator);

app.get("/", (req, res) => {
  console.log("fdwsed");
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`Your band name is ${bandName}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
