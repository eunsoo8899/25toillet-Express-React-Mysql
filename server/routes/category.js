var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/category');


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
        const json = req.body; // {category_idx :2, name:'ssdf'}
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
        const result = await model.delete(connection, {category_idx:json.category_idx})
        await db.commit(connection)
        res.json({result})  
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})

router.get('/',async function (req, res, next) {
    try {
        const category_idx = req.query.category_idx
        const result = await model.getList({category_idx:category_idx})
        res.status(200).json({result})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }      
})


module.exports = router;