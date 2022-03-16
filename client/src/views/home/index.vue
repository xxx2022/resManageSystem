<template>
  <div class="index">欢迎光临
    <div class="qrcode" ref="qrCodeUrl">
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
data(){
  return{
    num:10000
  }
},
mounted(){
  this.creatQrCode()
},
methods:{
  creatQrCode() {
        let qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: 'https://www.baidu.com', // 需要转换为二维码的内容
            width: 100,
            height: 100,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        })
    },
}
}
</script>

<style>

</style>