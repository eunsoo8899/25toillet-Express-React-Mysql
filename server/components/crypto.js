const crypto = require('crypto')

module.exports.createPasswordPbkdf2 = (pw) => {
  const salt = crypto.randomBytes(32).toString('base64')
  const encodedPw = crypto.pbkdf2Sync(pw, salt, 99381, 32, 'sha512').toString('base64')
  //변수 의미 : 암호, 암호의 기준이 되는 키, 해쉬를 진행하는 반복 횟수, 데이터 길이,
  return {encodedPw, salt}
}
// 1. 비밀번호+salt => 암호화해서 디비에 저장 (salt 포함)
// 2. 유저가 로그인 -> 비밀번호를 입력
// 3. 데이터베이스에서 암호화된 비밀번호와 salt를 읽어옴
// 4. 유저가 로그인에 사용한 비밀번호+salt => 암호화
// 5. 데이터베이스에서 불러온 암호화된 비밀번호와 4번으로 만든 비밀번호를 비교
module.exports.getPasswordPbkdf2 = (pw, salt) => {
  return crypto.pbkdf2Sync(pw, salt, 99381, 32, 'sha512').toString('base64')
  // 512 bits = 64 bytes
  // 
}