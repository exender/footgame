import express from 'express';
import { check, validationResult } from 'express-validator';
import uuid from 'uuid';
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

router.post(
  "/signup",
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

export { router as authRoutes }

router.post;
