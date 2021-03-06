var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/board');
const date = require('../components/util')

router.post('/',async function (req, res, next) {
    const body = req.body; // {name:asdf,price:200}
    console.log('body : ', body)
    try {
        if(body.board_title && body.board_content) {
            const connection = await db.beginTransaction()
            const result = await model.insert(connection, body)
            await db.commit(connection)
            res.json('게시물을 등록했습니다.')        
        } else {
            res.status(404).json('제목과 내용을 입력해주세요.')
        }
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
                {users_id:json.users_id}
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
        const users_id = req.query.users_id
        const result = await model.getList({users_id:users_id})
        res.status(200).json({result})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})

router.get('/content',async function (req, res, next) {
    try {
        const board_idx = req.query.board_idx
        const result = await model.getListBoardContent({board_idx:board_idx})
        res.status(200).json({result})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})


module.exports = router;