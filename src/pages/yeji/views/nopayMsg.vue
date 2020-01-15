<template>
  <div class="laifang">
    <mt-header title="回款详情" class="white" fixed>
      <div slot="left">
        <mt-button @click="$router.back()"><img src="../../../assets/img/btn_back.png" height="18" width="24"/>
        </mt-button>
      </div>
    </mt-header>
    <main v-if="khdata">
      <div class="customer">
        <p v-for="(item,index) in propertyInfo.customerList" :key="index">
          {{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.telephone | formatPhone}}
        </p>
      </div>
      <div class="detail" style="padding:6px 20px 14px;">
        <div>
          <span class="label" style="width:100%;">签约房源：
            {{propertyInfo.propertyName}}&nbsp;{{propertyInfo.buildingName}}-{{propertyInfo.unitName}}-{{propertyInfo.houseName}}
            </span>
        </div>
        <div>
          <span class="label" style="width:100%;">签约日期：{{propertyInfo.qyDate}}</span>
        </div>
        <div>
          <span class="label" style="width:100%;">签约总价：{{propertyInfo.totalPrice | formatMoney}}元</span>
        </div>
      </div>
      <div class="status">
        <div class="range">
          <p :style="{width:Number(khdata.hkRatio)+'%'}"></p><span>{{ khdata.hkRatio }}%</span>
        </div>
        <p>共计回款:{{ khdata.housePaymentCount }}次 <b>{{ khdata.sumMoney | formatMoney }}</b>元</p>
      </div>
      <div class="payList">
        <ul>
          <li v-for="(item,index) in payList" :key="index">
            <div>
              <b>+{{ item.paymentMoney | formatMoney }}元</b>
              <em>{{ item.payRatio }}</em>
              <i>{{ item.typeStr }}</i>
              <span>{{ item.paymentDate }}</span>
            </div>
            <p>回款人:{{ item.saleUserName }}</p>
            <div class="payImg" @click="imgClick(i, item.housePaymentImages)"
             v-for="(val,i) in item.housePaymentImages" :key="i">
              <img :src="imageUrl+val.url+'?imageView2/1/w/480'" />
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'hkdetail',
  data () {
    return {
      id: this.$route.params.id,
      propertyInfo: {},
      khdata: undefined,
      payList: [],
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
    getBaobei () {
      this.$axios.get(this.acApi + '/manager-achievement/v1/payment-info?transactionNumber=' + this.id)
        .then((res) => {
          if (res.data.code === 200) {
            this.propertyInfo = res.data.data
          }
        })

      this.$axios.get(this.acApi + '/v1/payment/' + this.id).then((res) => {
        if (res.data.code === 200) {
          this.khdata = res.data.data
          this.khdata.housePaymentList.forEach(item => {
            if (item.checkStatus === 3) {
              this.payList.push(item)
            }
          })
        }
      })
    },
    show (item, index) {
      var a = []
      for (let i = 0; i < item.length; i++) {
        a[i] = {
          'url': item[i]
        }
      }
      this.img = a
      this.index = index
      this.popupVisible = true
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
    }
  },
  filters: {
    formatPhone (number) {
      return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
    },
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
  main{
    margin-top: 40px;
    background-color: #f3f3f3;
  }
  .customer {
    padding: 16px 20px 0;
    background: #ffffff;
    font-weight: bold;
    p {
      padding: 6px 0;
      font-size: 16px;
    }
  }

  .status {
    margin:15px 0 10px;
    padding:20px 20px 15px;
    background: #fff;
    .range{
      height: 20px;
      line-height: 20px;
      width: 100%;
      background: #F4F3F4;
      p{
        height:20px;
        float: left;
        background:linear-gradient(47deg,rgba(255,156,57,1) 0%,rgba(255,122,99,1) 100%);
      }
      span{
        float: left;
        margin-left: 5px;
        font-size: 14px;
        color:#FF6A00;
      }
    }
    >p {
      line-height: 32px;
        font-size: 14px;
      b{
        color:#FF6A00;

      }
    }
  }
  .payList{

    ul{
      li{
        padding:20px 20px 12px;
        background: #fff;
        margin-bottom: 10px;
        div:first-child{
          height: 20px;
          line-height: 20px;
          b,em,i{
            display: block;
            height: 20px;
            float: left;
            font-style: normal;
          }
          b{
            font-size: 18px;
            color:#FF6A00;
          }
          em{
            font-size: 12px;
            line-height: 12px;
            margin:0 15px 0 5px;
          }
          i{
            font-style: normal;
            background: #B0ACAC;
            color: #fff;
            font-size: 14px;
            height:18px;
            line-height:18px;
            padding:0 3px;
          }
          span{
            font-size: 12px;
            color: #B0ACAC;
            float: right;
          }

        }
        >p{
          font-size: 15px;
          color: #999;
          margin-top: 10px;
        }
        .payImg{
          height:95px;
          width:110px;
          float: left;
          background: #E5E5E5;
          margin:12px 12px 12px 0;
          img{
            height: 100%;
            width: 100%;
          }
        }
        overflow: hidden;
      }
    }
  }
  .detail {
    padding: 14px 20px;
    background: #ffffff;
    font-size: 14px;
    line-height: 1;
    > div {
      padding: 6px 0;
      display: flex;
    }
    .label {
      // width: 116px;
      // margin-left: 8px;
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
