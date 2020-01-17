<template>
  <div id="place-user">
    <mt-header fixed title="个人业绩" class="white">
      <span @click="backHome" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24"/>
      </span>
    </mt-header>
    <main>
      <section class="section">
        <div class="p-u" v-if="placeUser">
          <div class="p-u-avater">
            <img v-if="placeUser.userImage != null && placeUser.userImage != ''" :src="imageUrl + placeUser.userImage"/>
            <img v-else-if="placeUser.userState == 2"
            src="../../../assets/img/profile_img_head_woman@2x.png"/>
            <img v-else src="../../../assets/img/profile_img_head_man@2x.png"/>
          </div>
          <div style="flex: 1">
            <p class="p-u-name" @click="phone(placeUser.phone)">
              {{placeUser.userName}}
              <span class="phone">{{placeUser.phone}}</span>
              <img src="../../../assets/img/icon_call.png" height="28" width="28"/>
            </p>
            <p class="starScore">
              <img v-for="k in Math.floor(starScore)" :key="k"
               src="../../../assets/img/yeji_ic_star_yellow.png">
              <img
              v-if="starScore-Math.floor(starScore) != 0"
               src="../../../assets/img/yeji_ic_star_half.png">
              <img v-for="k in (5-Math.ceil(starScore))" :key="k" src="../../../assets/img/yeji_ic_star_grey.png">
              &nbsp;<span v-if="starScore !=0" class="scoreColor">{{starScore}}</span>
              <span v-if="starScore ===0" class="scoreColorNone">未收到评价</span>
            </p>
            <p class="p-u-time"><i>{{placeUser.userStateStr}}</i>入职时间：{{placeUser.entryTime}}至{{ placeUser.userState == 1?'今': placeUser.leaveDate }}</p>
          </div>
        </div>
      </section>
        <div class="all">
          <date ref="date" :type='$route.query.type' class="dateSelect"></date>
        </div>

      <section class="section">
        <p class="h2">业绩总览
          <span style="float:right;color:#ddd" >
            <Icon svgName='chart' ref="Icon"></Icon>
          </span>
        </p>
        <div class="chart-value">
          <div v-show="chartActive == 1">
            <Chart ref="Chart1"></Chart>

          </div>
          <div v-show="chartActive == 2">
            <Chart ref="Chart2"></Chart>

          </div>
        </div>
      </section>
      <div class="yejiList">
        <ul>
          <h4 @click="reportListShow = !reportListShow">
            报备
            <span>{{ yjList.reportNum }}组</span>
            <Icon :svgName='reportListShow?"up":"down"'></Icon>
          </h4>
          <li v-show="reportListShow" @click="goDetails('baobeiDetail',item.id)" v-for="(item,index) in yjList.reportList" :key="index">
            <p>{{ item.customerName }}</p>
            <p>{{ item.updateTime }}</p>
            <img src="../../../assets/img/btn_right.png" height="14" width="8">
          </li>
        </ul>
        <ul>
          <h4 @click="visitListShow = !visitListShow">来访
            <span>{{ yjList.visitNum }}组</span>
            <Icon :svgName='visitListShow?"up":"down"'></Icon>
            </h4>
          <li v-show="visitListShow" @click="goDetails('laifangDetail',item.id)" v-for="(item,index) in yjList.visitList" :key="index">
            <p>{{ item.customerName }}</p>
            <p>{{ item.updateTime }}</p>
            <img src="../../../assets/img/btn_right.png" height="14" width="8">
          </li>
        </ul>
        <ul>
          <h4 @click="dadingListShow = !dadingListShow">认购 <span>{{ yjList.dadingNum }}组</span>
            <Icon :svgName='dadingListShow?"up":"down"'></Icon>
          </h4>
          <li v-show="dadingListShow" @click="goDetails('dadingDetail',item.id)" v-for="(item,index) in yjList.dadingList" :key="index">
            <p>{{ item.customerName }}</p>
            <p>{{ item.updateTime }}</p>
            <img src="../../../assets/img/btn_right.png" height="14" width="8">
          </li>
        </ul>
        <ul>
          <h4 @click="signListShow = !signListShow">签约 <span>{{ yjList.signNum }}组</span>
            <Icon :svgName='signListShow?"up":"down"'></Icon>
          </h4>
          <li v-show="signListShow" @click="goDetails(item.jyType == 4?'presignDetail':'signDetail',item.id)" v-for="(item,index) in yjList.signList" :key="index">
            <p>{{ item.customerName }}</p>
            <p>{{ item.updateTime }}</p>
            <img src="../../../assets/img/btn_right.png" height="14" width="8">
          </li>
        </ul>

      </div>
      <section class="section" style="padding: 0 20px;margin-top: 20px;">
        <p class=qudao>
          <span class="qdPingjia">渠道评价</span>
          <router-link
          v-if="(totalCount !=0)"
          class="allPj" :to="{path: '/EvaluationAllbox/'+this.$route.params.placeUserId }">全部评价({{this.totalCount}})</router-link>
        </p>
        <ul class="list-ul" v-if="(totalCount ===0)">
          <p class="nonePingjia">Ta还没有收到评价哦</p>
        </ul>
        <ul class="list-ul"
          v-if ="totalCount !== 0"
        >
          <li v-for = "(item,index) in qddata" :key="index">
            <div class="top">
              <p class="name">{{item.name}}<span class="time">{{item.createTime}}</span></p>
              <div class="star">
                <p class="starScore">
                  <img v-for="k in Math.floor(item.starScore)" :key="k" src="../../../assets/img/yeji_ic_star_yellow.png">
                  <img v-if="item.starScore-Math.floor(item.starScore) != 0" src="../../../assets/img/yeji_ic_star_half.png">
                  <img v-for="k in (5-Math.ceil(item.starScore))" :key="k" src="../../../assets/img/yeji_ic_star_grey.png">
                  &nbsp;
                  <span class="scoreColor">{{item.starScore===0?'未收到评价':item.starScore}}</span>
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
      </section>
    </main>
  </div>
