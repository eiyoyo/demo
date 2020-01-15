<template>
  <div v-if="khdata">
    <div class="title">
      <img src="../assets/img/icon_house.png" height="16" width="16"/>
      房源信息
    </div>
    <div class="detail">
      <div><span class="label">房源:</span>
        {{khdata.ddDetails.propertyName}}
        {{khdata.ddDetails.buildingName ? khdata.ddDetails.buildingName + '栋' : ''}}
        {{khdata.ddDetails.unitName ? khdata.ddDetails.unitName + '单元' : ''}}
        {{khdata.ddDetails.houseName ? khdata.ddDetails.houseName + '室' : ''}}
      </div>
      <div><span class="label">房屋类型:</span>{{khdata.ddDetails.buildType || '未填写'}}</div>
      <div><span class="label">房源价格:</span>{{khdata.ddDetails.houseprice}}元</div>
      <div><span class="label">户型:</span>{{khdata.ddDetails.housewear}}</div>
      <div><span class="label">房源面积:</span>{{khdata.ddDetails.buildArea}}m²</div>
    </div>
    <div class="title">
      <img src="../assets/img/icon_client.png" height="16" width="16"/>
      客户信息
    </div>
    <div class="detail" v-for="(item,index) in khdata.CustomerList" :key="index">
      <div><span class="label">客户姓名:</span>{{item.name}}</div>
      <div><span class="label">电话号码:</span>{{item.telephone | formatPhone}}</div>
      <div><span class="label">身份证号码:</span>{{item.card}}</div>
    </div>
    <div class="detail">
      <div><span class="label">客户地址:</span>{{khdata.ddDetails.address || '未填写'}}</div>
      <div v-if="khdata.card.length"><span class="label">身份证照片:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.card" :key="index" @click="imgClick(index,khdata.card)">
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
      认购信息
    </div>
    <div class="detail">
      <div><span class="label">认购日期:</span>{{khdata.ddDetails.ddTime}}</div>
      <div><span class="label">认购总价:</span>{{khdata.ddDetails.totalPrice}}元</div>
      <div><span class="label">认购面积:</span>{{khdata.ddDetails.dadingArea}}m²</div>
      <div v-if="khdata.subscriptionBook.length"><span class="label">认购书:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.subscriptionBook" :key="index"
                  @click="imgClick(index,khdata.subscriptionBook)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.dadingReceipt.length"><span class="label">认购收据:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.dadingReceipt" :key="index" @click="imgClick(index,khdata.dadingReceipt)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.dadingPos.length"><span class="label">认购POS单:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.dadingPos" :key="index" @click="imgClick(index,khdata.dadingPos)">
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
      <div v-if="khdata.earnestMoneyCertificateOfDelegation.length"><span class="label">定金代付凭证:</span>
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
      <div><span class="label">团购方案:</span>{{khdata.ddDetails.activityName || '未填写'}}</div>
      <div><span class="label">应收团购:</span>{{khdata.ddDetails.shouldGroupMoney}}元</div>
      <div><span class="label">实收团购:</span>{{khdata.ddDetails.actualGroupMoney}}元</div>
      <div><span class="label">佣金方案:</span>{{khdata.ddDetails.commissionName || '未填写'}}</div>
      <div><span class="label">佣金金额:</span>{{commissionMoney}}元</div>
      <div v-if="khdata.voucher.length"><span class="label">折佣:</span>{{khdata.ddDetails.discountCommission}}元</div>
      <div><span class="label">奖金:</span>{{khdata.ddDetails.bonus}}元</div>
      <div><span class="label">应发佣金:</span>
        {{realHairMoney}}元
      </div>
      <div v-if="khdata.groupBook.length"><span class="label">团购书:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.groupBook" :key="index" @click="imgClick(index,khdata.groupBook)">
                 <img :src="imageUrl + item.url + '?imageView2/1/w/103/h/76'"/><em></em>
            </span>
        </p>
      </div>
      <div v-if="khdata.voucher.length"><span class="label">折佣凭证:</span>
        <p class="image">
            <span v-for="(item,index) in khdata.voucher" :key="index" @click="imgClick(index,khdata.voucher)">
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
    </div>
    <div class="title">
      <img src="../assets/img/icon_man.png" height="16" width="16"/>
      人员信息
    </div>
    <div class="detail">
      <div><span class="label">案场:</span>{{khdata.ddDetails.salesUserName}}</div>
      <div><span class="label">联动:</span>{{khdata.ddDetails.placeUserName}}</div>
      <div><span class="label">渠道公司:</span>{{khdata.ddDetails.companyName}}</div>
      <div><span class="label">经纪人:</span>{{khdata.ddDetails.memberName}}</div>
    </div>
    <popSwiper :img="img" :index="index + 1" :popupVisible.sync="popupVisible"></popSwiper>
  </div>
</template>
<!--案场经理  佣金金额和应发佣金字段→前端计算-->
<script>
import popSwiper from './popSwiper'

export default {
  name: 'dading',
  components: { popSwiper },
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
  created () {
    if (this.keyId) {
      this.id = this.keyId
    }
    this.getkhdata()
  },
  computed: {
    commissionMoney () {
      // 佣金类型 1按套 2按比例
      if (this.khdata.ddDetails.commissionType === '按套' || this.khdata.ddDetails.commissionType === '1') {
        return this.khdata.ddDetails.commissionMoney
      } else if (this.khdata.ddDetails.commissionType === '按比例' || this.khdata.ddDetails.commissionType === '2') {
        return (this.khdata.ddDetails.commissionMoney * this.khdata.ddDetails.totalPrice) * 0.01
      } else {
        return 0
      }
    },
    realHairMoney () {
      if (this.khdata) {
        return (+this.khdata.ddDetails.bonus * 100 + (+this.commissionMoney * 100) - (+this.khdata.ddDetails.discountCommission * 100)) / 100
      } else {
        return 0
      }
    }
  },
  methods: {
    getkhdata () {
      this.$axios.get(this.jyAppApi + '/dading/' + this.id).then((res) => {
        if (res.data.code === 200) {
          this.khdata = res.data.data
        }
      })
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
    font-size: 14px;
    /* border-bottom: 1px solid #dddddd; */
    line-height: 1;
    > div {
      padding: 8px 0;
      display: flex;
    }
    .label {
      width: 105px;
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
        width: 99;
        height: 76px;
        background: rgba(47, 38, 38, 0.1);
      }
    }
    span:nth-child(2n) {
      margin-right: 0px;
    }
  }
</style>
