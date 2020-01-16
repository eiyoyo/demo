<template>
  <div>
    <div class="title"> 带看信息 </div>
    <div class="detail">
      <a @click="imgClick(0,[rewardExplainUrl])">带看奖说明
        <Icon svgName='right' color="#0076FF"></Icon>
      </a>
      <div :class="i===0?'visitProperty':''" v-for="(item,i) in awardMsg" :key="i">
        <span class="label">{{ item.label }}</span>
        <em>{{ item.val }}</em>
      </div>
    </div>

    <div class="title"> 带看证明照片 </div>
    <div class="detail">
      <p class="image" v-if="awardImg.length">
        <span v-for="(item,index) in awardImg" :key="index" @click="imgClick(index,awardImg)">
            <img :src="imageUrl + item.imageUrl + '?imageView2/1/w/103/h/76'"/><em></em>
        </span>
      </p>
    </div>

    <div class="title"> 确认信息 </div>
    <div class="actionDiv clearfix">
      <div class="actionSpace"></div>
      <div class="zpBtn">
        <mt-button plain :type="confirmMsg.transfer?'default':'primary'">非转盘</mt-button>
        <mt-button plain :type="confirmMsg.transfer?'primary':'default'">转盘</mt-button>
      </div>

      <mt-radio
        v-if="!confirmMsg.transfer"
        title="1.是否已拿到相关票据？(过路费票，高铁票原件等)"
        v-model="confirmMsg.bill"
        :options="[{label: '是',value: 'true'},{label: '否',value: 'false'}]">
      </mt-radio>
      <mt-radio
        v-if="!confirmMsg.transfer"
        v-model="confirmMsg.crossRegional"
        title="2.是否是跨区域带看？"
        :options="[{label: '是',value: 'true'},{label: '否',value: 'false'}]">
      </mt-radio>
      <mt-radio
        v-if="!confirmMsg.transfer"
        title="3.是否已确认（看过）经纪人相关带看证明照片？"
        v-model="confirmMsg.photos"
        :options="[{label: '是',value: 'true'},{label: '否',value: 'false'}]">
      </mt-radio>
      <mt-radio
        v-if="!confirmMsg.transfer"
        title="4.经纪人下高速后是否在要求时间内到达项目？"
        v-model="confirmMsg.requiredTime"
        :options="[{label: '是',value: 'true'},{label: '否',value: 'false'}]">
      </mt-radio>
      <mt-radio
        v-if="confirmMsg.transfer"
        title="1.是否已确认上家带看单？"
        v-model="confirmMsg.lastVisit"
        :options="[{label: '是',value: 'true'},{label: '否',value: 'false'}]">
      </mt-radio>
      <mt-radio
        :title="(confirmMsg.transfer?'2':'5')+'.是否满足项目带看时长要求？(当前'+this.awardMsg[1].val+')'"
        v-model="confirmMsg.visitTime"
        :options="[{label: '满足',value: 'true'},{label: '不满足',value: 'false'}]">
      </mt-radio>
      <div class="mint-radiolist">
        <label class="notRequired">
          {{ confirmMsg.transfer?'3':'6' }}.请填写经纪人带看车牌号码：
        </label>
        <p>{{ confirmMsg.plateNumber }}</p>
      </div>
    </div>

    <div class="title"> 带看奖金确认 </div>
    <div class="actionDiv clearfix" style="padding-bottom:20px;">
      <div class="mint-radiolist">
        <label>带看类型说明</label>
        <p>{{ confirmMsg.remark }}</p>
      </div>
      <div class="mint-radiolist">
        <label>带看金额</label>
        <p>{{ confirmMsg.amount }}元</p>
      </div>
      <div class="mint-radiolist">
        <h5><span>案场确认人</span> {{confirmMsg.saleUserName}}</h5>
      </div>
      <div class="mint-radiolist">
        <h5><span>确认时间</span> {{confirmMsg.updateTime}}</h5>
      </div>

    </div>
  </div>
