<template>
  <div>
    <mt-header fixed title="检索结果" class="white">
      <span @click="$router.back()" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24"/>
      </span>
    </mt-header>
    <main>
    <ul class="list-ul"
        :infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="80"
        >
        <div v-if="reportCount !== 0">
          <p class="title">预约&nbsp;:&nbsp;&nbsp;{{reportCount}}
          </p>
          <li v-for="item in CtReportList"
            :key="item.id"
            @click="goDetail(item.id)"
            >
            <div class="left">
              <p class="name">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="checking"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '审核中'">
                <img src="../../../assets/img/icon_checking.png" width="16" height="16"/>{{item.examineState}}</span>
                <span class="checking" style="color: #FF5555"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '驳回'">
                <img src="../../../assets/img/icon_reject.png" width="16" height="16"/>{{item.examineState}}</span>
              </p>
              <p class="qudao">
                <span class="inline-flex">
                  <img src="../../../assets/img/icon_qudao.png" width="15"/>{{item.companyAbbreviation || '自访'}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '0'">
                  <img src="../../../assets/img/icon_car.png" width="15"/>{{item.transportMode}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '1'">
                  <img src="../../../assets/img/icon_1fang.png" width="15"/>{{item.visitCount}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '2'">
                  <img src="../../../assets/img/icon_order.png" width="15"/>认购</span>
                <span class="inline-flex" v-if="item.customerState == '3'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>草签</span>
                <span class="inline-flex" v-if="item.customerState == '4'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>正签</span>
              </p>
            </div>
            <div class="right">
              <p class="time">{{item.operationTime}}</p>
              <p class="inline-flex"><img src="../../../assets/img/icon_person.png" height="16" width="15"/>{{item.salesUserName}}
              </p>
            </div>
          </li>
          <p class="seeAll" v-if='reportList.length > 5' @click ="reportIsShowFun()">{{reportIsShow ? '收起':'查看全部'}}</p>
        </div>
        <div v-if="visitCount !== 0">
          <p class="title">来访&nbsp;:&nbsp;&nbsp;{{visitCount}}</p>
          <li v-for="item in CtVisitList"
              :key="item.id"
              @click="goDetail(item.id)"
          >
            <div class="left">
              <p class="name">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="checking"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '审核中'">
                <img src="../../../assets/img/icon_checking.png" width="16" height="16"/>{{item.examineState}}</span>
                <span class="checking" style="color: #FF5555"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '驳回'">
                <img src="../../../assets/img/icon_reject.png" width="16" height="16"/>{{item.examineState}}</span>
              </p>
              <p class="qudao">
                <span class="inline-flex">
                  <img src="../../../assets/img/icon_qudao.png" width="15"/>{{item.companyAbbreviation || '自访'}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '0'">
                  <img src="../../../assets/img/icon_car.png" width="15"/>{{item.transportMode}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '1'">
                  <img src="../../../assets/img/icon_1fang.png" width="15"/>{{item.visitCount}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '2'">
                  <img src="../../../assets/img/icon_order.png" width="15"/>认购</span>
                <span class="inline-flex" v-if="item.customerState == '3'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>草签</span>
                <span class="inline-flex" v-if="item.customerState == '4'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>正签</span>
              </p>
            </div>
            <div class="right">
              <p class="time">{{item.operationTime}}</p>
              <p class="inline-flex"><img src="../../../assets/img/icon_person.png" height="16" width="15"/>{{item.salesUserName}}
              </p>
            </div>
          </li>
          <p class="seeAll" v-if='visitList.length>5' @click ="visitIsShowFun()">{{visitIsShow ? '收起':'查看全部'}}</p>
        </div>
        <div v-if="dadingCount !== 0">
          <p class="title">大定&nbsp;:&nbsp;&nbsp;{{dadingCount}}
          </p>
          <li v-for="item in CtDadingList"
              :key="item.id"
              @click="goDetail(item.id)"
          >
            <div class="left">
              <p class="name">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="checking"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '审核中'">
                <img src="../../../assets/img/icon_checking.png" width="16" height="16"/>{{item.examineState}}</span>
                <span class="checking" style="color: #FF5555"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '驳回'">
                <img src="../../../assets/img/icon_reject.png" width="16" height="16"/>{{item.examineState}}</span>
              </p>
              <p class="qudao">
                <span class="inline-flex">
                  <img src="../../../assets/img/icon_qudao.png" width="15"/>{{item.companyAbbreviation || '自访'}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '0'">
                  <img src="../../../assets/img/icon_car.png" width="15"/>{{item.transportMode}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '1'">
                  <img src="../../../assets/img/icon_1fang.png" width="15"/>{{item.visitCount}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '2'">
                  <img src="../../../assets/img/icon_order.png" width="15"/>认购</span>
                <span class="inline-flex" v-if="item.customerState == '3'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>草签</span>
                <span class="inline-flex" v-if="item.customerState == '4'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>正签</span>
              </p>
            </div>
            <div class="right">
              <p class="time">{{item.operationTime}}</p>
              <p class="inline-flex"><img src="../../../assets/img/icon_person.png" height="16" width="15"/>{{item.salesUserName}}
              </p>
            </div>
          </li>
          <p class="seeAll" v-if='dadingCount>5' @click ="dadingIsShowFun()">{{dadingIsShow ? '收起':'查看全部'}}</p>
        </div>
        <div v-if="signCount !== 0">
          <p class="title">签约&nbsp;:&nbsp;&nbsp;{{signCount}}
          </p>
          <li v-for="item in CtSignList"
              :key="item.id"
              @click="goDetail(item.id)"
          >
            <div class="left">
              <p class="name">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="checking"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '审核中'">
                <img src="../../../assets/img/icon_checking.png" width="16" height="16"/>{{item.examineState}}</span>
                <span class="checking" style="color: #FF5555"
                      v-if="(managerCustomerParams.customerState === '2' || managerCustomerParams.customerState === '3') && item.examineState === '驳回'">
                <img src="../../../assets/img/icon_reject.png" width="16" height="16"/>{{item.examineState}}</span>
              </p>
              <p class="qudao">
                <span class="inline-flex">
                  <img src="../../../assets/img/icon_qudao.png" width="15"/>{{item.companyAbbreviation || '自访'}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '0'">
                  <img src="../../../assets/img/icon_car.png" width="15"/>{{item.transportMode}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '1'">
                  <img src="../../../assets/img/icon_1fang.png" width="15"/>{{item.visitCount}}</span>
                <span class="inline-flex" v-if="managerCustomerParams.customerState === '2'">
                  <img src="../../../assets/img/icon_order.png" width="15"/>认购</span>
                <span class="inline-flex" v-if="item.customerState == '3'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>草签</span>
                <span class="inline-flex" v-if="item.customerState == '4'">
                  <img src="../../../assets/img/icon_contract.png" width="15"/>正签</span>
              </p>
            </div>
            <div class="right">
              <p class="time">{{item.operationTime}}</p>
              <p class="inline-flex"><img src="../../../assets/img/icon_person.png" height="16" width="15"/>{{item.salesUserName}}
              </p>
            </div>
          </li>
          <p class="seeAll" v-if='signList.length>5' @click ="signIsShowFun()">{{signIsShow ? '收起':'查看全部'}}</p>
        </div>
    </ul>
    <div class="noSearch" v-if="(this.reportCount == 0 && this.visitCount == 0 && this.dadingCount == 0 && this.signCount == 0) && this.lock">
      <p class="noSearch-top">未找到</p>
      <p class="noSearch-bottom">相关信息,换个条件试试吧</p>
    </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'sousuo-result',
  data () {
    return {
      lock: false,
      loading: false,
      reportList: [],
      visitList: [],
      dadingList: [],
      signList: [],
      reportCount: 0,
      visitCount: 0,
      dadingCount: 0,
      signCount: 0,
      reportIsShow: false,
      visitIsShow: false,
      dadingIsShow: false,
      signIsShow: false,
      managerCustomerParams: {
        managerId: this.$route.query.managerId,
        customerName: this.$route.query.customerName,
        customerPhone: this.$route.query.customerPhone,
        companyName: this.$route.query.companyName,
        propertyId: this.$route.query.propertyId
      }
    }
  },
  created () {
    this.managerCustomer('0')
  },
  computed: {
    CtReportList () {
      return this.reportIsShow ? this.reportList : this.reportList.slice(0, 5)
    },
    CtVisitList () {
      return this.visitIsShow ? this.visitList : this.visitList.slice(0, 5)
    },
    CtDadingList () {
      return this.dadingIsShow ? this.dadingList : this.dadingList.slice(0, 5)
    },
    CtSignList () {
      return this.signIsShow ? this.signList : this.signList.slice(0, 5)
    }
  },
  methods: {
    managerCustomer () {
      if (this.popupVisible) {
        this.popupVisible = false
      }
      this.loading = true
      this.Indicator.open()
      this.$axios.get(this.acApi + '/manager-customer/v1/fuzzy', { params: this.managerCustomerParams }).then((res) => {
        if (res.data.status === 'success') {
          this.loading = false
          this.lock = true
          this.Indicator.close()
          if (!res.data.data.dadingCount) {
            this.dadingCount = 0
          }
          this.dadingCount = res.data.data.dadingCount
          this.dadingList = res.data.data.dadingList
          if (!res.data.data.reportCount) {
            this.reportCount = 0
          }
          this.reportCount = res.data.data.reportCount
          this.reportList = res.data.data.reportList
          if (!res.data.data.signCount) {
            this.signCount = 0
          }
          this.signCount = res.data.data.signCount
          this.signList = res.data.data.signList
          if (!res.data.data.visitCount) {
            this.visitCount = 0
          }
          this.visitCount = res.data.data.visitCount
          this.visitList = res.data.data.visitList
        } else {
          this.Toast(res.data.info)
          this.reportList = []
          this.visitList = []
          this.dadingList = []
          this.signList = []
        }
        this.Indicator.close()
      })
    },
    reportIsShowFun () {
      this.reportIsShow = !this.reportIsShow
    },
    visitIsShowFun () {
      this.visitIsShow = !this.visitIsShow
    },
    dadingIsShowFun () {
      this.dadingIsShow = !this.dadingIsShow
    },
    signIsShowFun () {
      this.signIsShow = !this.signIsShow
    },
    goDetail (id) {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebKehu + '/khDetail/' + id + '/' + this.$route.query.managerId + '/' + this.$route.query.propertyId)
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.yincang.postMessage({ 'body': this.acjlWebKehu + '/khDetail/' + id + '/' + this.$route.query.managerId + '/' + this.$route.query.propertyId })
      } else { // pc
        this.$router.push('/khDetail/' + id + '/' + this.$route.query.managerId + '/' + this.$route.query.propertyId)
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/sousuoBox') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  }
}
</script>
<style scoped lang="scss">
  .list-ul > div .title {
    height: 38px;
    color: #FF6A00;
    font-family: PingFang-SC;
    font-size: 16px;
    padding: 12px 20px 6px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list-ul > div:nth-child(1) {
    margin-top: 44px;
  }
  .list-ul li {
    height: 82px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    padding: 16px 20px;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    line-height: 1;
    margin-bottom: 4px;
    color: #999999;
    img {
      margin-right: 7px;
    }
    .left .name {
      font-weight: bold;
      font-size: 16px;
      color: #333333;
      margin-bottom: 15px;
    }
    .left .checking {
      font-size: 14px;
      color: #FFBC00;
      display: inline-flex;
      align-items: center;
    }
    .right .time {
      margin-bottom: 15px;
    }
  }
  .seeAll {
    height: 48px;
    background-color: #fff;
    font-size: 14px;
    color: #0076FF;
    text-align: center;
    line-height: 48px;
    text-decoration: none;
  }
  .inline-flex {
    display: inline-flex;
    align-items: center;
    &:nth-child(2n+1) {
      width: 110px;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    img {
      margin-right: 7px;
    }
  }
  .noSearch {
    margin-top: 124px;
    color: #C3C3C3;
    .noSearch-top {
      text-align: center;
      font-size: 18px;
      margin-bottom: 8px;
      font-weight: bold;
    }
    .noSearch-bottom {
      text-align: center;
      font-size: 14px;
    }
  }
</style>
