
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API pour l'authentification des utilisateurs
 * 
 * /signup:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               firstname: John
 *               lastname: Doe
 *               email: john.doe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Utilisateur enregistré avec succès
 * 
 * /signin:
 *   post:
 *     summary: Connexion d'un utilisateur existant
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john.doe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 * 
 * /sendverificationcode:
 *   put:
 *     summary: Envoi d'un code de vérification pour réinitialiser le mot de passe
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Code de vérification envoyé avec succès
 * 
 * /resetpassword:
 *   put:
 *     summary: Réinitialisation du mot de passe de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               code:
 *                 type: string
 *             example:
 *               email: john.doe@example.com
 *               password: newpassword123
 *               code: 123456
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 * 
 * /signout:
 *   get:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Utilisateur déconnecté avec succès

 * /updatepassword:
 *   put:
 *     summary: Modification du mot de passe de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               oldPassword: password123
 *               newPassword: newpassword123
 *     responses:
 *       200:
 *         description: Mot de passe modifié avec succès

 * /deleteaccount:
 *   delete:
 *     summary: Suppression du compte de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Compte utilisateur supprimé avec succès
  */
import express from 'express';
import { check, validationResult } from 'express-validator';
import uuid from 'uuid';
import expressRateLimit from 'express-rate-limit';
import User from '../models/user';
import {
  signup,
  signin,
  signout,
  apiAuth,
  sendVerificationCode,
  resetPassword,
} from '../controllers/auth';

const router = express.Router();

// Fonction pour générer une clé API unique
const generateApiKey = () => {
  return uuid.v4();
};

// Middleware de limitation de taux pour la création de compte
const createAccountLimiter = expressRateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure en millisecondes
  max: 3, // 1 requête par fenêtre de temps
  message: "Vous avez dépassé la limite de création de compte. Veuillez réessayer plus tard.",
});

router.post(
  "/signup",
  createAccountLimiter,
  apiAuth,
  [
    check("firstname", "FirstName doit avoir minimum 3 caractères").isLength({
      min: 3,
    }),
    check("lastname", "Lastname doit avoir minimum 3 caractères").isLength({
      min: 3,
    }),
    check("email", "Email doit être valide").isEmail(),
    check("password", "Password doit avoir minimum 6 caractères").isLength({
      min: 6,
    }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(402).json({
        error: errors.array()[0].msg,
      });
    }

    const { email, password, firstname, lastname } = req.body;

    // Génération de la clé API unique
    const apiKey = generateApiKey();

    const user = new User({
      email,
      password,
      firstname,
      lastname,
      apiKey,
    });

    await user.save();

    res.json({
      message: 'Utilisateur ajouté avec succès',
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        apiKey: user.apiKey,
      },
    });
  }
);

router.post(
  "/signin",
  apiAuth,
  [
    check("email", "Email doit être valide").isEmail(),
    check("password", "Password doit avoir minimum 6 caractères").isLength({
      min: 6,
    }),
  ],
  signin
);

router.put("/sendverificationcode", apiAuth, sendVerificationCode);
router.put("/resetpassword", apiAuth, resetPassword);

router.get("/signout", apiAuth, signout);
router.post;