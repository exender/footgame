import User from '../models/user.js';

export const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({
        error: "Pas d'utilisateur trouvé dans la base de données",
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Une erreur s'est produite lors de la recherche de l'utilisateur",
    });
  }
};

export const getUserByName = async (req, res, next, name) => {
  try {
    const user = await User.findOne({ displayName: name }).exec();
    if (!user) {
      return res.status(400).json({
        error: "Pas d'utilisateur trouvé dans la base de données",
      });
    }

    req.xprofile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Une erreur s'est produite lors de la recherche de l'utilisateur",
    });
  }
};

export const getDataUserByName = (req, res) => {
  req.xprofile.salt = undefined;
  req.xprofile.encry_password = undefined;
  req.xprofile.verification_code = undefined;
  return res.json(req.xprofile);
};

export const getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    ).exec();
    if (!updatedUser) {
      return res.status(400).json({
        error: "Impossible de mettre à jour l'utilisateur",
      });
    }

    updatedUser.salt = undefined;
    updatedUser.encry_password = undefined;
    res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({
      error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: "Impossible de récupérer les utilisateurs",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove({ _id: req.profile._id }).exec();
    if (!deletedUser) {
      return res.status(400).json({
        error: "Impossible de supprimer l'utilisateur",
      });
    }

    res.json({
      message: "Utilisateur supprimé avec succès",
      deletedUser,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Une erreur s'est produite lors de la suppression de l'utilisateur",
    });
  }
};
