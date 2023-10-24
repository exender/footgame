import * as User from '../models/user';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import { validationResult } from 'express-validator';

exports.apiAuth = (req, res, next) => {
  if(req.headers['api-key']) {  
    let apiKey = req.headers['api-key']

    if(apiKey !== process.env.API_KEY) {
      return res.status(400).json({
        message: "API Key invalide"
      })
    }
    next()
  } else {
    return res.status(400).json({
      message: "Manque API Token"
    })
  }
}

exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(402).json({
      error: errors.array()[0].msg
    })
  }

  const {email} = req.body
  User.findOne({email}, (err, email) => {
    if(err || email) {
      return res.status(403).json({
        error: "Email déjà utilisé"
      })
    }

    const user = new User(req.body)
    user.save((err, user) => {
      if(err) {
        return res.status(400).json({
          error: "Impossible d'ajouter l'utilisateur dans la base de données",
          err
        })
      }
      res.json({
        message: "Utilisateur ajouté avec succés",
        user: {
          name: user.name,
          email: user.email,
          id: user._id
        }
      })
    })
  })
}

exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email inexistant"
      })
    }

    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email et mot de passe ne correspondent pas"
      })
    }

    const token = jwt.sign({_id: user._id}, process.env.SECRET)

    res.cookie("token", token, { expire: new Date() + 100 })

    const { _id, name, email, role } = user
    return res.json({token, user: { _id, name, email, role }})
  })
}


exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "Utilisateur déconnecté avec succés"
  })
}

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
})

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  if(!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    })
  }

  next()
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0) {
    return res.status(403).json({
      error: "Pas admin, Access Denied"
    })
  }

  next()
}

exports.sendVerificationCode = (req, res) => {
  const {email} = req.body
  User.find({email}, (err, user) => {
    if(err || user.length==0) {
      return res.status(400).json({
        error: "Email inexistant"
      })
    }

    id = user[0]._id
    let val = Math.floor(10000 + Math.random() * 9000);

    User.findByIdAndUpdate(
      { _id: id },
      { $set: {verification_code: val} },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Vous ne pouvez pas mettre à jour cet utilisateur"
          });
        }

        user.salt = undefined;
        user.encry_password = undefined;
        res.json({
          status: "Success",
          id: user._id,
          message: "Code de vérification envoyé avec succès"
        });
      }
    );

  })
}


exports.resetPassword = (req, res) => {
  const {id, verificationCode} = req.body
  User.findById(id).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Utilisateur inexistant"
      })
    }

    if(verificationCode === null) {
      return res.status(400).json({
        error: "S'il vous plaît entrer un code de vérification"
      })
    }

    if(user.verification_code !== verificationCode) {
      return res.status(400).json({
        error: "Code de vérifation invalide"
      })
    }

    if(!req.body.newPassword) {
      return res.status(200).json({
        message: "S'il vous plaît entrer un nouveau mot de passe"
      })
    }

    const {newPassword} = req.body

    if(newPassword.length < 6) {
      return res.json({
        error: "Mot de passe doit être au moins 6 caractères"
      })
    }


    let encryPassword = user.securePassword(newPassword)

    if(encryPassword == user.encry_password) {
      return res.json({
        error: "S'il vous plaît entrer un mot de passe différent de l'ancien"
      })
    }


    User.findByIdAndUpdate(
      { _id: id },
      { $set: {verification_code: undefined, encry_password: encryPassword} },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Impossible de mettre à jour le mot de passe"
          });
        }

        res.json({
          status: "Success",
          id: user._id,
          message: "Mot de passe changé avec succès"
        });
      }
    );
  })
}