</template>
<script>
import Icon from '@/components/icon.vue'
export default {
  name: 'lookAward',
  components: { Icon },
  data () {
    return {
      visitId: this.$route.params.id,
      rewardId: null, // 带看奖id
      khdata: null,
      popupVisible: false,
      img: [],
      index: 1,
      rewardExplainUrl: '',
      awardMsg: [
        { 'label': '带看项目', 'val': '' },
        { 'label': '带看时长', 'val': '' },
        { 'label': '经纪姓名', 'val': '' },
        { 'label': '经纪电话', 'val': '' },
        { 'label': '客户姓名', 'val': '' },
        { 'label': '客户电话', 'val': '' },
        { 'label': '渠道公司', 'val': '' },
        { 'label': '渠道门店', 'val': '' }
      ],
      confirmMsg: {}, // 确认信息
      awardImg: [],
      value: '是'
    }
  },
  props: ['keyId'],
  created () {
    this.getAwardMsg()
  },
  methods: {
    imgClick (index, imgArr) {
      var images = []
      imgArr.forEach(item => {
        if (JSON.stringify(item) === 'null') {
          this.$toast('无法访问')
          return
        }
        if (item.src) {
          images.push((String(item.src).indexOf('http://') === -1 ? this.imageUrl : '') + item.src)
        } else if (item.url) {
          images.push((String(item.url).indexOf('http://') === -1 ? this.imageUrl : '') + item.url)
        } else if (item.imageUrl) {
          images.push((String(item.imageUrl).indexOf('http://') === -1 ? this.imageUrl : '') + item.imageUrl)
        } else {
          images.push((String(item).indexOf('http://') === -1 ? this.imageUrl : '') + item)
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
    getAwardMsg () {
      this.$axios.get(this.acApi + '/v1/reward/visit/' + this.visitId)
        .then(Response => {
          let res = Response.data.data
          if (Response.data.code === 200 && Response.data.status === 'success') {
            this.awardMsg[0].val = res.propertyName // 带看项目
            this.awardMsg[1].val = Math.round(Number(res.duration) * 100 / 60) / 100 + '小时' // int 来访时长
            this.awardMsg[2].val = res.agentName // String 经纪人姓名
            this.awardMsg[3].val = res.agentPhone // String 经纪人电话
            this.awardMsg[4].val = res.customerName // String 客户姓名
            this.awardMsg[5].val = res.customerPhone // String 客户电话
            this.awardMsg[6].val = res.companyName // String 渠道公司
            this.awardMsg[7].val = res.branchName // String 门店公司
            this.awardImg = res.visitRewardImages

            this.rewardId = res.rewardId
            this.$axios.get(this.acApi + '/v1/reward/' + res.rewardId)
              .then(Response => {
                if (Response.data.code === 200 && Response.data.status === 'success') {
                  // mt-radio 的value值是string类型，此处做转换
                  let { crossRegional, photos, bill, requiredTime, lastVisit, visitTime } = Response.data.data
                  Response.data.data.crossRegional = crossRegional.toString()
                  Response.data.data.photos = photos.toString()
                  Response.data.data.bill = bill.toString()
                  Response.data.data.requiredTime = requiredTime.toString()
                  Response.data.data.lastVisit = lastVisit.toString()
                  Response.data.data.visitTime = visitTime.toString()
                  this.confirmMsg = Response.data.data
                } else {
                  // Toast(Response.data.info);
                }
              })
              .catch(error => {
                console.log(error)
                // Toast('网络错误，不能访问');
              })
            this.$axios.get(this.xmjyApi + '/marketing/v1/reward/' + res.propertyId)
              .then(Response => {
                if (Response.data.code === 200 && Response.data.status === 'success') {
                  this.rewardExplainUrl = Response.data.data.imageUrl
                } else {
                  // Toast(Response.data.info);
                }
              })
              .catch(error => {
                console.log(error)
                // Toast('网络错误，不能访问');
              })
          } else {
            // Toast(Response.data.info);
          }
        })
        .catch(error => {
          console.log(error)
          // Toast('网络错误，不能访问');
        })
    }
  }
}
</script>
<style lang="scss">
  em{
    font-style: normal;
  }
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
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
    }
    .label {
      width: 80px;
      display: inline-block;
      color: RGBA(153, 153, 153, 1);
    }
    .visitProperty{
      width: calc(100% - 85px);
      em{
        width: calc(100% - 80px);
      }
      span,em{
        display: inline-block;
        float: left;
      }
    }
    .visitProperty + div{
      clear: both;
    }
    a{
      display: inline-block;
      float: right;
      color:#0076FF;
      padding: 8px 0;

    }
  }
  .mint-cell-wrapper,.mint-cell:last-child{
    background-image:none;
  }
  .title {
    font-size: 16px;
    line-height: 36px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    padding-left: 20px;
    color: #333333;
  }
  .image {
    display: inline-block;
    vertical-align: text-top;
      margin-bottom: -10px;
      width: 100%;

    span {
      position: relative;
      width: 30%;
      height: 3.5rem;
      margin-right: 3%;
      margin-bottom: 10px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
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
    /* span:nth-child(3n) {
      margin-right: 0px;
    } */
  }
  .actionDiv{
    background: #ffffff;
    padding: 20px 20px 0 20px;
      position: relative;
    .actionSpace{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .zpBtn{
      padding-bottom: 20px;
      button{
        height: 26px;
        padding: 0 16px;
        margin-right: 10px;
        font-size: 12px;
      }
      .mint-button--primary.is-plain{
        color:#1952EE!important;
        border-color: #1952EE!important;
      }
      .mint-button--default.is-plain{
        color:#7C7C7C!important;
        border-color: #DCDCDC!important;

      }
    }

    .mint-radiolist{
      clear: both;
      label,>h5{
        color: #444444;
        font-size:13px;
        font-family:PingFangSC-Medium,PingFang SC;
        /* padding: 18px 0 0; */
        margin: 0;
      }
      >p{
        color: #333;
        font-size:13px;
        font-weight:400;
        padding: 10px 0 20px 10px;
      }
      >h5{
        font-weight:500;
        line-height: 28px;
        span{
          display: inline-block;
          width: 85px;
        }
      }
      >label::before{
        content: "*";
        display: inline-block;
        color: #FF3535;
        font-weight: 600;
        margin-right: 3px;
      }
      >.notRequired::before{
        content: "";
      }
      >a{
        float: left;
        min-height: 50px;
        margin-right: 30px;
      }
      .mint-field{
        width: 100%;
      }
      .mint-radio-core{
        width: 14px;
        height: 14px;
      }
      .mint-radio-input:checked + .mint-radio-core{
        background-color:#fff!important;
        border-color:#1952EE!important;
      }
      .mint-radio-input:checked + .mint-radio-core::after{
        background-color:#1952EE!important;
      }
      .mint-radio-core::after{
        top: 2px;
        left: 2px;
        width: 8px;
        height: 8px;
        -webkit-transform: scale(1);
        transform: scale(1);
        background-color:#CACACA!important;
      }
    }
  }

</style>
