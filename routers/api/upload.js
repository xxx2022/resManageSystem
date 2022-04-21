const express = require('express');
const router = express.Router();
//上传图片的模板
const multer = require('multer');
//生成的图片放入uploads文件夹下
// var upload=multer({dest:'uploads/'})
// var upload=multer({preservePath:'D:/image'})
let names=''
const storage = multer.diskStorage({
    // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
    destination(req, res, cb) {
        cb(null, 'D:/image/');
    },
    filename(req, file, cb) {
        console.log(file)
        const filenameArr = file.originalname.split('.');
        names = Date.now() + '.' + filenameArr[filenameArr.length - 1]
        cb(null, names);
    }
});

const upload = multer({
    storage
});
//图片上传必须用post方法
router.post('/img', upload.single('img'), (req, res) => {
    res.send(names)
})
module.exports = router;