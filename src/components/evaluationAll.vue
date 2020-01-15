<template>
  <div class="outerBox">
    <ul class="list-ul"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="80">
      <li v-for = "(item,index) in qddata" :key="index">
        <div class="top">
          <p class="name">{{item.name}}<span class="time">{{item.createTime}}</span></p>
          <div class="star">
             <p class="starScore">
              <img v-for="k in Math.floor(item.starScore)" :key="k" src="../assets/img/yeji_ic_star_yellow.png">
              <img v-if="item.starScore-Math.floor(item.starScore) !== 0" src="../assets/img/yeji_ic_star_half.png">
              <img v-for="k in (5-Math.ceil(item.starScore))" :key="k" src="../assets/img/yeji_ic_star_grey.png">
              &nbsp;<span class="scoreColor">{{item.starScore===0?'未评价':item.starScore}}</span>
              <span class="company">{{item.abbreviation}}</span>
            </p>
          </div>
        </div>
        <div class="bottom">
          <div class="bottomTop">
            <span>客户接待&nbsp;:&nbsp;&nbsp;{{item.attitude}}</span>
            <span>专业知识&nbsp;:&nbsp;&nbsp;{{item.ability}}</span>
          </div>
          <div class="bottomBot">
            <span>销售技巧&nbsp;:&nbsp;&nbsp;{{item.experience}}</span>
            <span>渠道服务&nbsp;:&nbsp;&nbsp;{{item.channelService}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'evaluation-all',
  data () {
    return {
      qddata: [],
      pageNo: 1,
      loading: false,
      shouldLoad: true
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#fff')
  },
  methods: {
    getPingjia () {
      this.loading = true
      this.Indicator.open()
      this.$axios.get(this.acApi + '/visit-comment/v1/list' + '?anchangId=' + this.$route.params.placeUserId + '&pageSize=5' + '&pageNo=' + this.pageNo).then(res => {
        if (res.data.code === 200) {
          if (this.pageNo === 1) {
            this.qddata = res.data.data.list
          } else {
            this.qddata = this.qddata.concat(res.data.data.list)
          }
          if (res.data.data.list.length === 0) {
            this.shouldLoad = false
          }
          this.loading = false
          this.Indicator.close()
        }
      })
    },
    loadMore () {
      if (this.shouldLoad) {
        this.pageNo++
        this.getPingjia()
      }
    }
  },

  created () {
    this.getPingjia()
  }
}

</script>
<style scoped lang="scss">
  .outerBox {
    //margin-top: 44px;
    background-color: #fff;
    padding: 21px 20px 0 20px;
  }
  .list-ul {
    height: 100%;
    background-color: #fff;
    font-size: 16px;
    li {
      margin-bottom: 20px;
    }
    .top {
      margin-bottom: 8px;
    }
    .name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 9px;
      font-size: 16px;
      font-weight: bold;
      .time {
        font-weight: normal;
        color: #999999;
      }
    }
  }
  .bottom {
    background-color: #F3F3F3;
    color: #999999;
    padding: 16px 0 16px 8px;
    bottom: 76px;
  }
  .bottom .bottomTop{
    display: flex;
    margin: 0 0 12px 0;
    span {
      flex: 1;
    }
  }
  .bottom .bottomBot{
    display: flex;
    span {
      flex: 1;
    }
  }
  .starScore {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .scoreColor {
    color: #FF9B3A;
    flex: 1;
  }
  .company {
    color: #999;
  }
</style>
