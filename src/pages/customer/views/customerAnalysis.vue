<template>
  <div class="analsis">
    <mt-header title="客户分析" class="analsis_header" fixed>
      <div slot="left">
        <mt-button @click="goBack"><img src="../../../assets/img/btn_back.png" height="18" width="24"/>
        </mt-button>
      </div>
    </mt-header>
    <main class="analsis_main">
      <p class="custmer_class">客户意向：{{  customerClass }}</p>
      <ul>
        <li v-for="item in analsisData" :key="item.keyName">
          <span class="info_name">{{item.keyName}}：</span>
          <span class="info_content">{{item.keyValue}}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: 'laifang-detail',
  data () {
    return {
      analsisData: [],
      customersClass: this.$route.query.customerClass
    }
  },
  created () {
    this.getAnalsisData()
  },
  computed: {
    customerClass () {
      let customerclass = this.customersClass === '1' ? 'A' : this.customersClass === '2' ? 'B' : this.customersClass === '3' ? 'C' : this.customersClass === '4' ? 'D' : ''
      return customerclass
    }
  },
  methods: {
    async getAnalsisData () {
      let res = await this.$axios.get(this.acApi + '/customer/v1.0/customer-info', {
        params: {
          customerId: this.$route.query.customerId
        }
      })
      if (res.data.code === 200) {
        this.analsisData = res.data.data
      }
    },
    goBack () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.backHome()
        // } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //   window.webkit.messageHandlers.xianshi.postMessage("");
      } else { // pc
        this.$router.back()
      }
    }
  },
  filters: {
  }
}
</script>

<style scoped lang="scss">
  .analsis_header{
    background-color: #fff;
    font-size:17px;
    color:rgba(51,51,51,1);
    /deep/ .mint-header-title{
      font-weight:600;
    }
  }
  .analsis_main{
    margin-top: 41px;
    background-color: #fff;
    padding: 20px;
    .custmer_class{
      height: 24px;
      font-size:16px;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:24px;
    }
    ul{
      margin-bottom: 50px;
      li{
        margin-top: 16px;
        display: flex;
        justify-content: left;
        .info_name{
          display: inline-block;
          width:112px;
          font-size:16px;
          color:rgba(153,153,153,1);
        }
        .info_content{
          width:200px;
          font-size:16px;
          display: inline-block;
          color:rgba(51,51,51,1);
        }
      }
    }
  }
</style>
