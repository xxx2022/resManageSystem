const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const db = require('../../config/db')
const jwt = require("../../config/jwt")



router.get('/test', (req, resp) => {
    resp.json({
        msg: "success"
    })
})

//register
router.post("/register", (request, response) => {
    const sql = "select * from user where user_name ='" + request.body.user_name + "'"
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            response.send({
                status: 2,
                msg: req.msg
            })
        } else {
            if (req.data.length>0) {
               return response.status(400).json({
                    msg: '用户已存在'
                });
            } else {
                //加密密码
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(request.body.password, salt, function (err, hash) {
                        if (err) throw err
                        const bcryptPassword = hash
                        const sql = `insert into user (user_name, password, status) values ('${request.body.user_name}', '${bcryptPassword}', '${request.body.status}')`;
                        db.dataControl(sql, function (req, res) {
                            if (req.status == false) {
                                response.send({
                                    msg: req.msg
                                });
                            } else {
                                response.send({
                                    msg: req.msg
                                });
                            }
                        });
                    });
                });
            }
        }
    })
})

//login
router.post("/login", (request, response) => {
    const {
        user_name,
        password: pwd
    } = request.body
    const sql = `select* from user where user_name='${request.body.user_name}'`
    db.dataControl(sql, (req, res) => {
        if (req.status==false) {
            console.log(req);
            response.json({
                status:2,msg:req.msg
            })
        } else {
            if(req.data.length<=0){
                response.status(404).send({
                    status:2,msg:'用户名不存在'
                })
            }else{
                 bcrypt.compare(request.body.password, req.data[0].password).then((isMatch) => {
                if (isMatch) {
                    const content = {user_name,pwd}  //这是传递给setJwt方法的第一个参数，账号和密码
                    const token=jwt.setJwt(content)   //setJwt方法我们可以获取到token
                    response.status(200).json({
                        msg: 'success',
                        // token
                        token:token
                    })
                    // jwt.sign({user_name,pwd}, 'pzy', { expiresIn: 10 },(err,token)=>{
                    //     if (err) throw err;
                    //     response.status(200).json({
                    //         msg: 'success',
                    //         // token
                    //         token:token
                    //     })
                    // })
                    // response.json({msg:'success'})
                } else {
                    response.status(404).send({
                        msg: '用户名或密码错误'
                    })
                }
            })
            }
        }
    })
})

module.exports = router;