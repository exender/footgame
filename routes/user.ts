import express from 'express';
import {
  isAdmin,
  apiAuth,
  authenticateToken,
  // contactEmail,
} from '../controllers/auth';
import {
  getUserById,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getDataUserByName,
  getUserByName,
  // updateSocial,
} from '../controllers/user';
const router = express();

router.param("userId", getUserById);
router.param("name", getUserByName);

router.get("/user/:userId", apiAuth, authenticateToken, getUser);
router.get("/user/name/:name", apiAuth, getDataUserByName);
router.put("/user/:userId", apiAuth, authenticateToken, updateUser);
router.get(
  "/users/:userId",
  apiAuth,
  authenticateToken,
  isAdmin,
  getAllUsers
);
router.delete(
  "/user/:userId",
  apiAuth,
  authenticateToken,
  deleteUser
);

// Contact us email
// router.post("/sendemail", apiAuth, contactEmail);

export { router as userRoutes }