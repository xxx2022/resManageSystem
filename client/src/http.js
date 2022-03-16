import axios from 'axios' //一般我们现在实现一异步请求数据都是axios,这里先引入axios
import {
    Message,
    Loading
} from 'element-ui';
import router from './router'
let loading //定义loading变量

// function startLoading() {    //使用Element loading-start 方法
//     loading = Loading.service({
//         lock: true,
//         text: '加载中...',
//         background: 'rgba(0, 0, 0, 0.7)'
//     })
// }
// function endLoading() {    //使用Element loading-close 方法
//     loading.close()
// }


// 请求拦截  设置统一header  请求拦截是我们向后端发送接口请求的时候,可以进行一些操作，一般是进行添加token,还有请求动画什么的，
//通俗一点解释就是我们每次向后端请求接口的时候，每次请求都要向后端发送一个，“请你把数据给我”,后端才给你，如果我们不设置请求拦截，
//我们就需要在每次单独请求接口的时候，每次都去加上这句话，但是当我们设置了请求拦截的时候，就相当于多了一个加工程序，每次我们请求接口的时候
//我们不用在自己去说这句话了，有一个统一的程序自动帮我们加上这句话。
axios.interceptors.request.use(config => {
    // 加载
    // startLoading()
    if (localStorage.eleToken) //判断是否有eleToken，如果有则将eleToken添加到请求头
        config.headers.token = localStorage.eleToken
    return config //返回该添加结果给后端
}, error => { //如果请求失败，则输出错误
    return Promise.reject(error)
})

//响应拦截，当我们请求到后端的数据的时候，后端一般会给我们返回一些状态码，一般是统一规定好的，根据这些状态码，
//我们可以进行相关操作，例如清除token,跳转回首页，弹出提示框，进行提示发生了什么样的错误。
//还是通俗一点讲，就是我们拿到后端的返回结果了，但是返回结果有很多，我们需要一个专门的处理程序，对这些返回结果进行筛选，
//都是突出“统一”两个字，就是方便了我们的处理，不用每次获取请求都需要进行重复操作，重复操作“统一处理”，个人理解也是一种”封装“
axios.interceptors.response.use(response => {
    // endLoading()
    return response //响应成功，返回后端返回的数据

}, error => { //失败处理
    // 错误提醒
    // endLoading()
    // Message.error(error.response.data)
    const {
        status
    } = error.response //根据后端返回的状态码，提示相关信息 
    // Message.error(error.response.data.msg)
    // if (status == 401) {
    //     Message.error('token值无效，请重新登录')
    //     // 清除token
    //     localStorage.removeItem('eleToken')
    //     // 页面跳转
    //     router.push('/login')
    // }
    switch (status) {
        case 401:
            Message.error('token值无效，请重新登录')
            // 清除token
            localStorage.removeItem('eleToken')
            // 页面跳转
            router.push('/login')
            break;
        default: Message.error(error.response.data.msg)
    }
    return Promise.reject(error) //在控制台输出错误
})

export default axios   //这里将axios进行了导出，就可以在main.js文件里面进行导入了，挂载在全局使用了