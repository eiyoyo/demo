<template>
  <div>
    <mt-header fixed title="审批详情" class="white">
      <span @click="goBack" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24"/>
      </span>
    </mt-header>
    <main class="content">
      <div class="qudao" v-if="isSPshow" style="margin: 0 0 15px;">
        <div class="content1" style="padding: 4px 15px 14px;">
          <ul id="record" v-if="VhouseFinishedLog.length !=0">
            <li v-if="approvalBtnShow">
              <h3 style="color:#F48A18;">待我审批</h3>
              <div><em>{{ VhouseFinishedLog[0].createTime }}</em></div>
            </li>
            <li v-for="(item,index) in VhouseFinishedLog" :key='index' :class="index===0&&!approvalBtnShow?'spActive'+item.checkType:''">
              <h3 :style="{color:item.checkColor}">{{ item.createUserName}}{{ item.checkTypeStr}}</h3>
              <div><em>{{item.createTime}}</em></div>
              <div v-if="item.reviewReason != ''"><span>{{ item.reviewReason }}</span></div>
            </li>
          </ul>
        </div>
      </div>
      <lookAward v-if='isLookshow' :keyId='$route.params.id'></lookAward>
      <dadingMsg v-if='isDDshow' :keyId='$route.params.id'></dadingMsg>
      <presignMsg v-if='isPresignshow' :keyId='$route.params.id'></presignMsg>
      <qianyueMsg v-if='isSignshow' :keyId='$route.params.id'></qianyueMsg>

      <div class="bottom clearfix" v-if="approvalBtnShow">
        <div @click="isPass('B')">
          <button>驳回</button>
        </div>
        <div @click="isPass('A')">
          <button>通过</button>
        </div>
      </div>

    </main>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="approvalModel">
        <h3><span @click="popupVisible = false">取消</span>{{ approvalTitle }}</h3>
        <p>备注:<span>{{ remarkTxtLength }}/250</span></p>
        <div>
          <textarea maxlength="250" v-model="remarkTxt" placeholder="请输入"></textarea>
          <div>
            <mt-button :type="approvalModelBtnColor" @click="approvalMsg()">{{ approvalModelBtn }}</mt-button>
          </div>

        </div>

      </div>
    </mt-popup>
  </div>

</template>
<script>
import dadingMsg from '@/components/dading'
import presignMsg from '@/components/preSign'
import qianyueMsg from '@/components/sign'
import lookAward from '@/components/lookAward'

