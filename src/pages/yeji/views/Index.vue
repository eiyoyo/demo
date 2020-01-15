<template>
  <div id="index">
    <mt-header title="业绩" class="black"></mt-header>
    <main>
      <section class="section">
        <div class="all-yeji" v-if="dealAll">
          <div class="a-y-number">
            <p class="title">房源销控</p>
            <p>剩余体量：<span>{{dealAll.saleNum}}套</span></p>
            <p>成交数量：<span>{{dealAll.dealCount}}套</span></p>
            <p>成交金额：<span>{{dealAll.dealMoney | formatMoney}}万元</span></p>
          </div>
          <div style="text-align: center;">
            <div class="a-y-bing">
              <span></span>
              <span></span>
              <p class="a-y-b-txt">
                <b style="font-size: 18px;width: 100%;display: inline-block;">{{dealAll.degradationRate}}%</b>
                <font style="font-size: 12px">去化率</font></p>
            </div>
            <p style="font-size: 12px;color: #999999;margin-top: 5px">{{dealAll.openMonths}}</p>
          </div>
        </div>
      </section>
      <section class="section">
        <p class="h2">重点跟进</p>
        <div class="filter-value" v-if="adFollowData">
          <p @click="goList(1)">
            <span class="value-title titleActive">未签约套数<br></span>
            <span class="value-number">{{adFollowData.dadingOutTimeNoSignCount}}</span>
          </p>
          <p><span class="value-title">未签约金额（万元）<br></span><span
            class="value-number">{{adFollowData.dadingOutTimeNoSignMoney | formatMoney}}</span></p>
        </div>
        <div class="filter-value" v-if="adFollowData">
          <p @click="goList(2)"><span class="value-title titleActive">未全款套数<br></span><span
            class="value-number">{{adFollowData.noFullPaymentSignCount}}</span></p>
          <p><span class="value-title">未全款金额（万元）<br></span><span
            class="value-number">{{adFollowData.noFullPaymentSignMoney | formatMoney}}</span></p>
        </div>
      </section>
      <section class="section">
        <div class="h2 h2_date">业绩总览
          <date ref="date" class="dateSelect" type='3'></date>
        </div>
        <div class="filter-value" v-if="achievementInfo">
          <p><span class="value-title">成交金额（万元）<br></span><span
            class="value-number">{{achievementInfo.dealMoney | formatMoney}}</span></p>
          <p><span class="value-title">回款金额（万元）<br></span><span
            class="value-number">{{achievementInfo.paymentSubmitMoney | formatMoney}}</span></p>
        </div>
        <div class="filter-value small" v-if="achievementInfo">
          <p><span class="value-title">报备:</span>
            <span class="value-number">{{achievementInfo.reportCount}}</span></p>
          <p><span class="value-title">来访:</span>
            <span class="value-number">{{achievementInfo.visitCount}}</span></p>
          <p><span class="value-title">认购:</span>
            <span class="value-number">{{achievementInfo.dadingSubmitCount}}</span></p>
          <p><span class="value-title">签约:</span>
            <span class="value-number">{{achievementInfo.signSubmitCount}}</span></p>
        </div>
      </section>
      <section class="section">
        <p class="h2">业绩走势</p>
        <div class="chart-value">
          <Chart ref="Chart"></Chart>
        </div>
      </section>
      <section class="section">
        <div class="people-yeji">
          <p class="h2">员工业绩</p>
          <div class="table-header">
            <table>
              <tr><th>组员</th></tr>
              <tr v-for="(item,index) in achievementList" :key="index">
                <td @click="goPlaceUser(item.userId)">
                  <span>{{item.userFullName}}</span>
                </td>

              </tr>
            </table>
          </div>
          <div class="table-value">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <!-- <th style="line-height: 45px;">组员</th> -->
                <th @click="resetList('reportCount')">
                  <span :class="{'active':active === 'reportCount'}">预约</span>
                  <span v-if="active === 'reportCount'">
                    <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
                <th @click="resetList('visitCount')">
                  <span :class="{'active':active === 'visitCount'}">来访</span>
                  <span v-if="active === 'visitCount'">
                  <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
                <th @click="resetList('dadingSubmitCount')">
                  <span :class="{'active':active === 'dadingSubmitCount'}">大定</span>
                  <span v-if="active === 'dadingSubmitCount'">
                    <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
                <th @click="resetList('dealMoney')">
                  <span :class="{'active':active === 'dealMoney'}">大定金额(万元)</span>
                  <span v-if="active === 'dealMoney'">
                  <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
                <th @click="resetList('signSubmitCount')">
                  <span :class="{'active':active === 'signSubmitCount'}">签约</span>
                  <span v-if="active === 'signSubmitCount'">
                  <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
                <th @click="resetList('signSubmitMoney')">
                  <span :class="{'active':active === 'signSubmitMoney'}">签约金额(万元)</span>
                  <span v-if="active === 'signSubmitMoney'">
                    <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
                <th @click="resetList('dealRatioNum')">
                  <span :class="{'active':active === 'dealRatioNum'}">成交比</span>
                  <span v-if="active === 'dealRatioNum'">
                    <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
                <th @click="resetList('paymentSubmitMoney')">
                  <span :class="{'active':active === '8'}">回款金额(万元)</span>
                  <span v-if="active === 'paymentSubmitMoney'">
                    <img src="../../../assets/img/tail-up.png" :class="{'active':sortType ==='1'}"/>
                  </span>
                  <span v-else><img src="../../../assets/img/tail-up-gray.png"/></span>
                </th>
              </tr>
              <tr v-for="(item,index) in achievementList" :key="index">
                <!-- <td @click="goPlaceUser(item.userId)">
                  <span>{{item.userName}}</span>
                </td> -->
                <td><span>{{item.reportCount}}</span></td>
                <td><span>{{item.visitCount}}</span></td>
                <td><span>{{item.dadingSubmitCount}}</span></td>
                <td><span>{{item.dealMoney | formatMoney}}</span></td>
                <td><span>{{item.signSubmitCount}}</span></td>
                <td><span>{{item.signSubmitMoney | formatMoney}}</span></td>
                <td><span>{{item.dealRatio}}</span></td>
                <td><span>{{item.paymentSubmitMoney | formatMoney}}</span></td>
              </tr>
            </table>
          </div>
        </div>
        <div style="width:100%;height:1px;clear:both;"></div>
      </section>
    </main>
  </div>
