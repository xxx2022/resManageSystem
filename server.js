const express = require("express")
const mysql = require("mysql")
const admin =require("./routers/api/admin")
const foods = require("./routers/api/foodRouters")
const users =require("./routers/api/orderRouters")
const upload = require("./routers/api/upload")
const jwt = require("./config/jwt")
const app =express()

const db =require("./config/db")
const createApplication = require("express/lib/express")

//使用body-parser中间件
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// 配置静态资源目录 整一个文件夹 通过域名能访问
// app.use(express.static(path.join(__dirname,"../static")))

//鉴权
// app.use((req, res, next) => {
//     if (req.url == '/api/admin/login') { //如果请求路径是登录可以直接进行访问接口
//         next()
//     } else {
//         const token = req.headers.token  //前端将token保存在headers中，我们获取他
//         if (token && token != '') {   //若token不为''并且存在存在，则进行校验
//             //验证token
//             jwt.getJwt(token, (err, decode) => {  //这是使用了jwt.js中写的方法getJwt对token进行校验
//                 if (err) {
//                     //无效token
//                     res.status(401).send({
//                         code: '-1', 
//                         msg:'无效token'
//                     })
//                 } else {
//                     next()
//                 }
//             })
//         } else {
//             //token不存在
//             res.status(401).send({
//                 code: '-1',
//                 msg:'token不存在'
//             })
//         }
//     }
// })

app.get("/",(req,res)=>{
    res.send("Hello World!")
})
app.use("/api/admin",admin)
app.use("/api/foods",foods)
app.use("/api/users",users)
app.use("/api/upload",upload)

const port = process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})