export default {
  name: 'approvalMsg',
  components: {
    dadingMsg, presignMsg, qianyueMsg, lookAward
  },
  data () {
    return {
      userID: null,
      isSPshow: true, // 是否显示审批记录
      isLookshow: false, // 是否显示带看奖详情
      isDDshow: false, // 是否显示大定详情
      isSignshow: false, // 是否显示签约详情
      isPresignshow: false, // 是否显示草签详情

      approvalTitle: '',
      VhouseFinishedLog: [], // 审核记录
      approvalBtnShow: false,
      popupVisible: false,
      approvalParams: {
        foreignKey: Number(this.$route.params.id), // 是 long 外键ID 大定ID／正签ID／草签ID
        createUserId: this.$route.query.managerId, // 是 int 发起人ID
        createUserName: this.$route.query.userName, // 是 String 发起人姓名
        checkType: 2, // 是 int 2驳回 3 通过
        type: 0, // 是 String 审核类型 1大定审核／2草签审核／3正签审核/4带看奖审核
        remark: '' // 否 String 备注
      },
      approvalModelBtnColor: 'primary',
      approvalModelBtn: '通过',
      remarkTxt: '',
      remarkTxtLength: 0
    }
  },
  watch: {
    remarkTxt: function (val) {
      this.remarkTxtLength = val.length
      this.approvalParams.remark = val
    }
  },
  created () {
    let { reviewState, type, id } = this.$route.params
    // 判断是否已审批
    if (reviewState === '1') {
      this.approvalBtnShow = true
    } else {
      this.approvalBtnShow = false
    }
    // 审核类型 1：大定审核／2：草签审核／3：正签审核/4：申佣审批
    this.approvalParams.type = parseInt(type)
    switch (type) {
      case '1':
        this.isDDshow = true
        break
      case '2':
        this.isPresignshow = true
        break
      case '3':
        this.isSignshow = true
        break
      case '4':
        this.isLookshow = true
        break
      default:
        break
    }
    if (type === '4') {
      this.$axios.get(this.acApi + '/v1/reward/visit/' + id)
        .then(Response => {
          if (Response.data.code === 200 && Response.data.status === 'success') {
            this.getCheckList(Response.data.data.rewardId)
            this.approvalParams.foreignKey = Response.data.data.rewardId
          }
        })
    } else {
      this.getCheckList(id)
      this.approvalParams.foreignKey = id
    }
  },
  methods: {
    getCheckList (id) {
      // 加载审批详情数据
      this.$axios.get(this.$route.params.type === '4' ? (this.acApi + '/v1/reward/check/' + id) : (this.gjglApi + '/homepage/v1/check'), {
        params: {
          keyId: id, // 是 Long 关键Id type为1大定Id 为2草签Id 为3时签约Id 为4时申佣Id
          type: this.$route.params.type, // 是 Long 1大定 2草签 3签约 4申佣
          rewardId: id // 是 Long 1大定 2草签 3签约 4申佣
        }
      })
        .then(Response => {
          // 审批记录
          let res = Response.data.data
          if (res.length !== 0) {
            this.isSPshow = true
            res.forEach(item => {
              this.VhouseFinishedLog.push(item)
            })
            if (!this.approvalBtnShow) {
              this.VhouseFinishedLog[0].checkColor = '#F48A18'
              if (this.VhouseFinishedLog[0].checkType === 2) {
                this.VhouseFinishedLog[0].checkColor = '#FF5555'
              } else if (this.VhouseFinishedLog[0].checkType === 3) {
                this.VhouseFinishedLog[0].checkColor = '#3FC8A3'
              } else {
                this.VhouseFinishedLog[0].checkColor = '#F48A18'
              }
            }
          } else {
            this.isSPshow = false
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast('网络错误，不能访问')
        })
    },
    goBack: function () {
      this.$router.go(-1)
    },
    shortImg: function (imgArr) {
      let newimgArr = []
      imgArr.forEach(item => {
        newimgArr.push(item + '?imageView2/2/w/200')
      })
      return newimgArr
    },
    isPass: function (val) {
      this.remarkTxt = ''
      this.thisApproveType = val
      // 判断btn是通过还是驳回
      if (val === 'A') {
        this.approvalParams.checkType = 3
        this.approvalParams.checkStatus = 3
        if (this.approvalParams.type === 4) {
          this.approvalMsg()
        } else {
          this.popupVisible = true
          this.approvalModelBtnColor = 'primary'
          this.approvalModelBtn = '确定通过'
          this.approvalTitle = '通过'
        }
      } else {
        this.popupVisible = true
        this.approvalModelBtnColor = 'danger'
        this.approvalModelBtn = '确定驳回'
        this.approvalTitle = '驳回'
        this.approvalParams.checkType = 2
        this.approvalParams.checkStatus = 2
      }
    },
    approvalMsg () {
      if (this.approvalParams.remark === '' && this.approvalParams.checkType === 2) {
        this.$toast('请输入驳回内容')
        return false
      }
      this.$axios.put(this.acApi + '/manager-homePage/v1/check', this.approvalParams)
        .then(Response => {
          if (Response.data.code === 200 && Response.data.status === 'success') {
            this.popupVisible = false
            this.$toast('成功')
            setTimeout(function () {
              let { managerId, propertyId, userName } = this.$route.query
              this.$router.push(`/approval?managerId=${managerId}&propertyId=${propertyId}&userName=${userName}&selected=2`)
            }, 500)
          } else {
            this.$toast(Response.data.info)
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast('网络错误，不能访问')
        })
    }
  }
}
</script>

<style scoped>
  @import "./../../../assets/css/approve.css";
  .content {
    position: absolute;
    top: 45px;
    right: 0;
    bottom: 0px;
    left: 0;
    padding-bottom: 10px;
    overflow-y: scroll;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-overflow-scrolling: touch;
    background: #f4f4f4;
  }
  header {
    padding: 0 20px;

  }

  header img {
    vertical-align: middle;
  }

  .content {
    padding-bottom: 60px;
    top: 0;
    background: none;
  }

  .content-block {
    margin-top: 5px;
  }

  .commissionInfo ul {
    border-top: 1px solid #ddd;
    padding: 10px 0;
  }

  .commissionInfo ul:nth-child(2) {
    padding: 0 0 10px;
    border: 0;
  }
</style>
