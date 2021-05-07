var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/users');
const crypto = require('../components/crypto');
const users_img_model = require('../models/images')

router.post('/signup',async function (req, res, next) {
    const body = req.body; 
    console.log('body : ', body)    

    try {      
        const connection = await db.beginTransaction()

        // users id duplicate check
        const usersResult = await model.getList({users_id:body.users_id})
        if(usersResult.length > 0){
            res.status(404).json('중복되는 아이디가 있습니다.')            
        } else if (body.users_pwd !== body.users_pwd_confirm){
            res.status(404).json('비밀번호가 일치하지 않습니다.')
        }
        delete body.users_pwd_confirm

        const {salt, encodedPw} = crypto.createPasswordPbkdf2(body.users_pwd)
        console.log('salt length : ', salt.length)
        console.log('encodedPw length : ', encodedPw.length)
        body.salt = salt
        body.users_pwd = encodedPw

        const result = await model.insert(connection, body)        

        await db.commit(connection)
        res.json({result})        
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})

router.post('/signin',async function (req, res, next) {
    console.log('signin')
    const body = req.body;
    
    //! find users_id
    try {      
      const result = await model.getList({users_id:body.users_id}) // [{ users_id:test1, users_pwd:123}]
    if(result.length == 0){
        // throw {status: 404, errorMessage: 'users not found'}
        res.status(404).json('아이디를 확인 해 주세요.')
    }

    let newResult = result[0]    
      //newResult.users_pwd : 가입시 입력한 비밀번호 + db에 저장된 salt
    const encodedPw = crypto.getPasswordPbkdf2(body.users_pwd, newResult.salt)
      //encodedPw : 로그인시 입력한 비밀번호 + db에 저장된 salt

    //! maching password
    if (newResult.users_pwd === encodedPw) { 
        console.log('Login succeed')
        req.session.user = result
        console.log(req.session)
        res.send(result)
    } else {
        // throw {status: 401, message: 'Login failed'}
        res.status(401).json('비밀번호가 틀렸습니다.')      
        
    }    
    delete newResult.users_pwd
    delete newResult.salt
    
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})

router.get('/',async function (req, res, next) {
    try {      
        const users_id = req.query.users_id
        const result = await model.getList({users_id:users_id})
        if(result.length == 0){
            throw {status: 404, errorMessage: 'users not found'}
        }        
        const imgResult = await users_img_model.getList({users_id:users_id})
        result[0].images = imgResult

        // const diResult = await deliv_info_model.getList({users_idx:users_idx})
        // result[0].deliv_info = diResult

        delete result[0].users_pwd
        delete result[0].salt
        delete result[0].users_idx
        res.status(200).json({result:result[0]})   
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})

router.get('/signin',(req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user })
        // console.log(req.session)
    } else {
        res.send({loggedIn: false})
        // console.log(req.session)
    }
})

// router.get('/:id', async (req,res)=>{
//     const id = req.params.users_id
//     const response = await model.getList({where: {
//         users_id: id,
//     },
//     })
//     res.send(response)
// })



module.exports = router;
