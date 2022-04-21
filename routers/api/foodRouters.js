const express = require("express")
const router = express.Router()
const urlData = require("url");
const db = require("../../config/db")

router.get('/test', (req, resp) => {
    resp.json({
        msg: "success!!!!"
    })
})
//查看所有菜品信息
router.post("/foodList", (request, response) => {
    const sql = `select * from foods`
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            return response.status(400).json({
                msg: req.msg
            })
        } else {
            if (req.data && req.data.length > 0) {
                response.status(200).send({
                    data: req.data
                })
            } else {
                response.send({
                    msg: '暂无数据'
                })
            }
        }
    })
})
router.get('/foodType',(request,response)=>{
    const sql = `select * from foods_type`
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            return response.status(400).json({
                msg: req.msg
            })
        } else {
            if (req.data && req.data.length > 0) {
                response.status(200).send({
                    data: req.data
                })
            } else {
                response.send({
                    msg: '暂无数据'
                })
            }
        }
    })
})
//增加菜品信息
router.post("/foodAdd", (request, response) => {
    // const sql = `insert into foods value`
    let img_url = `http://localhost:8088/${request.body.img_url}`
    const sql = `select * from foods where food_name='${request.body.food_name}'`
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            response.send({
                msg: req.msg
            })
        } else {
            if (req.data && req.data.length > 0) {
                return response.status(400).send({
                    msg: '菜品已存在'
                })
            } else {
                const sql = `insert into foods (img_url, price, food_name, type, description, attr) values('${img_url}','${request.body.price}','${request.body.food_name}','${request.body.type}','${request.body.description}','${request.body.attr}')`
                db.dataControl(sql, (req, res) => {
                    if (req.status == false) {
                        return response.send({
                            msg: req.msg
                        })
                    } else {
                        return response.status(200).send({
                            msg: '添加成功'
                        })
                    }
                })
            }
        }
    })
})
//删除菜品
router.post("/foodDel", (request, response) => {
    const sql = `delete from foods where id='${request.body.id}'`
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            return response.send({
                msg: req.msg
            })
        } else {
            return response.send({
                msg: req.msg
            })
        }
    })
})
//修改菜品信息
router.post("/foodUpdate", (request, response) => {
    let img_url = `http://localhost:8088/${request.body.img_url}`
    const sql = "update foods set food_name = '" + request.body.food_name + "', price='" + request.body.price + "', \
    type='" + request.body.type + "', description='" + request.body.description + "', \
    img_url='" + img_url + "',attr='" + request.body.attr + "' \
    where id='" + request.body.id + "'";
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            return response.send({
                msg: req.msg
            })
        } else {
            return response.status(200).send({
                msg: "修改成功"
            })
        }
    })
})

//获取单个菜品详情
router.get("/foodDetail", (request, response) => {
    const urlInfo = urlData.parse(request.url, true)
    const sql = `select * from foods where id='${urlInfo.query.id}'`
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            return response.send({
                msg: req.msg
            })
        } else {
            if (req.data && req.data.length > 0) {
                response.status(200).send({
                    data: req.data
                })
            } else {
                return response.send({
                    msg: '暂无数据'
                })
            }
        }
    })
})
router.post("/submenu", (request, response) => {
    const sql = `select * from foods_type `
    let nameList = []
    db.dataControl(sql, (req, res) => {
        req.data.forEach((item) => {
            nameList.push({
                name: item.name,
                id: item.id,
                data: []
            })
        })
        for (let i = 0; i < nameList.length; i++) {
            let sqlName = `select a.id,a.img_url,a.price,a.food_name,a.description,a.sales from foods a inner join foods_type b on  a.parent_id =b.id where a.parent_id='${nameList[i].id}'`
            db.dataControl(sqlName, (req, res) => {
                nameList[i].data = req.data
                if (nameList[nameList.length - 1].data.length > 0) {
                    response.status(200).send({
                        data: nameList
                    })
                }

            })
        }
    })
})
//设置分页
router.get("/paging", (request, response) => {
    let { pageSize, currentPage,foodName } = request.query
    pageSize = pageSize ? pageSize : 10;
    currentPage = currentPage ? currentPage : 1;
    let sql = foodName?`select * from foods where food_name='${foodName}'`:`select * from foods`
    db.dataControl(sql, (req, res) => {
        if (req.status == false) {
            return response.send({
                msg: req.msg
            })
        } else {
            // 计算数据总条数
            let total = req.data.length;
            // 分页条件 (跳过多少条)
            let n = (currentPage - 1) * pageSize;
            sql += ` limit ${n}, ${pageSize}`;
            db.dataControl(sql, (req, res) => {
                if (req.status == false) {
                    return response.send({
                        msg: req.msg
                    })
                } else {
                    response.send({
                        total,
                        data: req.data
                    });
                }
            })
        }
    })
})

module.exports = router