</template>

<script>
import Chart from '../../../components/chart'
import Icon from '../../../components/icon'
import date from '../../../components/dateFilter.vue'

export default {
  name: 'place-user',
  components: {
    Chart,
    Icon,
    date
  },
  data () {
    return {
      starthtml: '',
      placeUser: {},
      // achievementInfo: undefined,
      pageSize: 20,
      anchangId: '',
      starScore: 0,
      qddata: [],
      totalCount: 0,
      legend: {
        textStyle: {
          color: '#999'
        }
      },
      textStyle: {
        color: '#999'
      },
      colors: ['#FF7A63', '#FFC639', '#0076FF'],
      chartData: {
        columns: ['日期', '来访', '成交'],
        rows: []
      },
      loading: false,
      dataEmpty: false,
      type: parseInt(this.$route.query.type), // 0:全部 1:今天 2:昨天 3:本周 4:上周 5:本月 6:上月 7:本年 8:去年 9:自定义
      startTime: this.$route.query.startTime, // 自定义开始时间
      endTime: this.$route.query.endTime, // 自定义结束时间

      barData: [],
      lineData: [],
      chartActive: 1, // 1折现图2柱状图
      chartActive1: 1, // 1折现图2柱状图

      yjList: {}, // 业绩列表
      reportListShow: false,
      visitListShow: false,
      dadingListShow: false,
      signListShow: false
    }
  },
  methods: {
    chartToggle (num) {
      this.chartActive1 = Number(num)
      if (num === 1) {
        this.getPlaceYeji()
      } else {
        this.getAllYeji()
      }
    },
    // 时间维度(3:本周 5:本月 7:本年 9:自定义)
    resetCountType (num, thisdate) {
      this.type = num
      if (num === 9) {
        this.startTime = thisdate.startTime
        this.endTime = thisdate.endTime
      }
      this.getList()
      if (this.chartActive1 === 1) {
        this.getPlaceYeji()
      } else {
        this.getAllYeji()
      }
    },
    getAllYeji () {
      this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: this.$route.params.placeUserId,
          roleType: 1,
          propertyIdList: this.$route.params.propertyId,
          fieldList: 'visitTrend,dealTrend',
          timeType: this.type, // (3:本周 5:本月 7:本年 9:自定义)
          queryStartTime: this.startTime, // 否 String 查询开始时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
          queryEndTime: this.endTime, // 否 String 查询结束时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
          managerId: this.$route.query.managerId,
          managerRoleType: 2

        }
      }).then(res => {
        if (res.data.code === 200) {
          let visitTrend = res.data.data[0].statsField.visitTrend
          let dealTrend = res.data.data[0].statsField.dealTrend
          this.lineData = [visitTrend, dealTrend]

          this.$refs.Chart1.drawLine(2, this.lineData)
          this.loading = false
        }
      })
    }, // 折线图数据
    getPlaceYeji () {
      this.$axios.get(this.sjzxApi + '/stats/user', {
        params: {
          userIdList: this.$route.params.placeUserId,
          roleType: 1,
          propertyIdList: this.$route.params.propertyId,
          fieldList: 'reportCount,visitCount,dadingSubmitCount,signSubmitCount',
          timeType: this.type, //
          queryStartTime: this.startTime, // 否 String 查询开始时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
          queryEndTime: this.endTime, // 否 String 查询结束时间（yyyy-MM-dd HH:mm:ss，时间筛选为自定义时才有效）
          managerId: this.$route.query.managerId,
          managerRoleType: 2
        }
      }).then(res => {
        if (res.data.code === 200) {
          var res1 = res.data.data[0].statsField

          if (this.type === 9) {
            var chartData = [
              { 'name': '自定义',
                data: [
                  res1.reportCount, res1.visitCount, res1.dadingSubmitCount, res1.signSubmitCount
                ] }]
            this.$refs.Chart2.drawBar(9, chartData)
          } else {
            var legName1 = '上周'
            var legName2 = '本周'
            switch (this.type) {
              case 3: legName1 = '上周'; legName2 = '本周'; break
              case 5: legName1 = '上月'; legName2 = '本月'; break
              case 7: legName1 = '去年'; legName2 = '本年'; break

              default:
                break
            }
            var barData = [
              { 'name': legName1, data: [] },
              { 'name': legName2,
                data: [
                  res1.reportCount, res1.visitCount, res1.dadingSubmitCount, res1.signSubmitCount
                ] }]
            this.$axios.get(this.sjzxApi + '/stats/user', {
              params: {
                userIdList: this.$route.params.placeUserId,
                roleType: 1,
                propertyIdList: this.$route.params.propertyId,
                fieldList: 'reportCount,visitCount,dadingSubmitCount,signSubmitCount',
                timeType: parseInt(this.type) + 1,
                managerId: this.$route.query.managerId,
                managerRoleType: 2
              }
            }).then(response => {
              if (response.data.code === 200) {
                var res2 = response.data.data[0].statsField
                barData[0].data = [
                  res2.reportCount, res2.visitCount, res2.dadingSubmitCount, res2.signSubmitCount
                ]
                this.$refs.Chart2.drawBar(this.type, barData)
              }
            })
          }
        }
      })
    }, // 柱状图数据
    getPlaceUser () {
      this.$axios.get(this.acApi + '/manager-homePage/v1/userInfo/' + this.$route.params.placeUserId).then(res => {
        if (res.data.code === 200) {
          this.placeUser = res.data.data
        }
      })
    },
    backHome () {
      var u = navigator.userAgent

      if (this.$route.query.from) {
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          // 安卓手机
          // eslint-disable-next-line no-undef
          AndroidWebView.backHome()
        } else if (u.indexOf('iPhone') > -1) {
          // 苹果手机
          window.webkit.messageHandlers.xianshi.postMessage('')
        } else {
          this.$router.back()
        }
      } else {
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          // 安卓手机
          // eslint-disable-next-line no-undef
          AndroidWebView.backHome()
        } else {
          this.$router.back()
        }
      }
    },
    phone (number) {
      if (!number) {
        this.Toast({
          message: '暂无电话',
          duration: 3000
        })
        return false
      }
      var u = navigator.userAgent
      if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.phone.postMessage({ 'body': number })
      } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.call(number)
      }
    },
    getQudao () {
      this.$axios.get(this.acApi + '/visit-comment/v1/list' + '?anchangId=' + this.$route.params.placeUserId + '&pageSize=5').then(res => {
        if (res.data.code === 200) {
          this.qddata = res.data.data.list
          this.totalCount = res.data.data.totalCount
        }
      })
    },
    getList () {
      this.$axios.get(this.acApi + '/manager-homePage/v2/userInfo/achievement?propertyId=' + this.$route.params.propertyId +
        '&userId=' + this.$route.params.placeUserId +
        '&managerId=' + this.$route.query.managerId +
        '&timeType=' + this.type +
        '&queryStartTime=' + this.startTime +
        '&queryEndTime=' + this.endTime
      ).then(res => {
        if (res.data.code === 200) {
          this.yjList = res.data.data
          console.log(res)
        }
      })
    }, // 个人业绩列表
    getStarScore () {
      this.$axios.get(this.acApi + '/visit-comment/v1/avgStarScore/' + this.$route.params.placeUserId).then(res => {
        if (res.data.code === 200) {
          this.starScore = res.data.data
        }
      })
    },
    getPingjia () {
      this.$axios.get(this.acApi + '/visit-comment/v1/list' + '?anchangId=' + this.$route.params.placeUserId + '&pageSize=5').then(res => {
        if (res.data.code === 200) {
          this.qddata = res.data.data.list
          this.totalCount = res.data.data.totalCount
        }
      })
    },
    goDetails (type, id) {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebKehu + '/' + type + '/' + id + '?from=other')
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.yincang.postMessage({ 'body': this.acjlWebKehu + '/' + type + '/' + id + '?from=other' })
      } else { // pc
        window.location.href = this.acjlWebKehu + '/' + type + '/' + id
      }
    }
  },
  mounted () {
    this.getPlaceYeji()
    this.getPlaceUser()
    this.getQudao()
    this.getStarScore()
    this.getList()
  },
  filters: {
    formatMoney (number) {
      if (String(number).indexOf('.') !== -1) {
        return number.toFixed(2)
      } else {
        return number
      }
    }
  }

}
</script>

