import express from 'express';
const router = express.Router();
import { check } from 'express-validator';
// import { reset } from 'nodemon';
import {
  signup,
  signin,
  signout,
  apiAuth,
  sendVerificationCode,
  resetPassword,
} from '../controllers/auth.js';

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
  signup
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
