<template>
  <div class="baobei">
    <mt-header title="报备详情" class="white" fixed>
      <div slot="left">
        <mt-button @click="back()"><img src="../../../assets/img/btn_back.png" height="18" width="24"/>
        </mt-button>
      </div>
    </mt-header>
    <main v-if="khdata">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div class="status">
          <h4>{{khdata.name}} {{khdata.phone}}</h4>
          <p>报备时间：{{khdata.operationTime}}</p>
          <p>项目名称：{{khdata.propertyName}}</p>
        </div>
        <div class="detail">
          <div><span class="label">预约来访人数:</span>{{khdata.visitorsNumber|| '未填写'}}</div>
          <div><span class="label">预约来访时间:</span>{{khdata.visitTime|| '未填写'}}</div>
          <div><span class="label">来访方式:</span>{{khdata.transportMode|| '未填写'}}</div>
          <div v-if="khdata.transportMode == '班车'"><span class="label">上车时间:</span>{{khdata.busTime|| '未填写'}}</div>
          <div v-if="khdata.transportMode == '班车'"><span class="label">上车地点:</span>{{khdata.busAddress || '未填写'}}</div>
          <div><span class="label">备注:</span>{{khdata.remark || '未填写'}}</div>
        </div>
        <div class="title">
          <img src="../../../assets/img/icon_tie.png" height="18" width="15"/>
          渠道信息
        </div>
        <div class="detail">
          <div>{{khdata.agentName}}&nbsp;&nbsp;&nbsp;{{khdata.agentPhone}}</div>
          <div>联动维护:{{khdata.placeUserName}}</div>
          <div>{{khdata.companyName}}</div>
          <img src="../../../assets/img/icon_call.png" @click="phone(khdata.agentPhone)" height="30px" width="30px">
        </div>
      </mt-loadmore>
    </main>
  </div>
</template>

<script>
export default {
  name: 'baobei-detail',
  data () {
    return {
      id: this.$route.params.id,
      khdata: null
    }
  },

  created () {
    this.getBaobei()
  },
  methods: {
    back () {
      if (this.$route.query.from) {
        var u = navigator.userAgent
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
        this.$router.back()
      }
    },
    getBaobei () {
      this.$axios.get(this.acApi + '/manager-customer/v1/report/' + this.id).then((res) => {
        if (res.data.code === 200) {
          this.khdata = res.data.data
        }
      })
    },
    loadTop () {
      this.getBaobei()
      this.$refs.loadmore.onTopLoaded()
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
    }
  }
}
</script>

<style scoped lang="scss">
  main{
    margin-top: 40px;
  }
  .status {
    background: #ffffff;
    padding: 10px 20px;
    margin-bottom: 16px;
      font-size: 16px;
    line-height: 1;
    h4 {
      margin: 0;
      padding: 8px 0;
    }
    p{
      padding: 8px 0;
      color: RGBA(153, 153, 153, 1);

    }
  }
  .title {
    font-size: 16px;
    line-height: 16px;
    padding-top: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 6px;
    font-weight: bold;
    margin-top: 16px;
    background: #ffffff;
    padding-left: 20px;

    img {
      vertical-align: middle;
      margin-right: 8px;
    }
  }

  .detail {
    padding: 14px 20px;
    background: #ffffff;
    font-size: 16px;
    line-height: 1;
    > div {
      padding: 8px 0;
    }
    .label {
      width: 116px;
      color: RGBA(153, 153, 153, 1);
      display: inline-block;
      vertical-align: middle;
    }
    img{
      float: right;
      margin-top: -75px;
    }
  }
</style>