<style scoped lang="scss">
  .all {
    text-align: center;
    padding: 10px 0;
    background: #fff;
    border-bottom: 1px solid #f3f3f3;
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

  .filter-value.small {
    flex-wrap: wrap;
    border-top: 1px solid #f3f3f3;
    margin-top: 20px;
    > p {
      margin-right: 8px;
      flex: none;
      white-space: nowrap;
      line-height: 26px;
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
    .value-number {
      font-size: 20px;
      color: #FF6A00;
      font-weight: bold;
    }
  }

  .table-value {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-left: 20px;
    width: calc(100% - 20px);
    overflow-x: scroll;
    // overflow-Y: scroll;
    table {
      table-layout: fixed;
      word-break: break-all;
      width: 545px;
      font-size: 14px;
      line-height: 46px;
      text-align: center;
      border-collapse: collapse;
      overflow: hidden;
      tr {
        position: relative;
        top: 0;
        left: 0;
      }
      tr th:first-child {
        font-weight: bold;
        color: #999;
      }
      tr th:first-child, tr td:first-child {
        width: 55px;
        position: absolute;
        left: 20px;
        z-index: 1;
        background: #ffffff;
      }
      tr td:not(:first-child), tr th:not(:first-child) {
        width: 70px;
      }
      tr td:first-child span {
        color: #0076FF;
        padding-bottom: 2px;
        border-bottom: 1px solid #0076FF;
        text-align: left;
      }
      tr td, tr th {
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }
    }
  }

  .p-u {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px 20px 20px;
    &-avater {
      margin-right: 16px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      background: #ddd;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-name {
      font-size: 20px;
      display: inline-flex;
      align-items: center;
      padding-bottom: 6px;
      .phone {
        color: #999999;
        font-size: 12px;
        margin-left: 16px;
        margin-right: 16px;
      }
    }
    &-time {
      font-size: 12px;
      color: #999;
    }
  }

  .h2 {
    padding: 0px 20px 20px 20px;
    font-size: 16px;
    text-align: left;
    font-weight: bold;
    color: #333333;
  }
  .section {
    margin-bottom: 16px !important;
    box-shadow: 0 16px 4px 0 rgba(0, 0, 0, 0.04);
  }

  .section:nth-child(4) {
    background-color: #fff;
    padding: 0px 20px;
    > p {
      display: flex;
      span:nth-child(1) {
        flex: 1;
      }
    }
  }
  .outerBox {
    margin: 17px 0 0 0 !important;
    padding: 0 !important;
  }
  .qudao {
    height: 56px;
    line-height: 56px;
    margin-top: 0;
    border-bottom: 1px solid #ccc;
    .qdPingjia {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }
    .allPj {
      text-decoration: none;
      font-size: 14px;
      color: #0076FF;
      float: right;
    }
  }

  .list-ul {
    height: 100%;
    background-color: #fff;
    font-size: 16px;
    margin-top: 16px;
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
    border: 1px solid #DEDEDE;
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
  .scoreColorNone {
    color: #DDDDDD;
    flex: 1;
  }
  .p-u-time {
    margin-top: 5px;
    i{
      padding: 1px 3px;
      color: #00B864;
      background: #DEF8F1;
      font-style: normal;
      margin-right: 5px;
    }
  }
  .company {
    color: #999;
  }
  .nonePingjia {
    margin-bottom: 20px;
    height: 56px;
    background-color: #F3F3F3;
    border: 1px solid #DEDEDE;
    font-size: 16px;
    text-align: center;
    line-height: 56px;
    color: #C3C3C3;
  }

// 业绩详情列表

.yejiList{
  background: #F3F3F3;
  ul{
    padding:8px 20px;
    margin-top: 6px;
    background: #fff;
  }
  h4{
    line-height: 48px;
    margin: 0;
    color: #333;
    font-weight: 600;
    font-size: 16px;
    span{
      margin-left:20px;
    }
    i{
      float: right;
    }
  }
  li{
    padding: 10px 0;
    line-height: 28px;
    font-size: 14px;
    color: #999;
    border-top: 1px solid #ddd;
    p:first-child{
      font-weight: 600;
      font-size: 16px;
    }
    img{
      float: right;
      margin-top: -35px;
      margin-right: 5px;
    }
  }
}
</style>
