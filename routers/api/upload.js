const express = require('express');
const router = express.Router();
//上传图片的模板
const multer = require('multer');
//生成的图片放入uploads文件夹下
// var upload=multer({dest:'uploads/'})
// var upload=multer({preservePath:'D:/image'})

const storage = multer.diskStorage({
    // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
    destination(req, res, cb) {
        cb(null, 'D:/image/');
    },
    filename(req, file, cb) {
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
    }
});

const upload = multer({
    storage
});
//图片上传必须用post方法
router.post('/img', upload.single('img'), (req, res) => {
    res.send('req.file')
})
module.exports = router;