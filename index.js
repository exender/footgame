import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/user.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connectée");
  })
  .catch((e) => {
    console.log(e);
    console.log("Database n'est pas connectée");
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connecté");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nom de votre API',
      version: '1.0.0',
      description: "Description de votre API",
    },
  },
  // Fichiers dans lesquels rechercher les commentaires Swagger
  apis: ['./routes/auth.js', './routes/user.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Endpoint pour la documentation Swagger JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Endpoint pour Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message:
      "Bienvenue sur le site de la Team, pour plus d'informations, veuillez contacter le propriétaire du site",
  });
});

// Use Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// PORT
const port = process.env.PORT || 8000;

// Start server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
