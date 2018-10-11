require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: function(req, res, next){        
        jwt.verify(req.headers.access_token, process.env.JWT, function(err, decoded) {
            if(err){
                res.send(400).json({err})
            } else {
                req.user = decoded
                next()
            }
          });
    }


}