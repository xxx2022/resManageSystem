<template>
  <div
    class="cascad-menu"
    ref="cascadMenu"
  >
    <scroll
      class="left-menu"
      :data="menus"
      ref="leftMenu"
    >
      <div class="left-menu-container">
        <ul>
          <li
            class="left-item"
            ref="leftItem"
            :class="{'current': currentIndex == index}"
            @click="selectLeft(index, $event)"
            v-for="(menu, index) in menus"
            :key="index"
          >
            <p class="text">{{menu.name}}</p>
          </li>
        </ul>
      </div>
    </scroll>
    <scroll
      class="right-menu"
      :data="menus"
      ref="rightMenu"
      @scroll="scrollHeight"
      :listenScroll="true"
      :probeType="3"
    >
      <div class="right-menu-container">
        <ul>
          <li
            class="right-item"
            ref="rightItem"
            v-for="(menu, index) in menus"
            :key="index"
          >
            <div class="title">{{menu.name}}</div>
            <ul>
              <li
                v-for="(item, index) in menu.data"
                :key="index"
              >
                <div class="data-wrapper">
                  <div class="data">{{item.food_name}}</div>
                  <div class="price">{{item.price}}</div>
                  <div class="desc">{{item.description}}</div>
                  <p>
                    <van-icon
                      name="minus"
                      @click="sub(item,item.sales)"
                    />
                    <input
                      type="number"
                      :value="item.sales"
                      disabled
                    >
                    <van-icon
                      name="plus"
                      @click="add(item,item.sales)"
                    />
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </scroll>
    <div @click="submit">提交</div>
  </div>
</template>

<script>
import Scroll from "./scroll.vue";
export default {
  components: {
    Scroll,
  },
  props: {
    menus: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      rightTops: [],
      scrollY: 0,
      leftScrollY: 0,
      foodList: [],
    };
  },
  computed: {
    currentIndex() {
      // 当用户在滚动时，需要计算当前滚动距离在哪个(右边li块)区间内，并拿到它的 `index`
      const { scrollY, rightTops } = this;
      let index = rightTops.findIndex((height, index) => {
        return scrollY >= rightTops[index] && scrollY < rightTops[index + 1];
      });
      if (scrollY > rightTops[index] + 50) {
        index++;
      }
      return index;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._calculateHeight();
    });
  },
  methods: {
    //减少菜品的数量
    sub(row, num) {
      if (num > 0) row.sales--;
      this.foodList.push({
        food_num: row.sales,
        price: row.price,
        id: row.id,
      });
    },
    //增加菜品数量
    add(row, num) {
      if (num < 5) {
        row.sales++;
      } else {
        this.$toast.fail("最多选择5份");
      }
      this.foodList.push({
        food_num: row.sales,
        price: row.price,
        id: row.id,
      });
    },
    //先判断数组中是否存在相同ID的对象，存在用splice(index,1,objs)替换掉
    //不存在直接arr1.push(objs)
    //难点：获取到对应的index
    //最开始的需求是一个对象数组去重，保留后面重复元素
    unique(arr, name) {
      let hash = {};
      return arr.reduce(function (acc, cru, index) {
        if (!hash[cru[name]]) {
          hash[cru[name]] = { index: acc.length };
          acc.push(cru);
        } else {
          acc.splice(hash[cru[name]]["index"], 1, cru);
        }
        return acc;
      }, []);
    },
    //获取当前提交订单时间
    getCurrentTime() {
      let myDate = new Date();
      let currentTime = myDate.getTime(); //获取当前时间
      return currentTime;
    },
    //提交订单
    submit() {
      let dataList = this.unique(this.foodList, "id");
      this.$axios
        .post("/api/users/order", dataList)
        .then((res) => {
          this.$message.success("提交成功");
        })
        .catch((err) => {
          this.$message.error("提交失败");
        });
    },
    selectLeft(index, event) {
      // 添加`$event`是为了区分原生点击事件还是 better-scroll派发的事件
      if (!event._constructed) {
        return;
      }
      let rightItem = this.$refs.rightItem;
      let el = rightItem[index];
      this.$refs.rightMenu.scrollToElement(el, 300);
    },
    scrollHeight(pos) {
      this.scrollY = Math.abs(Math.round(pos.y));
    },
    _calculateHeight() {
      // 计算右边列表每一块的高度
      let lis = this.$refs.rightItem;
      let height = 0;
      this.rightTops.push(height);
      if (lis) {
        Array.from(lis).forEach((li) => {
          height += li.clientHeight;
          this.rightTops.push(height);
        });
      }
    },
  },
};
</script>

<style scoped>
.cascad-menu {
  display: flex;
  position: absolute;
  top: 44px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;
}
.left-menu {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}
.text {
  width: 100%;
  line-height: 54px;
}
.current {
  width: 200%;
  background: #fff;
}
.left-item {
  height: 54px;
  width: 100%;
}

.right-menu {
  flex: 1;
}
.data {
  line-height: 40px;
  height: 40px;
}
.title {
  border-bottom: 1px solid #ccc;
  color: #fc5531;
  height: 20px;
}
.right-item {
  height: 100%;
  border: 1px solid #ccc;
}
.desc {
  font-size: 12px;
}
.data-wrapper {
  border-bottom: 1px solid #ccc;
}
input {
  border: none;
  width: 30px;
  text-align: center;
}
</style>
