import * as User from '../models/user';

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Pas d'utilisateur trouvé dans la base de données",
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUserByName = (req, res, next, name) => {
  User.findOne({ displayName: name }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Pas d'utilisateur trouvé dans la base de données",
      });
    }

    req.xprofile = user;
    next();
  });
};

exports.getDataUserByName = (req, res) => {
  req.xprofile.salt = undefined;
  req.xprofile.encry_password = undefined;
  req.xprofile.verification_code = undefined;
  return res.json(req.xprofile);
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: "Impossible de mettre à jour l'utilisateur",
        });
      }

      (updatedUser.salt = undefined), (updatedUser.encry_password = undefined);
      res.json(updatedUser);
    }
  );
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Impossible de récupérer les utilisateurs",
      });
    }

    res.json(users);
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove({ _id: req.profile._id }, (err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: "Impossible de supprimer l'utilisateur",
      });
    }
    res.json({
      message: "Utilisateur supprimé avec succès",
      deletedUser,
    });
  });
};
