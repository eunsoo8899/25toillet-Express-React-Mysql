var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/images');

const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const util = require('../components/util')

// router.post('/upload',async function (req, res, next) {
//     try {
//         const form = formidable({ multiples: true })
//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 next(err);
//                 return;
//             }
//             const file = files.image
//             if(file){
//                 const currentTime = util.getCurrentTime().replace(" ","")
//                 const dir = `public/images/${currentTime}`
//                 // const dir = path.join(__dirname,'..', `public/images/users/${currentTime}`)
//                 !fs.existsSync(dir) && fs.mkdirSync(dir)
//                 const newPath = `${dir}/${file.name}`
//                 fs.renameSync(file.path, newPath)  //경로를 바꿔줍니다.
//                 res.json({ result: `images/users/${currentTime}/${file.name}`});
//             } else {
//                 res.json({ result: `no image file`});
//             }            
//         })
//     } catch(err){
//         console.log('err : ',err)
//         next(err)
//     }
// })

router.post('/upload',async function (req, res, next) {
    try {
        const form = formidable({ multiples: true })
        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }
            const file = files.image
            if(file){
                // const currentTime = util.getCurrentTime().replace(" ","")
                // const dir = `public/images/users/${currentTime}`
                const dir = path.join(__dirname,'..', `public/images/users`)
                !fs.existsSync(dir) && fs.mkdirSync(dir)
                const newPath = `${dir}/${file.name}`
                fs.renameSync(file.path, newPath)  //경로를 바꿔줍니다.
                res.json({ result: `images/users/${file.name}`});
            } else {
                res.json({ result: `no image file`});
            }            
        })
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})


router.post('/',async function (req, res, next) {
    const body = req.body; 
    console.log('body : ', body)
    try {
        const connection = await db.beginTransaction()
        const result = await model.insert(connection, body)
        await db.commit(connection)
        res.json({result})        
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})

router.put('/',async function (req, res, next) {
    try {
        const json = req.body; 
        const connection = await db.beginTransaction()
        const result = await model.update(connection, json)
        await db.commit(connection)
        res.json({result})        
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
})

router.get('/',async function (req, res, next) {
    try {
        const users_idx = req.query.users_idx
        const result = await model.getList({users_idx:users_idx})
        res.status(200).json({result})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})



module.exports = router;