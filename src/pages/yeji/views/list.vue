<template>
  <div class="list">
    <mt-header fixed :title="listTitle" class="white">
      <span @click="backHome" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24">
      </span>
    </mt-header>
    <main style="padding-top:15px;">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <ul
          class="list-ul"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="loading"
          infinite-scroll-immediate-check="false"
          infinite-scroll-distance="80"
        >
          <li v-for="(item,index) in listData" @click="goDetail(item)" :key="index">
            <div class="left">
              <p class="name">
                {{item.customerName}}
              </p>
              <p class="qudao">
                <span class="tag">
                    {{ $route.params.type=='noSign'?'认购': item.statusValueStr}}
                </span>
                <span class="tag">
                    {{item.propertyName}}&nbsp;
                    {{item.buildingName}}-{{item.unitName}}-{{item.houseName}}
                </span>
              </p>
            </div>
            <div class="right">
              <p class="time" :style="{color:$route.params.type=='noSign'?'':'#FF6A00'}">
                  {{ $route.params.type=='noSign'?'超签天数：'+item.outTimeDay: item.paymentRatio}}
              </p>
              <p class="inline-flex">
                {{item.saleUserName}}
              </p>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </main>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      listTitle: '未签约',
      loading: false,
      totalCount: 0,
      listData: {},
      salesUserName: '全组组员',
      listParams: {
        propertyId: this.$route.query.propertyId,
        managerId: this.$route.query.userId,
        pageNo: 1,
        pageSize: 10
      },
      outOrganization: [],
      inOrganization: []
    }
  },
  created () {
    this.managerCustomer()
  },
  methods: {
    backHome () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.backHome()
      } else { // pc && IOS
        this.$router.back()
      }
    },

    managerCustomer () {
      var dataUrl = ''
      if (this.$route.params.type === 'noSign') {
        this.listTitle = '未签约'
        dataUrl = '/manager-achievement/v1/nosign-list'
      } else if (this.$route.params.type === 'noPay') {
        this.listTitle = '未全款'
        dataUrl = '/manager-achievement/v1/noFullPayment-list'
      }
      this.loading = true
      this.Indicator.open()
      this.$axios
        .get(this.acApi + dataUrl, {
          params: this.listParams
        })
        .then(res => {
          if (res.data.code === 200) {
            if (!res.data.data.totalCount) {
              this.loading = false
              this.Indicator.close()
              this.totalCount = 0
              this.listData = []
              return false
            }
            if (this.listParams.pageNo === 1) {
              this.listData = res.data.data.list
            } else {
              this.listData = this.listData.concat(res.data.data.list)
            }

            this.totalCount = res.data.data.totalCount
            this.loading = false
          } else {
            this.Toast(res.data.info)
            this.totalCount = 0
            this.listData = []
          }
          this.Indicator.close()
        })
    },
    loadMore () {
      if (this.listData.length !== this.totalCount) {
        this.listParams.pageNo++
        this.managerCustomer()
      }
    },
    goDetail (item) {
      if (this.$route.params.type === 'noSign') {
        var u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
          // eslint-disable-next-line no-undef
          AndroidWebView.open(this.acjlWebKehu + '/dadingDetail/' + item.id + '?from=other')
        } else if (u.indexOf('iPhone') > -1) { // 苹果手机
          window.webkit.messageHandlers.yincang.postMessage({ 'body': this.acjlWebKehu + '/dadingDetail/' + item.id + '?from=other' })
        } else { // pc
          window.location.href = this.acjlWebKehu + '/dadingDetail/' + item.id
        }
      } else if (this.$route.params.type === 'noPay') {
        this.$router.push('/list/nopayMsg/' + item.transactionNumber)
      }
    },
    loadTop () {
      this.listParams.pageNo = 1

      this.managerCustomer()
      this.$refs.loadmore.onTopLoaded()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{
  background-color: #f3f3f3;
}
.list {
  padding-top: 0.1px;
  margin-top: 44px;
}

.inline-flex {
  display: inline-flex;
  align-items: center;
  float: right;
  &:nth-child(2n + 1) {
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

img {
  vertical-align: middle;
}

.list-ul li {
  height: 90px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  padding: 0 20px;
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
    margin-bottom: 20px;
  }
  .left .checking {
    font-size: 14px;
    color: #ffbc00;
    display: inline-flex;
    align-items: center;
  }
  .tag{
      border: 1px solid #ddd;
      padding: 1px 3px;
      margin-right: 10px;
  }
  .right .time {
    margin-bottom: 20px;
  }
}

.popup {
  width: 100%;
  .pop-action {
    position: absolute;
    width: 100%;
    line-height: 44px;
    top: 0;
    > div {
      display: flex;
      margin: 0 20px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(244, 243, 244, 1);
    }
  }
}

.list-manager {
  width: 100%;
  max-height: 217px;
  margin-top: 44px;
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
.sousuo {
  margin-right: 20px;
}
</style>
