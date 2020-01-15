<template>
  <div id="index">
    <mt-header fixed title="首页" class="black">
      <span slot="left" class="shenpi" @click="goShenpi">
        <img src="../../../assets/img/icon_shenpi.png" height="45" width="44"/>
        <em class="s-p-tip">{{unauditedNum}}</em>
      </span>
    </mt-header>
    <main>
      <!-- 自定义时间选择 -->
      <date ref="date" type="3"></date>
      <mt-loadmore ref="loadmore">
        <!-- 总体数据 -->
        <section class="section">
          <!-- 对应的本组业绩 -->
          <section class="performance">
            <div class="all-process" v-if="dealAll">
              <div class="a-p-performance" >
                <p>{{ dealAll.dealMoney }}</p>
                <p>成交业绩(万元）</p>
              </div>
              <div class="a-p-radio">
                <p>{{ dealAll.dealRatio }}</p>
                <p>来访：成交</p>
              </div>
              <div class="a-p-number">
                <p>{{ dealAll.dealCount }}</p>
                <p>套数</p>
              </div>
            </div>
            <!-- 图片占坑 -->
            <!-- <img src="../../../assets/img/1111.png" width="375px"> -->
           <div v-if="chartData" class="chartdate">
              <span class="charttitle">本期业绩完成</span>
              <chart ref="chart"></chart>
           </div>
          </section>
          <!--  组员业绩 -->
          <section class="team-performance">
            <div class="all-list" v-if="dealClass">
              <div class="a-l-li" v-for="(item,index) in dealClass"
                   @click="toPlaceUser(item.statsField.userId)"
                   :key="index">
                <div class="left">
                  <img class="avater" :src="imageUrl + item.statsField.userImage" @error="imgErrorHandle($event,item.statsField.sex)" height="46" width="46"/>
                  <div>
                    <p class="name">{{item.statsField.userFullName}}</p>
                    <p class="data">预约:<span>{{item.statsField.reportCount}}</span>来访:<span>{{item.statsField.visitCount}}</span>认购:<span>{{item.statsField.dadingSubmitCount}}</span>签约:<span>{{item.statsField.signSubmitCount}}</span></p>
                  </div>
                </div>
                <div class="right"><img src="../../../assets/img/btn_right.png" height="14" width="8"/></div>
              </div>
            </div>
          </section>
        </section>
      </mt-loadmore>
    </main>
  </div>
</template>

<script>
import chart from '../../../components/chart.vue'
import date from '../../../components/dateFilter.vue'
export default {
  name: 'index',
  components: { chart, date },
  data () {
    return {
      type: 3,
      queryStartTime: null,
      queryEndTime: null,
      dealAll: null,
      dealClass: null,
      list: null,
      totalCount: '',
      topStatus: '',
      topDistance: 60,
      // 测试数据
      chartData: [],
      userIds: '',
      unauditedNum: 0,
      popupVisible: false,
      currentItem: '',
      currentItemId: this.$route.query.propertyId
    }
  },
  created () {
    this.getUnauditedNum()
    this.resetCountType(3)
  },
  methods: {
    async getAchievement (type) {
      let thisWeek = await this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: this.$route.query.managerId,
          roleType: 2,
          timeType: this.type,
          propertyIdList: this.currentItemId,
          queryStartTime: this.queryStartTime,
          queryEndTime: this.queryEndTime,

          fieldList: 'reportCount,visitCount,dadingSubmitCount,signSubmitCount'
        }
      })
      let lastWeek = await this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: this.$route.query.managerId,
          roleType: 2,
          timeType: +this.type + 1,
          propertyIdList: this.currentItemId,
          queryStartTime: this.queryStartTime,
          queryEndTime: this.queryEndTime,

          fieldList: 'reportCount,visitCount,dadingSubmitCount,signSubmitCount'
        }
      })
      let names = type === 3 ? '周' : type === 5 ? '月' : type === 7 ? '年' : '自定义'
      if (thisWeek.data.code === 200) {
        let { reportCount: report, visitCount: visit, dadingSubmitCount: dading, signSubmitCount: sign } = thisWeek.data.data[0].statsField
        let thisWeekDate = {
          name: type === 9 ? names : ('本' + names),
          data: [report, visit, dading, sign]
        }
        this.chartData = [thisWeekDate]
      }
      if (lastWeek.data.code === 200) {
        let { reportCount, visitCount, dadingSubmitCount, signSubmitCount } = lastWeek.data.data[0].statsField
        let lastWeekDate = {
          name: '上' + names,
          data: [reportCount, visitCount, dadingSubmitCount, signSubmitCount]
        }
        this.chartData = [lastWeekDate, ...this.chartData]
      }
      this.$refs.chart.drawBar(this.type, this.chartData)
    },
    async getDeal (type) {
      let res = await this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: this.$route.query.managerId,
          roleType: 2,
          timeType: type || this.type,
          propertyIdList: this.currentItemId,
          queryStartTime: this.queryStartTime,
          queryEndTime: this.queryEndTime,
          fieldList: 'dealCount,dealMoney,dealRatio'
        }
      })
      if (res.data.code === 200) {
        this.dealAll = res.data.data[0].statsField
        this.dealAll.dealMoney = this.dealAll.dealMoney.toFixed(2)
      };
    },
    // 获取未审批数量
    async getUnauditedNum () {
      let res = await this.$axios.get(this.acApi + '/manager-homePage/v1', {
        params: {
          managerId: this.$route.query.managerId,
          propertyId: this.$route.query.propertyId
        }
      })
      if (res.data.code === 200) {
        this.unauditedNum = res.data.data.unauditedNum
      }
    },
    // 获取员工列表
    async getStaffList (type) {
      let res1 = await this.$axios.get(this.hrApi + '/outside/v1/child-data/' + this.$route.query.managerId, {
        params: {
          roleType: 2,
          timeType: type || this.type,
          childDataType: 1,
          queryStartTime: this.queryStartTime,
          queryEndTime: this.queryEndTime
        }
      })
      let userList = res1.data.data
      let res2 = await this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: userList.join(),
          propertyIdList: this.currentItemId,
          roleType: 1,
          timeType: this.type,
          queryStartTime: this.queryStartTime,
          queryEndTime: this.queryEndTime,
          managerId: this.$route.query.managerId,
          managerRoleType: 2,
          fieldList: 'reportCount,visitCount,dadingSubmitCount,signSubmitCount'
        }
      })
      this.dealClass = res2.data.data
      this.dealClass.forEach((item, i) => {
        this.dealClass[i].statsField.userId = userList[i]
      })
    },
    resetCountType (num, time) {
      this.type = num
      if (time) {
        this.queryStartTime = time.startTime
        this.queryEndTime = time.endTime
      }
      this.getDeal()
      this.getAchievement(num)
      this.getStaffList()
    },
    toPlaceUser (id) {
      let { type, startTime, endTime, $route: { query: { propertyId, managerId } } } = this
      let route = `/placeUser/${id}/${propertyId}?type=${type}&startTime=${startTime}&endTime=${endTime}&managerId=${managerId}`
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebIndex + route)
      } else { // pc && IOS
        this.$router.push(route)
      }
    },
    goShenpi () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebIndex + '/approval?managerId=' + this.$route.query.managerId + '&propertyId=' + this.$route.query.propertyId + '&userName=' + encodeURI(this.$route.query.userName))
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.yincang.postMessage({ 'body': this.acjlWebIndex + '/approval?managerId=' + this.$route.query.managerId + '&propertyId=' + this.$route.query.propertyId + '&userName=' + encodeURI(this.$route.query.userName) })
      } else { // pc
        this.$router.push('/approval?managerId=' + this.$route.query.managerId + '&propertyId=' + this.$route.query.propertyId + '&userName=' + this.$route.query.userName)
      }
    },
    changeType (type) {
      this.type = type
    },
    imgErrorHandle (e, sex) {
      let img = e.target
      // 根据性别更改默认图片
      img.src = sex === 1 ? require('../../../assets/img/profile_img_head_woman@2x.png') : require('../../../assets/img/profile_img_head_man@2x.png')
    }
  }
}
</script>

