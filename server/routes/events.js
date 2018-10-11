var express = require('express');
var router = express.Router();
const Event = require('../models/events')
const {
    isLogin
} = require('../middleware/index')

router.post('/', isLogin, (req, res) => {
    Event.create({
            name: req.body.name,
            location: req.body.location,
            address: req.body.address,
            user: req.user.id
        })
        .then((result) => {
            res.status(201).json({
                data: result
            })
        }).catch((err) => {
            res.status(500).json({
                message: err
            })
        });
})

router.get('/', (req, res) => {
    Event.find()
        .then((result) => {
            res.status(200).json({
                datas: result
            })
        }).catch((err) => {
            res.status(500).json({
                message: err
            })
        });
})

router.get('/search/:keyword', isLogin, (req, res) => {
    Event.find()
        .then((result) => {
            console.log('masuk--+_+_+-');  

            let datas = []
            for (let i = 0; i < result.length; i++) {
                var str = result[i].name
                str.toLowerCase()
                // console.log('masuk');
                var key = 'mina'
                var res = str.match(/key/g);

                console.log(res);
            }
            // result.forEach(user => {
            //     // console.log(user.name);
            //     // let cek = new RegExp(data.name, req.query.keyword)
            //     var str = (data.name).toLowerCase()
            //     // console.log('masuk');
            //     var key = req.query.keyword.toLowerCase()
            //     var res = str.match(/key/g);

            //     console.log(str);
            // });


            // result.forEach(data => {
            //     // console.log(data.name);

            //     // 

            //     if(cek){
            //         datas.push(data)
            //     }
            // })
            // console.log(datas);

            // res.status(200).json({datas})
        }).catch((err) => {
            res.status(500).json({
                message: err
            })
        });
})



module.exports = router;