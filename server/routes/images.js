var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/images');

const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

// 이미지 업로드
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
        const users_id = req.query.users_id
        const dir = path.join(__dirname,'..', `public/images/${users_id}`)

        !fs.existsSync(dir) && fs.mkdirSync(dir)
        const newPath = `${dir}/${file.name}`
        fs.renameSync(file.path, newPath)  //경로를 바꿔줍니다.
        res.json({ result: `images/${users_id}/${file.name}`});
      } else {
        res.status(401).json('이미지 파일을 선택하세요.')
      }            
    })
  } catch(err){
    console.log('err : ',err)
    next(err)
  }
})
// 프로필사진 업로드
router.post('/profileUpload',async function (req, res, next) {
  try {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      const file = files.image
      if(file){        
        const users_id = req.query.users_id
        const dir = path.join(__dirname,'..', `public/profile/${users_id}`)

        !fs.existsSync(dir) && fs.mkdirSync(dir)
        const newPath = `${dir}/${file.name}`
        fs.renameSync(file.path, newPath)  //경로를 바꿔줍니다.
        res.json({ result: `profile/${users_id}/${file.name}`});
      } else {
        res.status(401).json('이미지 파일을 선택하세요.')
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

router.post('/profile',async function (req, res, next) {
	const body = req.body; 
	console.log('body : ', body)
	try {
			const connection = await db.beginTransaction()
			const result = await model.profile(connection, body)
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
        const users_id = req.query.users_id
        const result = await model.getList({users_id:users_id})
        res.status(200).json({result})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }        
})

router.get('/users_page',async function (req, res, next) {
  try {
      const users_id = req.query.users_id
      const result = await model.getList({users_id:users_id})
      res.status(200).json({result})   
  } catch(err){
      console.log('err : ',err)
      next(err)
  }        
})

router.get('/recently',async function (req, res, next) {
  try {      
      const result = await model.getRecently()
      res.status(200).json({result})   
  } catch(err){
      console.log('err : ',err)
      next(err)
  }        
})

router.get('/detail',async function (req, res, next) {
  try {
      const images_idx = req.query.images_idx
      const result = await model.getListByIdx({images_idx:images_idx})
      res.status(200).json({result})   
  } catch(err){
      console.log('err : ',err)
      next(err)
  }        
})




module.exports = router;