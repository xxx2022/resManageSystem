const jsonwebtoken = require("jsonwebtoken")

const secretOrKey = 'keYiLuanXie', //密钥，一般很复杂
    duringTime = {
        expiresIn: 60 * 30
    } //一小时过期

const jwt = {
    setJwt(content) {
        let token = jsonwebtoken.sign(content, secretOrKey, duringTime) //sign是jsonwebtoken的一个方法，三个参数自己了解
        return token
    },
    getJwt(token, callback) {
        jsonwebtoken.verify(token, secretOrKey, (err, token) => {
            callback(err, token)
        })
    }
}

module.exports = jwt