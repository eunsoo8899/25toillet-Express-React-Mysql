var express = require('express');
var router = express.Router();

const db = require('../components/db')
const model = require('../models/users');
const crypyo_pwd = require('../components/crypto');
const handle_email = require('../config/handle_email')
const users_img_model = require('../models/images')
const crypto = require('crypto')
var key_one=crypto.randomBytes(256).toString('hex').substr(100, 5);
var key_two=crypto.randomBytes(256).toString('base64').substr(50, 5);
var key_for_verify=key_one+key_two; //우리가 사용할 인증코드


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
        } else if (!body.users_name || !body.email) {
            res.status(404).json('모든 항목을 입력 해 주세요.')
        } else if (body.users_id.length < 7) {
            res.status(404).json('ID는 7글자 이상 입력 해 주세요')
        } else if (body.users_pwd.length < 8) {
            res.status(404).json('password는 8글자 이상 입력 해 주세요')
        }

        delete body.users_pwd_confirm

        const {salt, encodedPw} = crypyo_pwd.createPasswordPbkdf2(body.users_pwd)
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
    const encodedPw = crypyo_pwd.getPasswordPbkdf2(body.users_pwd, newResult.salt)
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

router.post('/duplicate',async function (req, res, next) {
    const body = req.body; 
    console.log('body : ', body)

    try {      
        const connection = await db.beginTransaction()
        const usersResult = await model.getList({users_id:body.users_id})
        if (body.users_id.length < 7) {
            res.status(404).json('ID는 7글자 이상 입력 해 주세요')
        } else if(usersResult.length > 0){
            res.status(404).json('중복되는 아이디가 있습니다.')            
        }
        await db.commit(connection)
        res.json('사용 가능한 ID입니다.')        
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
})

router.put('/',async function (req, res, next) {
    try {
        const json = req.body;
        const connection = await db.beginTransaction()
        await model.update(connection, json)
        await db.commit(connection)
        res.json('Success')        
    } catch (err){
        console.log('err : ',err)
        next(err)
    }
})

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


router.post('/sendVerify', async function(req, res, next) {       
    const body = req.body
    handle_email.EmailVerification(body.email , key_for_verify)
    body['key_for_verify'] = key_for_verify
    try {
        const connection = await db.beginTransaction()
        const result = await model.sendEmail(connection, body)
        await db.commit(connection)
        res.json('인증 메일을 발송했습니다.')        
    } catch(err){
        res.status(404).json('Error')
    }
});

router.get('/verify',async function (req, res, next) {
    try {      
        const email = req.query.email
        const result = await model.getVerify({email:email})
        if(result.length == 0){
            res.status(404).json('email not found')
        }
        res.status(200).json({result:result[0]})
    } catch(err){
        res.status(404).json('Error')
    }
})

router.put('/verify', async function(req, res, next) {   
    const body = req.body
    handle_email.EmailVerification(body.email , key_for_verify)
    body['key_for_verify'] = key_for_verify
    try {
        const connection = await db.beginTransaction()
        const result = await model.findAccount(connection, body)
        await db.commit(connection)
        res.json({result})        
    } catch(err){
        console.log('err : ',err)
        next(err)
    }
});

module.exports = router;
