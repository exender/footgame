import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config'
import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/user.js';
import { youtubeRoutes } from './routes/youtube.js';

const app = express();

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connectée");
  })
  .catch((e) => {
    console.log(e)
    console.log("Database n'est pas connectée");
  });

mongoose.connection.on("connecté", () => {
  console.log("Mongoose Connecté");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message:
      "Bienvenue sur le site de la Team, pour plus d'informations, veuillez contacter le propriétaire du site",
  });
});

// Use Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", youtubeRoutes);

// PORT
const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