<style scoped lang="scss">
  @import './../../../assets/commen.scss';
  main{
    -webkit-overflow-scrolling: touch;
  }
  .popup {
    width: 100%;
    .pop-action{
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      top: 0;
      display: flex;
      margin: 0 20px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(244, 243, 244, 1);
    }
  }
  .list-manager {
    width: 100%;
    max-height: 217px;
    overflow-y: scroll;
    ul > li {
      padding: 12px 20px;
      text-align: center;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .list-manager-out {
      color: #999999;
    }
  }
  .section {
    background:rgba(243,243,243,1);
    padding: 0;
    .team-performance {
      background-color: #fff;
    }
  }
  .performance {
      background-color: #fff;
      text-align: center;
      margin: 20px 0;
      box-shadow:0px 2px 4px 0px rgba(0,0,0,0.04);
      .all-process {
        box-sizing: border-box;
        display: flex;
        height: 84px;
        padding: 24px 20px 0;
        background: #fff;
        border-bottom: 1px solid rgba(221,221,221,1);
        .a-p-performance {
          flex-basis: 40%;
        }
        .a-p-radio {
          flex-basis: 30%;
          flex-grow: 1;
        }
        .a-p-number {
          flex-basis: 30%;
        }
        p:first-child {
          font-size: 24px;
          font-weight: bold;
          font-family:DINAlternate-Bold;
          color: #FF6A00;
          line-height:24px;
          -webkit-text-stroke:1px rgba(255,106,0,1);
        }
        p:last-child {
          font-size: 12px;
          line-height: 28px;
          color: #999999;
        }
      }
      .chartdate{
        text-align: left;
        padding-top: 26px;
        .charttitle{
        width:96px;
        height:16px;
        font-size:16px;
        padding-left: 20px;
        font-family:PingFang-SC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:16px;
      }
      }
    }

  .a-l-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 16px 20px;
    border-top: 1px solid #f3f3f3;
    position: relative;
    .left {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
    }
    .avater {
      border-radius: 50%;
      margin-right: 12px;
      overflow: hidden;
      background: #999999;
      width: 46px;
      height: 46px;
    }
    .name {
      font-size: 16px;
      font-weight: bold;
    }
    .data {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      color: #999;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        color: #ff6a00;
        font-weight: bold;
        margin: 0 8px 0 3px;
        line-height: 29px;
        max-width: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right {
      position: absolute;
      top: 33px;
      right: 20px;
    }
  }
  .shenpi {
    position: relative;
    top: 0;
    height: 44px;
    display: inline-block;
    vertical-align: middle;
    .s-p-tip {
      position: absolute;
      right: -6px;
      top: 5px;
      line-height: 16px;
      font-style: normal;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      background: #ff4848;
      font-size: 12px;
      text-align: center;
    }
  }
</style>