</template>

<script>
import 'v-charts/lib/style.css'
import Chart from '../../../components/chart'
import date from '../../../components/dateFilter.vue'

export default {
  name: 'index',
  components: { Chart, date },
  data () {
    return {
      achievementInfo: undefined,
      adFollowData: [], // 重点跟进
      achievementList: [],
      active: 'dealMoney', // 默认大定金额
      type: '3', // 时间筛选 3:本周 5:本月 7:本年 9:自定义
      startTime: '', // 自定义开始时间
      endTime: '', // 自定义结束时间
      oldActive: 'dealMoney', // 默认大定金额
      sortType: '2',

      loading: true,
      dealAll: {},
      childUserList: []// 组员id集合
    }
  },
  filters: {
    formatMoney (number) {
      if (String(number).indexOf('.') !== -1) {
        return number.toFixed(2)
      } else {
        return number
      }
    }
  },
  methods: {
    resetCountType (num, thisdate) {
      this.type = num
      if (num === 9) {
        this.startTime = thisdate.startTime
        this.endTime = thisdate.endTime
      }
      this.getAllYeji()
      this.getChilduser()
    }, // 时间维度(3:本周 5:本月 7:本年 9:自定义)
    getDeal () {
      this.$axios.get(this.acApi + '/manager-achievement/v2/xiaokong', {
        params: {
          propertyId: this.$route.query.propertyId
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.dealAll.degradationRate = res.data.data.degradationRate
          this.dealAll.saleNum = res.data.data.saleNum
          this.dealAll.openMonths = res.data.data.openMonths
        }
      })

      this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: this.$route.query.managerId,
          roleType: 2,
          propertyIdList: this.$route.query.propertyId,
          fieldList: 'dadingOutTimeNoSignCount,dadingOutTimeNoSignMoney,noFullPaymentSignCount,noFullPaymentSignMoney',
          timeType: 0
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.adFollowData = res.data.data[0].statsField
        }
      })// 重点跟进

      this.$axios.get(this.sjzxApi + '/stats/property', {
        params: {
          propertyIdList: this.$route.query.propertyId,
          fieldList: 'dealCount,dealMoney',
          timeType: 0
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.dealAll.dealCount = res.data.data[0].statsField.dealCount
          this.dealAll.dealMoney = res.data.data[0].statsField.dealMoney
        }
      })// 获取销控成交
    }, // 获取重点跟进和房源销控
    getAllYeji () {
      this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: this.$route.query.managerId,
          roleType: 2,
          propertyIdList: this.$route.query.propertyId,
          fieldList: 'reportCount,visitCount,dealMoney,dadingSubmitCount,signSubmitCount,paymentSubmitMoney,visitTrend,dealTrend',
          timeType: this.type, // (1为本日,2为上周,3为本周,4为本月,5为本年,6为全部)
          queryStartTime: this.startTime,
          queryEndTime: this.endTime
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.achievementInfo = res.data.data[0].statsField

          let visitTrend = res.data.data[0].statsField.visitTrend
          let dealTrend = res.data.data[0].statsField.dealTrend
          this.$refs.Chart.drawLine(2, [visitTrend, dealTrend])

          this.loading = false
        }
      })
    }, // 业绩总览，业绩走势
    getChilduser () {
      this.$axios.get(this.hrApi + '/outside/v1/child-data/' + this.$route.query.managerId, {
        params: {
          roleType: 2,
          childDataType: 1,
          timeType: this.type,
          queryStartTime: this.startTime, // 否 String 查询开始时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
          queryEndTime: this.endTime // 否 String 查询结束时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
        }
      }).then(res => {
        this.childUserList = res.data.data
        if (res.data.code === 200 && res.data.data.length !== 0) {
          this.$axios.get(this.sjzxApi + '/stats/user', {
            params: {
              userIdList: (this.childUserList.join(',')),
              roleType: 1,
              managerId: this.$route.query.managerId,
              managerRoleType: 2,
              propertyIdList: this.$route.query.propertyId,
              fieldList: 'reportCount,visitCount,dadingSubmitCount,dealMoney,signSubmitCount,signSubmitMoney,dealRatio,paymentSubmitMoney',
              timeType: this.type,
              queryStartTime: this.startTime, // 否 String 查询开始时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
              queryEndTime: this.endTime // 否 String 查询结束时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
            }
          }).then(res => {
            if (res.data.code === 200) {
              var list = []
              res.data.data.forEach((item) => {
                item.statsField.dealRatioNum = parseInt(item.statsField.dealRatio.slice(0, 1))
                list.push(item.statsField)
              })
              this.achievementList = list
            }
          })
        } else {

        }
      })
    }, // 获取组员业绩
    resetList (type) {
      this.oldActive = this.active
      this.active = type
      if ((this.active === this.oldActive) && this.sortType === '1') { // 正序---反序
        this.sortType = '2'
        this.achievementList.sort((a, b) => {
          return b[type] - a[type]
        })
      } else if ((this.active === this.oldActive) && this.sortType === '2') { // 反序---正序
        this.sortType = '1'
        this.achievementList.sort((a, b) => {
          return a[type] - b[type]
        })
      } else { // 切换 排序
        this.sortType = '1'
        this.achievementList.sort((a, b) => {
          return a[type] - b[type]
        })
      }
    }, // 组员业绩排序
    goList (num) {
      let { acjlWebYeji, $route: { query: { propertyId, managerId } } } = this

      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        if (num === 1) {
          // eslint-disable-next-line no-undef
          AndroidWebView.open(acjlWebYeji + '/list/noSign?propertyId=' + propertyId + '&userId=' + managerId)
        } else if (num === 2) {
          // eslint-disable-next-line no-undef
          AndroidWebView.open(acjlWebYeji + '/list/noPay?propertyId=' + propertyId + '&userId=' + managerId)
        }
      } else { // pc && IOS
        if (num === 1) {
          this.$router.push('/list/noSign?propertyId=' + this.$route.query.propertyId + '&userId=' + this.$route.query.managerId)
        } else if (num === 2) {
          this.$router.push('/list/noPay?propertyId=' + this.$route.query.propertyId + '&userId=' + this.$route.query.managerId)
        }
      }
    }, // 未签约&未全款列表
    goPlaceUser (placeUserId) {
      let { type, startTime, endTime, $route: { query: { propertyId, managerId } } } = this
      let route = `/placeUser/${placeUserId}/${propertyId}?type=${type}&startTime=${startTime}&endTime=${endTime}&managerId=${managerId}`

      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebYeji + route)
      } else { // pc && IOS
        this.$router.push(route)
      }
    }// 跳转到个人业绩
  },
  mounted () {
    this.getDeal()
    this.getAllYeji()
    this.getChilduser()
  }
}
</script>

