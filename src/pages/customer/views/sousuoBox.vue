<template>
  <div class="search">
    <mt-header fixed title="客户检索" class="white">
      <span @click="backHandle" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24"/>
      </span>
    </mt-header>
    <main>
      <div class="setInput">
        <div class="khName">
          <input required="required" ref="inputClear1" v-model="khName" type="text" placeholder="客户姓名" @blur="blurHanle">
          <img src="../../../assets/img/form_btn_close.png" alt="" @click= "inputClick(1)">
        </div>
        <div>
          <input required="required" ref="inputClear2" v-model="khTel" type="text" placeholder="电话" @blur="blurHanle">
          <img src="../../../assets/img/form_btn_close.png" alt="" @click= "inputClick(2)">
        </div>
        <div>
          <input required="required" ref="inputClear3" v-model="khQudao" type="text" placeholder="客户归属渠道名" @blur="blurHanle">
          <img src="../../../assets/img/form_btn_close.png" alt="" @click= "inputClick(3)">
        </div>
        <div>
          <button :disabled=ccc :class="{btnColor: khName || khTel || khQudao, qiehuanColor: !khName || !khTel || !khQudao}"
            @click="sousuoResult()"
          >搜索</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'sousuo-box',
  data () {
    return {
      khName: '',
      khTel: '',
      khQudao: ''
    }
  },
  computed: {
    ccc () {
      return (!this.khName && !this.khTel && !this.khQudao)
    }
  },
  methods: {
    inputClick (num) {
      if (num === 1) {
        this.khName = ''
      } else if (num === 2) {
        this.khTel = ''
      } else {
        this.khQudao = ''
      }
    },
    sousuoResult () {
      this.$router.push({ path: `/sousuoBox/sousuoResult?customerName=${this.khName}&customerPhone=${this.khTel}&companyName=${this.khQudao}&managerId=${this.$route.query.managerId}&propertyId=${this.$route.query.propertyId}` })
    },
    backHandle () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.backHome()
      } else { // pc && IOS
        this.$router.back()
      }
    },
    blurHanle () {
      window.scroll(0, 0)
    }
  },
  beforeRouteLeave (to, from, next) {
    from.meta.keepAlive = false
    next()
  }
}
</script>
<style scoped lang="scss">
  .search input {
    flex: 8;
    height: 40px;
    margin: 24px 20px 0;
    border: 1px solid #EBEBEB;
    border-radius: 2px;
    font-size: 16px;
    padding-left: 8px;
  }
  ::-webkit-input-placeholder {
    color: #DDD;
  }
  .search input:focus {
    outline: none;
    border-color: #0076FF;
  }
  .setInput div {
    display: flex;
    width: 100%;
    background-color: #fff;
    position: relative;
    img {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 25px;
      right: 20px;
      display: none;
    }
  }
  input:valid + img {
    display: block;
  }
  .search .khName {
    margin-top: 44px;
  }
  button {
    flex: 8;
    height: 40px;
    background-color: #DDD;
    color: #fff;
    border: none;
    font-size: 16px;
    margin: 24px 20px 0;
    margin-top: 40px;
    margin-bottom: 20px;
    border-radius: 2px;
  }
  .btnColor {
    background: linear-gradient(to right,#2FBAFF,#3382FF);
  }
  .qiehuanColor {
    background-color: #DDD;
  }
</style>
