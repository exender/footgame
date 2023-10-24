import mongoose from 'mongoose';
import bodyParser from 'express';
import cookieParser from 'body-parser';
import cors from 'cors';

const app = express();

require("dotenv").config();

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connectée");
  })
  .catch(() => {
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

// Importer les routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const emailSubscriberRoutes = require("./routes/emailsubscriber");

// Use Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", emailSubscriberRoutes);

// PORT
const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