<style scoped lang="scss">

.dateSelect{
  width: 65%;
  margin-top: -6px;
  position: absolute;
  right: 0;
  top: -6px;
}
  .section.time {
    padding: 8px 0;
  }

  .all {
    text-align: center;
    padding-top: 20px;
  }

  .all-yeji {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .a-y-number {
      font-size: 16px;
      p {
        padding: 8px 0;
        color: #999999;
      }
      .title {
        color: #333333;
        font-weight: bold;
      }
      span {
        font-weight: bold;
        color: #FF6A00;
      }
    }
  }

  .a-y-bing {
    position: relative;
    display: inline-block;
    background: #f3f3f3;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    overflow: hidden;
    span {
      display: block;
      width: 100%;
      height: 0;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 0;
      &:first-child {
        background: url("../../../assets/img/canvas_bg1.png") no-repeat center top;
        background-size: 100%;
        animation: fall1 2s ease-in-out 0.1s;
        animation-fill-mode: forwards;
      }
      &:nth-child(2) {
        background: url("../../../assets/img/canvas_bg2.png") no-repeat center top;
        background-size: 100%;
        animation: fall2 2s ease-in-out;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes fall1 {
    0% {
      height: 0;
      background-size: 400%;
    }
    100% {
      height: 53px;
      background-size: 100%;
    }
  }

  @keyframes fall2 {
    0% {
      height: 0;
      background-size: 300%;
    }
    100% {
      height: 53px;
      background-size: 100%;
    }
  }

  .a-y-b-txt {
    text-align: center;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .filter-value.small {
    flex-wrap: wrap;
    border-top: 1px solid #f3f3f3;
    margin-top: 20px;
    > p {
      // margin-right: 8px;
      flex: none;
      width: 50%;
      white-space: nowrap;
      line-height: 26px;
    }
    > p:nth-child(1){
      padding-bottom: 5px;
    }
    > p:nth-child(2){
      padding-bottom: 5px;
    }
    .value-title {
      font-size: 14px;
      color: #999;
    }
    .value-number {
      font-size: 14px;
      color: #FF6A00;
      font-weight: normal;
    }
  }

  .filter-value {
    display: flex;
    padding: 20px 20px 0 20px;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    > P {
      flex: 1;
    }
    .value-title {
      font-size: 12px;
      color: #999;
    }
    .titleActive{
      color: #0076FF;
      border-bottom: 1px solid #0076FF;
    }
    .value-number {
      font-size: 20px;
      color: #FF6A00;
      font-weight: bold;
    }
  }
  .people-yeji {
    height: 100%;
    position: relative;
  }
.table-header{
  width: 30%;
}
.table-value{
  width: 70%;
    overflow-x: scroll;
}
.table-header{

    float: left;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 100%;
    box-sizing: border-box;
    table {
      height: 100%;
    width: 100%;
      word-break: break-all;
      font-size: 14px;
      line-height: 46px;
      text-align: center;
      border-collapse: collapse;
      table-layout: fixed;
      tr {
        &:last-child .td {
          border-bottom: none;
        }
      }
      tr th {
        font-weight: bold;
        color: #999;
        padding: 0 8px;
        span.active {
          color: #333;
        }
      }
      tr td:first-child span {
        color: #0076FF;
        border-bottom: 1px solid #0076FF;
        text-align: left;
      }
      tr td{line-height:44px;}
      tr td, tr th {
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: -2px;
      }
      tr th:first-child, tr td:first-child {
        background: #ffffff;
        box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.04);
        box-sizing: border-box;
        padding-left: 18px;
        z-index: 1111;
        width: 80px;
      }

    }

}
  .table-value {
    float: left;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 100%;
    box-sizing: border-box;
    table {
      height: 100%;
      word-break: break-all;
      font-size: 14px;
      line-height: 46px;
      text-align: center;
      border-collapse: collapse;
      table-layout: fixed;
      background: #fff;
      tr {
        &:last-child .td {
          border-bottom: none;
        }
      }
      tr th {
        font-weight: bold;
        color: #999;
        padding: 0 8px;
        span.active {
          color: #333;
        }
      }
      tr td, tr th {
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        white-space: nowrap;
        overflow: hidden;
      }
      tr td:nth-child(2n-1):not(:first-child), tr th:nth-child(2n-1):not(:first-child) {
        background: #f8f6f6;
      }
      tr th img {
        width: 12px;
        height: 14px;
        transform: rotate(180deg);
        vertical-align: middle;
        transition: transform .2s;
        &.active {
          transform: rotate(0deg);
        }
      }
    }
  }

  .all-time {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    border: 1px solid #f3f3f3;
    span {
      width: 57px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: #999;
      font-weight: normal;
      &.active {
        color: #0076FF;
      }
      &:not(:last-child) {
        border-right: 1px solid #f3f3f3;
      }
    }
  }

  .h2 {
    padding: 0 20px 20px 20px;
    font-size: 16px;
    text-align: left;
    font-weight: bold;
    color: #333333;
    border-bottom: 1px solid #f3f3f3;
  }
  .h2_date {
    position: relative;
  }

</style>
