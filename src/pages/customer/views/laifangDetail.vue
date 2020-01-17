<template>
  <div class="laifang">
    <mt-header title="来访详情" fixed>
      <div slot="left">
        <mt-button @click="back()"><img src="../../../assets/img/btn_back.png" height="18" width="24"/>
        </mt-button>
      </div>
    </mt-header>
    <main v-if="khdata">
      <div class="customer">
        <p v-for="(item,index) in khdata.visitPeople" :key="index">
          {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.phone | formatPhone}}
        </p>
      </div>
      <div class="detail" style="padding:0 20px 14px;">
        <div><span class="label" style="width:82px;">来访时间：</span>{{khdata.realVisitTime}}</div>
        <div><span class="label" style="width:82px;">项目名称：</span>{{khdata.propertyName}}</div>
      </div>
      <div class="status" style="margin-top:15px;">
        <span>{{khdata.visitCount}}访</span>
      </div>
      <div class="detail">
        <div><span class="label">来访人数:</span>{{khdata.visitorsNumber}}</div>
        <div><span class="label">是否落座:</span>{{khdata.isSitDown == 1 ? '落座' : "否"}}</div>
        <div><span class="label">是否落位:</span>{{khdata.isEngoyHouse == 1 ? '落位' : "否"}}</div>
        <div><span class="label">价格预算:</span>{{khdata.offerPrice/10000|| '未填写'}}万元</div>
        <div><span class="label">下次来访时间:</span>{{khdata.nextComeTime || '未填写'}}</div>
        <div><span class="label">备注:</span>{{khdata.remark|| '未填写'}}</div>
        <div><span class="label">来访确认单:</span>
          <p class="image">
             <span v-for="(item,index) in  image" :key="index" @click="imgClick(index,image)">
                   <img :src="imageUrl + item + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
          </p>
        </div>
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
    </main>
  </div>
</template>

<script>
export default {
  name: 'laifang-detail',
  data () {
    return {
      id: this.$route.params.id,
      khdata: null,
      popupVisible: false,
      img: [],
      index: 1
    }
  },
  created () {
    this.getBaobei()
  },
  computed: {
    image () {
      if (this.khdata && this.khdata.imageUrl && this.khdata.imageUrl.length) {
        return this.khdata.imageUrl.split(',')
      }
      return []
    }
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
      this.$axios.get(this.acApi + '/visit/v1/' + this.id).then((res) => {
        if (res.data.status === 'success') {
          this.khdata = res.data.data
        }
      })
    },
    imgClick (index, imgArr) {
      var images = []
      imgArr.forEach(item => {
        if (item.src) {
          images.push(this.imageUrl + item.src)
        } else if (item.url) {
          images.push(this.imageUrl + item.url)
        } else {
          images.push(this.imageUrl + item)
        }
      })
      var u = navigator.userAgent
      if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.showImage.postMessage({ 'images': images, 'index': index })
      } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.showImage(images, index)
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
    }
  },
  filters: {
    formatPhone (number) {
      return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
    }
  }
}
</script>

<style scoped lang="scss">
  main{
    margin-top: 40px;
  }
  .customer {
    padding: 16px 20px 0;
    background: #ffffff;
    font-weight: bold;
    p {
      padding: 8px 0;
      font-size: 16px;
    }
  }

  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    color: rgba(0, 199, 186, 1);
    padding: 24px 20px 21px 20px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 2px 6px 0 rgba(0, 0, 0, 0.06);
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .detail {
    padding: 14px 20px;
    background: #ffffff;
    font-size: 16px;
    line-height: 1;
    > div {
      padding: 8px 0;
      display: flex;
    }
    .label {
      width: 116px;
      flex-shrink: 0;
      color: RGBA(153, 153, 153, 1);
    }
    >img{
      float: right;
      margin-top: -75px;
    }
    .image {
      display: inline-block;
      vertical-align: text-top;
      span {
        position: relative;
        width: 100px;
        height: 76px;
        margin-right: 10px;
        margin-bottom: 10px;
        display: inline-block;
        img {
          width: 100px;
          height: 76px;
          display: block;
        }
        em {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100px;
          height: 76px;
          background: rgba(47, 38, 38, 0.1);
        }
      }
    }
  }
    .mint-popup {
    width: 100%;
    max-height: calc(100% - 50px);
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

</style>
