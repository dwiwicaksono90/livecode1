require('dotenv').config()
var express = require('express');
var router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let password = bcrypt.hashSync(req.body.password, salt)
  User.create({
      name: req.body.name,
      email: req.body.email,
      password: password 
    })
    .then((result) => {
      res.status(201).json({ success: true, message: `Account ${result.name} registered` })
    }).catch((err) => {
      res.status(500).json({
        message: err.message
      })
    });
})

router.post('/login', (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .then((result) => {
      if (!result) {
        res.status(400).json({
          message: "user not found!"
        })
      } else {
        let password = bcrypt.compareSync(req.body.password, result.password)        
        if (password) {          
          let token = jwt.sign({
            id: result._id,
            name: result.name,
            email: result.email
          }, process.env.JWT)          
          res.status(201).json({
            token: token
          })
        } else {
          res.status(400).json({
            message: "Wrong Password!"
          })
        }
      }
    }).catch((err) => {
      res.status(500).json({
        message: err.message
      })
    });
})

module.exports = router;