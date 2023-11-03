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

import { rateLimit } from 'express-rate-limit';

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

/* Code Rate limiter*/
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
