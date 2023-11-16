
/**
 * @fileoverview Routes pour les utilisateurs.
 * @module userRoutes
 * @requires express
 * @requires ../controllers/auth.js
 * @requires ../controllers/user.js
 */

import express from 'express';
import {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  apiAuth,
  authenticateToken,
  // contactEmail,
} from '../controllers/auth.js';
import {
  getUserById,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getDataUserByName,
  getUserByName,
  // updateSocial,
} from '../controllers/user.js';

const router = express();

/**
 * Middleware pour récupérer l'utilisateur par son ID.
 * @name param
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {string} userId - ID de l'utilisateur.
 * @param {function} getUserById - Fonction pour récupérer l'utilisateur par son ID.
 */
router.param("userId", getUserById);

/**
 * Middleware pour récupérer l'utilisateur par son nom.
 * @name param
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {string} name - Nom de l'utilisateur.
 * @param {function} getUserByName - Fonction pour récupérer l'utilisateur par son nom.
 */
router.param("name", getUserByName);

/**
 * Route pour récupérer un utilisateur par son ID.
 * @name get/user/:userId
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {string} userId - ID de l'utilisateur.
 * @param {function} apiAuth - Middleware pour vérifier l'authentification de l'API.
 * @param {function} authenticateToken - Middleware pour vérifier le token d'authentification.
 * @param {function} getUser - Fonction pour récupérer l'utilisateur.
 */
router.get("/user/:userId", apiAuth, authenticateToken, getUser);

/**
 * Route pour récupérer un utilisateur par son nom.
 * @name get/user/name/:name
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {string} name - Nom de l'utilisateur.
 * @param {function} apiAuth - Middleware pour vérifier l'authentification de l'API.
 * @param {function} getDataUserByName - Fonction pour récupérer les données de l'utilisateur par son nom.
 */
router.get("/user/name/:name", apiAuth, getDataUserByName);

/**
 * Route pour mettre à jour un utilisateur.
 * @name put/user/:userId
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {string} userId - ID de l'utilisateur.
 * @param {function} apiAuth - Middleware pour vérifier l'authentification de l'API.
 * @param {function} authenticateToken - Middleware pour vérifier le token d'authentification.
 * @param {function} updateUser - Fonction pour mettre à jour l'utilisateur.
 */
router.put("/user/:userId", apiAuth, authenticateToken, updateUser);

/**
 * Route pour récupérer tous les utilisateurs.
 * @name get/users/:userId
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {string} userId - ID de l'utilisateur.
 * @param {function} apiAuth - Middleware pour vérifier l'authentification de l'API.
 * @param {function} authenticateToken - Middleware pour vérifier le token d'authentification.
 * @param {function} isAdmin - Middleware pour vérifier si l'utilisateur est un administrateur.
 * @param {function} getAllUsers - Fonction pour récupérer tous les utilisateurs.
 */
router.get(
  "/users/:userId",
  apiAuth,
  authenticateToken,
  isAdmin,
  getAllUsers
);

/**
 * Route pour supprimer un utilisateur.
 * @name delete/user/:userId
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {string} userId - ID de l'utilisateur.
 * @param {function} apiAuth - Middleware pour vérifier l'authentification de l'API.
 * @param {function} authenticateToken - Middleware pour vérifier le token d'authentification.
 * @param {function} deleteUser - Fonction pour supprimer l'utilisateur.
 */
router.delete(
  "/user/:userId",
  apiAuth,
  authenticateToken,
  deleteUser
);

/**
 * Route pour envoyer un email de contact.
 * @name post/sendemail
 * @function
 * @memberof module:userRoutes
 * @inner
 * @param {function} apiAuth - Middleware pour vérifier l'authentification de l'API.
 * @param {function} contactEmail - Fonction pour envoyer un email de contact.
 */
// router.post("/sendemail", apiAuth, contactEmail);

export { router as userRoutes }