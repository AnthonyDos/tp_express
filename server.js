import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import route from "./routes/routes.js";
//const pug = require("pug");


dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));


mongoose.set('strictQuery',false);
mongoose.connect('mongodb+srv://Anthonydos:Scooby060@cluster0.2yccv.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log({err:err,message:'Connexion à MongoDB échouée !'}));


const app = express();
app.use(express.urlencoded())
//app.use(bodyParse.json());
app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));
app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)


app.use(express.static(path.join(__dirname, "public")));

app.use("/", route);



app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});