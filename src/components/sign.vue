<template>
  <div v-if="khdata">
    <div class="title">
      <img src="../assets/img/icon_house.png" height="16" width="16"/>
      房源信息
    </div>
    <div class="detail">
      <div><span class="label">房源:</span>
        {{khdata.signHouseDetail.propertyName}}
        {{khdata.signHouseDetail.buildingName ? khdata.signHouseDetail.buildingName + '栋' : ''}}
        {{khdata.signHouseDetail.unitName ? khdata.signHouseDetail.unitName + '单元' : ''}}
        {{khdata.signHouseDetail.houseName ? khdata.signHouseDetail.houseName + '室' : ''}}
      </div>
      <div><span class="label">房屋类型:</span>{{khdata.signHouseDetail.buildType}}</div>
      <div><span class="label">房源价格:</span>{{khdata.signHouseDetail.price}}元</div>
      <div><span class="label">户型:</span>{{khdata.signHouseDetail.housewear}}</div>
      <div><span class="label">房源面积:</span>{{khdata.signHouseDetail.buildArea}}m²</div>
    </div>
    <div class="title">
      <img src="../assets/img/icon_client.png" height="16" width="16"/>
      客户信息
    </div>
    <div class="detail" v-for="(item,index) in khdata.customers" :key="index">
      <div><span class="label">客户姓名:</span>{{item.name}}</div>
      <div><span class="label">电话号码:</span>{{item.telephone | formatPhone}}</div>
      <div><span class="label">身份证号码:</span>{{item.card}}</div>
    </div>
    <div class="detail">
      <div><span class="label">客户地址:</span>{{khdata.address}}</div>
      <div v-if="khdata.customerCardImg.length"><span class="label">身份证照片:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.customerCardImg" :key="index" @click="imgClick(index,khdata.customerCardImg)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.birthCertificate.length"><span class="label">出生证明:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.birthCertificate" :key="index" @click="imgClick(index,khdata.birthCertificate)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.householdRegistrationBook.length"><span class="label">户口簿:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.householdRegistrationBook" :key="index" @click="imgClick(index,khdata.householdRegistrationBook)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.marriageCertificate.length"><span class="label">结婚证明:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.marriageCertificate" :key="index" @click="imgClick(index,khdata.marriageCertificate)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
    </div>
    <div class="title">
      <img src="../assets/img/icon_ordered.png" height="16" width="16"/>
      签约信息
    </div>
    <div class="detail">
      <div><span class="label">签约日期:</span>{{khdata.signTime}}</div>
      <div><span class="label">签约总价:</span>{{khdata.totalPrice}}元</div>
      <div><span class="label">首付金额:</span>{{khdata.firstPrice}}元</div>
      <div><span class="label">签约面积:</span>{{khdata.signArea}}m²</div>
      <div v-if="khdata.signContractImg.length"><span class="label">签约合同:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.signContractImg" :key="index" @click="imgClick(index,khdata.signContractImg)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.firstPaymentReceiptImg.length"><span class="label">首付收据:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.firstPaymentReceiptImg" :key="index" @click="imgClick(index,khdata.firstPaymentReceiptImg)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.firstPaymentPOSImg.length"><span class="label">首付POS单:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.firstPaymentPOSImg" :key="index" @click="imgClick(index,khdata.firstPaymentPOSImg)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.changeOfMaterial.length"><span class="label">客户变更材料:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.changeOfMaterial" :key="index" @click="imgClick(index,khdata.changeOfMaterial)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.earnestMoneyCertificateOfDelegation.length"><span class="label">房款代付凭证:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.earnestMoneyCertificateOfDelegation" :key="index" @click="imgClick(index,khdata.earnestMoneyCertificateOfDelegation)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
    </div>
    <div class="title">
      <img src="../assets/img/icon_sale.png" height="16" width="16"/>
      团购佣金
    </div>
    <div class="detail">
      <div><span class="label">团购方案:</span>{{khdata.signHouseDetail.activityName}}</div>
      <div><span class="label">应收团购:</span>{{khdata.shouldGroupMoney}}元</div>
      <div><span class="label">实收团购:</span>{{khdata.actualGroupMoney}}元</div>
      <div><span class="label">佣金方案:</span>{{khdata.commissionName}}</div>
      <div><span class="label">佣金金额:</span>{{commissionMoney}}元</div>
      <div v-if="khdata.discountCommissionImg.length"><span class="label">折佣:</span>{{khdata.discountCommission}}元</div>
      <div><span class="label">奖金:</span>{{khdata.bonus}}元</div>
      <div><span class="label">应发佣金:</span>
        {{realHairMoney}}元
      </div>
      <div v-if="khdata.groupPurchaseImg.length"><span class="label">团购书:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.groupPurchaseImg" :key="index"  @click="imgClick(index,khdata.groupPurchaseImg)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.groupPurchasePOSImg.length"><span class="label">团购POS单:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.groupPurchasePOSImg" :key="index" @click="imgClick(index,khdata.groupPurchasePOSImg)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.groupPurchaseReceipt.length"><span class="label">团购收据:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.groupPurchaseReceipt" :key="index" @click="imgClick(index,khdata.groupPurchaseReceipt)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.discountCommissionImg.length"><span class="label">折佣凭证:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.discountCommissionImg" :key="index" @click="imgClick(index,khdata.discountCommissionImg)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.groupPurchaseServiceFeeDiscountCertificate.length"><span class="label">团购费折扣凭证:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.groupPurchaseServiceFeeDiscountCertificate" :key="index" @click="imgClick(index,khdata.groupPurchaseServiceFeeDiscountCertificate)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.groupPurchaseCertificateOfDelegation.length"><span class="label">团购费委托代付凭证:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.groupPurchaseCertificateOfDelegation" :key="index" @click="imgClick(index,khdata.groupPurchaseCertificateOfDelegation)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div style="text-align: center;color: #0B79EB;width: 100%;display: block"
           @click="goDading">
        <span style="display: inline-block;padding-bottom: 2px;border-bottom: 1px solid #0B79EB">查看认购信息</span>
      </div>
    </div>
    <div class="title">
      <img src="../assets/img/icon_man.png" height="16" width="16"/>
      人员信息
    </div>
    <div class="detail">
      <div><span class="label">案场:</span>{{khdata.saleUserName}}</div>
      <div><span class="label">联动:</span>{{khdata.placeUserName}}</div>
      <div><span class="label">渠道公司:</span>{{khdata.companyName}}</div>
      <div><span class="label">经纪人:</span>{{khdata.memberName}}</div>
    </div>
    <popSwiper :img="img" :index="index + 1" :popupVisible.sync="popupVisible"></popSwiper>
  </div>
