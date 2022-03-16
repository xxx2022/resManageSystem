<template>
  <div id="home">
      <top-bar>
        <template slot="left-nav">
          <van-icon name="arrow-left" style="font-size:32px"/>
        </template>
          <template slot="center-nav">欢迎光临</template>
      </top-bar>
      <good-list :menus="foodsData"></good-list>
  </div>
</template>

<script>
import TopBar from '../../components/top-bar.vue'
import GoodList from './homeChildren/good-list.vue'
import Scroll from "./homeChildren/scroll.vue"
export default {
data(){
    return{  
      // menus: [
      //   {
      //     name: '菜单1',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单8',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单2',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单3',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单4',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单5',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单6',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单7',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单8',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   },
      //   {
      //     name: '菜单9',
      //     data: [
      //       {
      //         name: '1.1'
      //       },
      //       {
      //         name: '1.2'
      //       },
      //       {
      //         name: '1.3'
      //       },
      //       {
      //         name: '1.4'
      //       },
      //       {
      //         name: '1.5'
      //       },
      //       {
      //         name: '1.6'
      //       }
      //     ]
      //   }
      // ],
      foodsData:[]
    }
},
components:{
    TopBar,
    GoodList,
    Scroll
},
mounted(){
  this.getTableData()
},
methods:{
    getTableData() {
      this.$axios.post("api/foods/submenu").then((res) => {
        this.foodsData = res.data.data;
      });
    },
}
}
</script>

<style scoped>
#home{
    font-size: 18px;
}

</style>