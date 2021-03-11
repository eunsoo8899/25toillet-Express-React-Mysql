var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/users');
const crypto = require('../components/crypto');

router.post('/signup',async function (req, res, next) {
    const body = req.body; 
    console.log('body : ', body)    

    try {      
        const connection = await db.beginTransaction()

        // users id duplicate check
        const usersResult = await model.getList({users_id:body.users_id})
        if(usersResult.length > 0){
            throw {status: 409, errorMessage: 'Duplicate users id'}            
        }  

        const {salt, encodedPw} = crypto.createPasswordPbkdf2(body.users_pwd)
        console.log('salt length : ', salt.length)
        console.log('encodedPw length : ', encodedPw.length)
        body.salt = salt
        body.users_pwd = encodedPw

        const result = await model.insert(connection, body)
        
        // // get usersId
        // const users_idx = result.insertId
        // if(images && images.length > 0){
        //     // for(let i=0;i<images.length;i++){
        //     //     let imgObj = {
        //     //         users_idx:users_idx, // "users_idx":5,
        //     //         img_path:images[i] // "img_path":"images/5/광고1.png"
        //     //     }
        //     //     await users_img_model.insert(connection, imgObj)
        //     // }

        //     // users_img multi insert
        //     let imagesArray = []
        //     for(let i=0;i<images.length;i++){
        //         imagesArray.push([
        //             users_idx,
        //             images[i]
        //         ])            
        //     } // [[1, "path1"],[1,"path2"],[1,"path3"]]
        //     await users_img_model.multipleInsert(connection, imagesArray)
        // }        

 
        // if(deliv_info && deliv_info.length > 0){
        //     for(let i=0;i<deliv_info.length;i++){
        //         let diObj = deliv_info[i]
        //         diObj.users_idx = users_idx                
        //         await deliv_info_model.insert(connection, diObj)
        //     }    
        // }        

        await db.commit(connection)
        res.json({result})        
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})

router.post('/signin',async function (req, res, next) {
  console.log('signin')
  const body = req.body; // {name:asdf,price:200}
  console.log('body : ', body)
  try {      
      const result = await model.getList({users_id:body.users_id}) // [{ users_id:test1, users_pwd:123}]
      if(result.length == 0){
          throw {status: 404, errorMessage: 'users not found'}
      } 
      let newResult = result[0]
      //newResult.users_pwd : 가입시 입력한 비밀번호 + db에 저장된 salt
      const encodedPw = crypto.getPasswordPbkdf2(body.users_pwd, newResult.salt)
      //encodedPw : 로그인시 입력한 비밀번호 + db에 저장된 salt

      if (newResult.users_pwd === encodedPw) { 
          console.log('Authentication succeed')           
      } else {
          throw {status: 401, errorMessage: 'Authentication failed'}
      }
    
      delete newResult.users_pwd
      delete newResult.salt
      res.json({result:newResult})        
  } catch(err){
      console.log('err : ',err)
      next(err)
  }
})

router.get('/',async function (req, res, next) {
    try {      
        const users_idx = req.query.users_idx
        const result = await model.getList({users_idx:users_idx})
        if(result.length == 0){
            throw {status: 404, errorMessage: 'users not found'}
        } 
        const imgResult = await users_img_model.getList({users_idx:users_idx})
        result[0].images = imgResult

        const diResult = await deliv_info_model.getList({users_idx:users_idx})
        result[0].deliv_info = diResult

        delete result[0].users_pwd
        delete result[0].salt
        res.status(200).json({result:result[0]})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})



module.exports = router;