</template>

<script>
import popSwiper from './popSwiper'

export default {
  name: 'sign',
  data () {
    return {
      id: this.$route.params.id,
      khdata: null,
      popupVisible: false,
      img: [],
      index: 1
    }
  },
  props: ['keyId'],
  components: { popSwiper },
  computed: {
    commissionMoney () {
      // 佣金类型 1按套 2按比例
      if (this.khdata.commissionType === '按套' || this.khdata.commissionType === '1') {
        return this.khdata.commissionMoney
      } else if (this.khdata.commissionType === '按比例' || this.khdata.commissionType === '2') {
        return (this.khdata.commissionMoney * this.khdata.totalPrice) * 0.01
      } else {
        return 0
      }
    },
    realHairMoney () {
      // 佣金类型 1按套 2按比例
      if (this.khdata) {
        return (this.commissionMoney * 100 + this.khdata.bonus * 100 - this.khdata.discountCommission * 100) / 100
      } else {
        return 0
      }
    }
  },
  created () {
    if (this.keyId) {
      this.id = this.keyId
    }
    this.getkhdata()
  },
  methods: {
    getkhdata () {
      this.$axios.get(this.jyAppApi + '/sign/' + this.id).then((res) => {
        if (res.data.code === 200) {
          this.khdata = res.data.data
        }
      })
    },
    goDading () {
      window.location.href = this.acjlWebKehu + '/dadingDetail/' + this.khdata.transactionNumber
    },
    show (item, index) {
      this.img = item
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
    }
  }
}
</script>

<style scoped lang="scss">
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    color: rgba(0, 199, 186, 1);
    padding: 24px 20px 21px 20px;
    border-bottom: 1px solid #ddd;
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .detail {
    padding: 14px 20px;
    background: #ffffff;
    font-size: 16px;
    border-bottom: 1px solid #dddddd;
    line-height: 1;
    > div {
      padding: 8px 0;
      display: flex;
    }
    .label {
      width: 115px;
      flex-shrink: 0;
      color: RGBA(153, 153, 153, 1);
    }
  }

  .baobei .title:first-child {
    margin-top: 0;
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

  .image {
    display: inline-block;
    vertical-align: text-top;
    span {
      position: relative;
      width: 99px;
      height: 76px;
      margin-right: 10px;
      margin-bottom: 10px;
      display: inline-block;
      img {
        width: 99px;
        height: 76px;
        display: block;
      }
      em {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 99px;
        height: 76px;
        background: rgba(47, 38, 38, 0.1);
      }
    }
    span:nth-child(2n) {
      margin-right: 0px;
    }
  }
  .mint-popup {
    width: 100%;
    max-height: calc(100% - 50px);
  }

</style>
