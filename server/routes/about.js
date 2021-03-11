var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/about');

router.post('/',async function (req, res, next) {
    const body = req.body; // {name:asdf,price:200}
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
        const json = req.body; // {idx :2, name:'ssdf'}
        const connection = await db.beginTransaction()
        const result = await model.update(connection, json)
        await db.commit(connection)
        res.json({result})        
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
})


router.delete('/', async function (req, res, next) {
    const json = req.body;
    try {
        const connection = await db.beginTransaction()
        const result = await model.delete(
                connection, 
                {about_idx:json.about_idx}
            )
        await db.commit(connection)
        res.json({result})  
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})

router.get('/',async function (req, res, next) {
    try {
        const about_idx = req.query.about_idx
        const result = await model.getList({about_idx:about_idx})
        res.status(200).json({result})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})


module.exports = router;