var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/contact');

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
                {contact_idx:json.contact_idx}
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
        const contact_idx = req.query.contact_idx
        const result = await model.getList({contact_idx:contact_idx})
        res.status(200).json({result})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})


module.exports = router;