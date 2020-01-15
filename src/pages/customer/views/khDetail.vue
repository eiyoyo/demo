<template>
  <div class="kh-detail">
    <mt-header title="客户详情" class="white" fixed>
      <div slot="left">
        <mt-button @click="backHome"><img src="../../../assets/img/btn_back.png" height="18" width="24"/></mt-button>
      </div>
      <div slot="right" v-if="isCanTransfer">
        <img src="../../../assets/img/topbar_btn_more.png" width="44px" height="44px" @click="distributionBox=true">
        <div class="kehufanpei" @click="allotcrew=true;distributionBox=false" v-if="distributionBox">
          <img src="../../../assets/img/pop_ic_zhuanyi.png" width="17px" height="17px">
          <em class="triangle"></em>
          <span>客户分配</span>
        </div>
      </div>
    </mt-header>
    <main v-if="kh">
      <div class="customer_brief">
        <ul>
          <li v-for="item in customerInfo" :key="item.id">
            <div class="info_box">
              <img src="../../../assets/img/client_ic_man.png" width="17px" height="18px" >
              <span class="customer_name ellipse">{{ item.customerName }}</span>
              <span class="customer_phone ellipse" >{{ item.customerPhones }}</span>
            </div>
            <img src="../../../assets/img/icon_call.png" width="28px" height="28px" @click="phone(item.customerPhones)" v-if="item.customerPhone.indexOf('****') === -1">
          </li>
        </ul>
      </div>
      <div class="customer_title" @click="goAnalysis">
        <span>客户详情</span>
        <img src="../../../assets/img/client_ic_more_you_blue.png" width="8px" height="14px" >
      </div>
      <div class="history_course">
        <ul>
          <li v-for="(item,index) in customerProcess" :key="item.id">
            <div class="process_title" @click="getProcessDetail(item.id,item.type,index)">
              <span :class="item.bgName">
                {{  item.progressName }}
              </span>
              <div>
                <span class="checking" v-if="item.examineStateName && item.examineStateName === '待提交' && index === currentProcess" style="color:#FFBC00">
                  <img src="../../../assets/img/shenhe_ic_wait.png" width="16" height="16"/>{{item.examineStateName}}
                </span>
                <span class="checking" v-if="item.examineStateName && item.examineStateName === '审核中' && index === currentProcess" style="color:#FFBC00">
                  <img src="../../../assets/img/shenhe_ic_wait.png" width="16" height="16"/>{{item.examineStateName}}
                </span>
                <span class="checking" v-if="item.examineStateName && item.examineStateName === '通过' && index === currentProcess" style="color:#3FC8A3">
                  <img src="../../../assets/img/shenhe_ic_success.png" width="16" height="16"/>{{item.examineStateName}}
                </span>
                <span class="checking" v-if="item.examineStateName && item.examineStateName === '被驳回' && index === currentProcess" style="color:#FF5555">
                  <img src="../../../assets/img/shenhe_ic_red.png" width="16" height="16"/>{{item.examineStateName}}
                </span>
                <span class="checking" v-if="item.examineStateName && item.examineStateName === '退房' && index === currentProcess" style="color:#FFBC00">
                  <img src="../../../assets/img/shenhe_ic_yellow.png" width="16" height="16"/>{{item.examineStateName}}
                </span>
                <span class="checking" v-if="item.examineStateName && item.examineStateName === '退定' && index === currentProcess" style="color:#FFBC00">
                  <img src="../../../assets/img/shenhe_ic_yellow.png" width="16" height="16"/>{{item.examineStateName}}
                </span>
                <span class="time">
                  {{ item.createTime.split(" ")[0] }}
                </span>
              </div>
            </div>
            <div v-if="index === currentProcess">
              <!-- 报备 -->
              <div class="process_detail" v-if="item.detail && item.type === '1'" @click="$router.push({ path: '/BaobeiDetail/'+item.id })">
                <div>
                  <p class="process_baobei_item"><span>预约时间:</span>{{item.detail[0].visitTime || "暂无"}}</p>
                  <p class="process_baobei_item"><span>来访人数:</span>{{item.detail[0].visitorsNumber || "暂无"}}</p>
                  <p class="process_baobei_item"><span>来访方式:</span>{{item.detail[0].customerBusId === 0?'自驾': '班车'}}</p>
                  <p class="process_baobei_item"><span>备注信息:</span><span>{{item.detail[0].remark || "暂无"}}</span></p>
                </div>
                <div>
                  <img src="../../../assets/img/btn_right.png" height="14" width="8"/>
                </div>
              </div>
              <!-- 来访 -->
              <div class="process_detail" v-if="item.detail && item.type === '2'" @click="$router.push({ path: '/LaifangDetail/'+item.id })">
                <div>
                  <p class="process_baobei_item"><span>落座:</span>{{item.detail[0].isSitDown === 1 ? '是' : "否"}}</p>
                  <p class="process_baobei_item"><span>落位:</span>{{item.detail[0].isEngoyHouse === 1 ? '是' : "否"}}</p>
                  <p class="process_baobei_item"><span>来访人数:</span>{{item.detail[0].visitorsNumber }}</p>
                  <p class="process_baobei_item"><span>备注信息:</span>{{item.detail[0].remark || "暂无"}}</p>
                </div>
                <div>
                  <img src="../../../assets/img/btn_right.png" height="14" width="8"/>
                </div>
              </div>
              <!-- 认购 -->
              <div class="process_detail" v-if="item.detail && item.type === '3'" @click="$router.push({ path: '/dadingDetail/'+item.id })">
                <div style="width: 100%">
                  <p class="process_dading_item" style="color: rgba(70, 129, 235, 1)">
                    <img src="../../../assets/img/icon_hotel.png" height="16" width="16"/>
                    {{item.detail[0].propertyName}}
                    {{item.detail[0].buildingName ? item.detail[0].buildingName + '栋' : ''}}
                    {{item.detail[0].unitName ? item.detail[0].unitName + '单元' : ''}}
                    {{item.detail[0].houseName ? item.detail[0].houseName + '室' : ''}}
                  </p>
                  <p class="process_dading_item"><span>认购金额:</span>{{item.detail[0].price}}元</p>
                  <p class="process_dading_item"><span>总价:</span>{{item.detail[0].totalPrice}}元</p>
                  <p class="process_dading_item"><span>面积:</span>{{item.detail[0].dadingArea}} m²</p>
                  <p class="line"></p>
                  <p class="process_dading_item"><span>备注信息:</span>{{item.detail[0].remark || "暂无"}}</p>
                </div>
                <div>
                  <img src="../../../assets/img/btn_right.png" height="14" width="8"/>
                </div>
              </div>
              <!-- 草签 -->
              <div class="process_detail" v-if="item.detail && item.type === '4'" @click="$router.push({ path: '/signDetail/'+item.id })">
                <div>
                  <p class="process_dading_item" style="color: rgba(70, 129, 235, 1)">
                    <img src="../../../assets/img/icon_hotel.png" height="16" width="16"/>
                    {{item.detail[0].propertyName}}
                    {{item.detail[0].buildingName ? item.detail[0].buildingName + '栋' : ''}}
                    {{item.detail[0].unitName ? item.detail[0].unitName + '单元' : ''}}
                    {{item.detail[0].houseName ? item.detail[0].houseName + '室' : ''}}
                  <p class="process_dading_item"><span>首付金额:</span>{{item.detail[0].firstPrice}}元</p>
                  <p class="process_dading_item"><span>总价:</span>{{item.detail[0].totalPrice}}元</p>
                  <p class="process_dading_item"><span>面积:</span>{{item.detail[0].buildArea}}m²</p>
                  <p class="line"></p>
                  <p class="process_dading_item"><span>备注信息:</span>{{item.detail[0].remark || "暂无"}}</p>
                </div>
                <div>
                  <img src="../../../assets/img/btn_right.png" height="14" width="8"/>
                </div>
              </div>
              <!-- 正签 -->
              <div class="process_detail" v-if="item.detail && item.type === '5'" @click="$router.push({ path: '/presignDetail/'+item.id })">
                <div>
                  <p class="process_dading_item" style="color: rgba(70, 129, 235, 1)">
                    <img src="../../../assets/img/icon_hotel.png" height="16" width="16"/>
                    {{item.detail[0].propertyName}}
                    {{item.detail[0].buildingName ? item.detail[0].buildingName + '栋' : ''}}
                    {{item.detail[0].unitName ? item.detail[0].unitName + '单元' : ''}}
                    {{item.detail[0].houseName ? item.detail[0].houseName + '室' : ''}}
                  </p>
                  <p class="process_dading_item"><span>首付金额:</span>{{item.detail[0].firstPrice}}元</p>
                  <p class="process_dading_item"><span>总价:</span>{{item.detail[0].totalPrice}}元</p>
                  <p class="process_dading_item"><span>面积:</span>{{item.detail[0].buildArea}}m²</p>
                  <p class="line"></p>
                  <p class="process_dading_item"><span>备注信息:</span>{{item.detail[0].remark || "暂无"}}</p>
                </div>
                <div>
                  <img src="../../../assets/img/btn_right.png" height="14" width="8"/>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="qudao" v-if="showqudao">
        <div class="qd-title">
          <img src="../../../assets/img/icon_tie.png" width="13px" height="18px"/>&nbsp;<span class="guishu" >渠道信息</span>
        </div>
        <div class="qd-main">
          <a class="name">
            <span>{{kh.customerDetail.memberName || "暂无"}}&nbsp;&nbsp;&nbsp;&nbsp; {{kh.customerDetail.memberPhone || "暂无"}}</span>
            <img src="../../../assets/img/icon_call.png" style="float: right" height="28" width="28" @click="phone(kh.customerDetail.memberPhone)"/>
            <img src="../../../assets/img/client_ic_more_shang.png" @click="show()" v-if="isShow" class="show" >
            <img src="../../../assets/img/client_ic_more_xia.png" @click="show()" v-if="!isShow" class="show">
          </a>
          <div style="padding: 7px 0" v-if="isShow">
            <p class="qd-item"><span>所属分行:</span>{{kh.customerDetail.branchName || "暂无"}}</p>
            <p class="qd-item"><span>所属公司:</span>{{kh.customerDetail.companyName || "暂无"}}</p>
          </div>
        </div>
      </div>
      <div class="liandong" v-if="isShow && showqudao">
        <div class="ld-main">
          <a @click="phone(kh.customerDetail.placeUserPhone)" class="name">联动归属：{{kh.customerDetail.placeUserName ||
            "暂无"}}<span>{{kh.customerDetail.placeUserPhone}}</span>
            <img src="../../../assets/img/icon_call.png" style="float: right" height="28" width="28"/>
          </a>
        </div>
      </div>
      <div class="followInfo">
        <div class="followTop">
          <img src="../../../assets/img/genjin_ic_chat.png" width="16" height="16">
          <span>跟进信息</span>
          <router-link v-if="totalCount>5" class="seeAll" :to="{path:'/customerFollowbox', query: {customerId: this.$route.params.customerId}}">查看全部{{this.totalCount}}</router-link>
        </div>
        <ul class="list-ul">
          <li v-for="(item,index) in listData" :key="index">
            <div class="top">
              <span class="inline-flex">
                <span v-if='item.followRole==1' class='anchangColor'>{{item.followMan}}</span>
                <span v-if='item.followRole==2' class='liandongColor'>{{item.followMan}}</span>
                <span v-if='item.followRole==3' class='qudaoColor'>{{item.followMan}}</span>
                <img v-if='item.followRole==1' src="../../../assets/img/genjin_ic_an.png">
                <img v-if='item.followRole==2' src="../../../assets/img/genjin_ic_lian.png">
                <img v-if='item.followRole==3' src="../../../assets/img/genjin_ic_qu.png">
                </span>
              <span class="time">{{item.followTime}}</span>
            </div>
            <div class="bottom">
              <em class="triangle triangle_two"></em>
              <em class="triangle triangle_one"></em>
              <div class="genjinText">
                <p>{{decodeURIComponent(item.text)}}</p>
                <div class="playSoundBox" v-if='item.recordFile'>
                  <span >
                    <img v-if="showPlayImg(index)" @click="pauseSound(item.recordFile,index)" src="../../../assets/img/genjin_btn_pause@2x.png" width="34" height="35">
                    <img v-if="!showPlayImg(index)" @click="playSound(item.recordFile,index)" src="../../../assets/img/genjin_btn_play@2x.png" width="34" height="35">
                  </span>
                  <div class="progressCantainer">
                    <div class="progressTime" :style="{width: 0}"></div>
                  </div>
                </div>
              </div>
              <img v-if='item.followType==1' src="../../../assets/img/genjin_ic_talk.png">
              <img v-if='item.followType==2' src="../../../assets/img/genjin_ic_wechat.png">
              <img v-if='item.followType==3' src="../../../assets/img/genjin_ic_phone.png">
              <span v-if='item.followType==4'></span>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <mt-popup
      class="popup"
      v-model="allotcrew"
      position="bottom"
      popup-transition="popup-fade">
      <div class="choice_person">
        <div class="choice_person_header">
          <span @click="allotcrew = false">
            <img src="../../../assets/img/btn_close.png" height="17" width="16"/>
          </span>
          <span class="itemOption">选择组员</span>
        </div>
        <ul class="person_list">
          <li v-for="(item,index) in personList"
              @click="selectUser(item.userId,item.fullName)"
              :key="index"
              :class="{selectitem:currentMenberId === item.userId}">
            <div>
              {{item.fullName}}
            </div>
            <div class="img" v-if="currentMenberId === item.userId"><img
              src="../../../assets/img/icon_checked.png" height="14" width="18"/>
            </div>
          </li>
        </ul>
      </div>
    </mt-popup>

    <mt-popup
      class="confirmation_box"
      v-model="confirmationBox"
      popup-transition="popup-fade">
      <div class="inner_box">
        <p>请确定将该客户分配给案场：</p>
        <p><span>{{checkedUser}}</span>吗？</p>
        <mt-button type="primary" @click="confirmationBox = false">取消</mt-button>
        <mt-button type="primary" @click="allotUserSure">确定</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'kh-detail',
  data () {
    return {
      kh: null,
      totalCount: 0,
      customerId: this.$route.params.customerId,
      type: null,
      isShow: true,
      listData: [],
      fullPath: this.$route.fullPath,
      audioBox: [],
      distributionBox: false,
      currentMenberId: '',
      allotcrew: false,
      confirmationBox: false,
      checkedUser: '',
      isCanTransfer: '',
      currentItemType: 1,
      currentItem: '',
      personList: [],
      customerInfo: [],
      customerClass: '',
      // 客户进程
      customerProcess: [],
      // 当前项
      currentProcess: '',
      currentProcessCss: 'name'
    }
  },
  created () {
    this.getGenjin()
    this.getPersonId()
    this.getCustomerInfo()
    this.getCustomerProcess()
  },
  destroyed: function () {
    this.stopPlaySound()
  },
  methods: {
    // 获取客户姓名和电话号
    async getCustomerInfo () {
      let res = await this.$axios.get(this.khzxApi + '/customer/v1/customer-detail?customerId=' + this.$route.params.customerId)
      if (res.data.status === 'success') {
        this.customerInfo = res.data.data.listPerson
        this.customerInfo.forEach((item) => {
          item.customerPhones = this.setPhonrNum(item.customerPhone)
        })
        this.customerClass = res.data.data.list[0].Level
      }
    },
    // 处理电话号隐藏
    setPhonrNum (num) {
      return num.substr(0, 3) + '****' + num.substr(7)
    },
    // 客户历史流程
    getCustomerProcess () {
      this.$axios.get(this.acApi + '/customer/v2.2.1/customer?customerId=' + this.customerId).then((res) => {
        if (res.data.code === 200) {
          // 客户分配数据
          this.isCanTransfer = res.data.data.customerDetail.isCanTransfer
          // 客户详情数据
          this.kh = res.data.data
          // 客户过程数据
          this.customerProcess = res.data.data.customerProcess
          this.customerProcess.forEach((item) => {
            item.progressName = this.setText(item.type, item.count)
            item.bgName = 'name'
          })
          let { id, type } = this.customerProcess[0]
          this.getProcessDetail(id, type, 0)
        } else {
          return false
        }
      })
    },
    // 设置历史进程名
    setText (type, count) {
      switch (type) {
        case '1':
          return '报备'
        case '2':
          return count + '访'
        case '3':
          return '认购'
        case '4':
          return '正签'
        case '5':
          return '草签'
        default: return false
      }
    },
    // 获取客户历史流程详情
    async getProcessDetail (keyId, type, index1) {
      this.currentProcess = index1
      let res = await this.$axios.get(this.acApi + '/customer/v2.3.0/customer-processdetail', { params: { keyId, type } })
      if (res.data.code === 200) {
        this.customerProcess.forEach((item, index) => {
          item.bgName = 'name'
          if (item.type === type) {
            this.$set(this.customerProcess[index], 'detail', res.data.data)
          }
        })
      }
      this.customerProcess[index1].bgName = 'name name_change'
      this.statesManage(index1, type)
    },
    // 处理客户过程的数据的审核状态
    statesManage (index, type) {
      let thisItem = this.customerProcess[index]
      if (type === '3') {
        switch (thisItem.detail[0].examineState) {
          case 1:
            this.$set(thisItem, 'examineStateName', '审核中')
            break
          case 2:
            this.$set(thisItem, 'examineStateName', '通过')
            break
          case 3:
            this.$set(thisItem, 'examineStateName', '被驳回')
            break
          case 4:
            this.$set(thisItem, 'examineStateName', '退定')
            break
          case 5:
            this.$set(thisItem, 'examineStateName', '待提交')
            break
          default:
            break
        }
      } else if (type === '4' || type === '5') {
        switch (thisItem.detail[0].examineState) {
          case 1:
            this.$set(thisItem, 'examineStateName', '审核中')
            break
          case 2:
            this.$set(thisItem, 'examineStateName', '审核中')
            break
          case 3:
            this.$set(thisItem, 'examineStateName', '审核中')
            break
          case 4:
            this.$set(thisItem, 'examineStateName', '通过')
            break
          case 5:
            this.$set(thisItem, 'examineStateName', '被驳回')
            break
          case 6:
            this.$set(thisItem, 'examineStateName', '退房')
            break
          case 7:
            this.$set(thisItem, 'examineStateName', '待提交')
            break
        }
      }
    },
    // 获取分配客户的案场专员列表数据
    async getPersonId () {
      let res = await this.$axios.get(this.hrApi + '/outside/v2/property-users', {
        params: {
          propertyId: this.$route.params.propertyId,
          roleType: 1,
          managerRoleType: 2,
          managerId: this.$route.params.userId
        }
      })
      if (res.data.code === 200) {
        this.personList = res.data.data
      }
    },
    // 跳转到客户分析
    goAnalysis () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebKehu + '/customerAnalysis?customerId=' + this.$route.params.customerId + '&customerClass=' + this.customerClass)
        // } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //   window.webkit.messageHandlers.yincang.postMessage({'body': this.acjlWebKehu + "/customerAnalysis?customerId=" + this.$route.params.customerId + "&customerClass=" + this.customerClass});
      } else { // pc
        this.$router.push('/customerAnalysis?customerId=' + this.$route.params.customerId + '&customerClass=' + this.customerClass)
      }
    },
    // 选中分配的案场专员
    selectUser (id, name) {
      this.confirmationBox = true
      this.checkedUser = name
      this.checkedUserId = id
      this.allotcrew = false
    },
    // 确认分配
    async allotUserSure () {
      let res = await this.$axios.put(this.acApi + '/customer/v1/change-customer', {
        customerIdList: [this.$route.params.customerId],
        afterSaleUserId: +this.checkedUserId,
        changeUserId: this.$route.params.userId
      })
      if (res.data.code === 200) {
        this.Toast('转移客户成功！')
        this.goUserList()
      } else {
        this.Toast(res.data.info)
      }
      this.confirmationBox = false
      this.allotcrew = false
    },
    // 分配成功跳转到客户列表页
    goUserList () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebKehu + '/list?userId=' + this.$route.params.userId + '&propertyId=' + this.$route.params.propertyId)
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.yincang.postMessage({ 'body': this.acjlWebKehu + '/list?userId=' + this.$route.params.userId + '&propertyId=' + this.$route.params.propertyId })
      } else { // pc
        this.$router.push('/list?userId=' + this.$route.params.userId + '&propertyId=' + this.$route.params.propertyId)
      }
    },
    backHome () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.backHome()
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.xianshi.postMessage('')
      } else { // pc
        this.$router.back()
      }
    },
    phone (number) {
      this.stopPlaySound()
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
    },
    show: function () {
      this.stopPlaySound()
      this.isShow = !this.isShow
    },
    playSound (sound, index) {
      this.activeSound = index
      for (var i = 0; i < this.audioBox.length; i++) {
        this.audioBox[i]['isplay'] = false
      }
      // this.interverFunc()
      this.audioBox[index]['isplay'] = true
      // this.showPlay = !this.showPlay;
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.mediaPlayerStart('http://rec.goothy.com:33887' + sound)
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.bofang.postMessage({ 'body': 'http://rec.goothy.com:33887' + sound })
      }
    },
    pauseSound (sound, index) { // 暂停播放
      // this.showPlay = !this.showPlay;
      this.audioBox[index]['isplay'] = false
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.mediaPlayerPause()
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.pause.postMessage('')
      }
    },
    stopPlaySound () { // 跳出页面停止播放
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.mediaPlayerStop()
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.stopbofang.postMessage('')
      }
    },
    showPlayImg (index) { // 切换当前播放暂停图片
      return this.audioBox[index] && this.audioBox[index]['isplay'] && index === this.activeSound
    },
    getGenjin () {
      this.$axios.get(this.acApi + '/customer/v1/follow-list' + '?pageSize=5&customerId=' + this.$route.params.customerId).then((res) => {
        if (res.data.status === 'success') {
          this.listData = res.data.data.list
          this.totalCount = res.data.data.totalCount
          let audioBox = []
          this.listData.map(e => {
            audioBox.push({ isplay: false, progress: 0 })
          })
          this.audioBox = audioBox
        }
      })
    }
  },
  filters: {
    formatPhone (number) {
      return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
    }
  },
  computed: {
    showqudao () {
      return this.kh.customerDetail.memberName || this.kh.customerDetail.memberPhone || this.kh.customerDetail.branchName || this.kh.customerDetail.companyName || this.kh.customerDetail.placeUserName
    }
  }
}
</script>

<style scoped lang="scss">
  .ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .history_course{
    width: 100%;
    margin-top: 4px;
    background-color: #fff;
    margin-bottom: 20px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
    li{
      margin: 0 20px;
      border-bottom: 1px solid #f3f3f3;
      border-left: 2px dashed #dedede;
      .process_title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: RGBA(222, 222, 222, 1);
        font-size: 12px;
        .name{
          width: 49px;
          color: #ffffff;
          padding: 16px 0;
          text-indent: 8px;
          background: url("../../../assets/img/client_bg_on.png") no-repeat left center;
          background-size: 49px 24px;
          background-position: 0px center;
          margin-left: -2px;
        }
        .name_change{
          background: url("../../../assets/img/client_bg_off.png") no-repeat left center;
          background-size: 49px 24px;
          background-position: 0px center;
        }
        .checking {
          font-size: 14px;
          color: #FFBC00;
          display: inline-flex;
          align-items: center;
          display: inline-block;
          margin-right: 10px;
          img{
            margin: -2px 3px 0 0;
          }
        }
      }
      .process_detail{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        .process_baobei_item{
          font-size: 16px;
          line-height: 20px;
          padding: 6px 0 10px 0;
          display: flex;
          align-items: center;
        }
        p:last-child{
          min-height: 48px;
          border-top: 1px solid #F4F3F4;
          span:nth-child(1){
            min-width: 69px;
          }
          .remark{
            color: #333;
          }
        }
        span{
          color: #999999;
          display: inline-block;
          vertical-align: middle;
          margin-right: 12px;
        }
        .process_dading_item{
          font-size: 16px;
          line-height: 20px;
          padding: 6px 0 10px 0;
          display: flex;
          align-items: center;
          img{
            margin-right: 7px;
          }
        }
      }
    }
  }

  img {
    vertical-align: middle
  }
  .triangle {
      display:block;
      width:0;
      height:0;
      border-width: 0 5px 5px;
      border-style:solid;
      border-color:transparent transparent #fff;
      position:absolute;
      top: -3px;
      left: 115px;
  }

  .qudao {
    // margin-bottom: 24px;
    .qd-title {
      padding: 24px 0px 7px 20px;
      font-weight: bold;
      font-size: 16px;
      color: rgba(176, 172, 172, 1);
      line-height: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: #fff;
    }
    .qd-main {
      background: #ffffff;
      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        padding: 10px 20px;
        border-bottom: 1px solid #f3f3f3;
        text-decoration: none;
        color: rgba(51,51,51,1);
      }
      .qd-item {
        font-size: 16px;
        line-height: 1;
        padding: 8px 20px;
        span {
          color: #999999;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }

  .liandong {
    margin-bottom: 16px;
    .ld-main {
      background: #ffffff;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      border-top: 1px solid #f3f3f3;
      a {
        text-decoration: none;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      span {
        color: #999999;
        font-weight: normal;
        display: inline-block;
        vertical-align: middle;
        margin-left: 16px;
      }
    }
  }

  .show {
    width: 14px;
    height: 8px;
    font-weight: bold;
    font-size: 12px;
    color: rgba(176, 172, 172, 1);
  }
  .qd-title .guishu {
    color: #333;
    flex: 5;
  }
  .followInfo {
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    margin-top: 16px;
  }
  .followTop {
    display: flex;
    padding-top: 23px;
    padding-bottom: 25px;
    align-items: center;
    font-weight: bold;
    .seeAll{
      font-size: 12px;
      text-decoration: none;
      color: #0076FF;
    }
    img {
      margin-right: 6px;
    }
    span {
      flex: 1;
    }
  }
  .outerBox {
    margin-top: 0 !important;
    padding: 20px 0 !important;
  }

   .liandongColor{
    color:#F2698A;
  }
  .qudaoColor{
    color:#3FC8A3;
  }
  .anchangColor{
    color:#FF9B3A;
  }
  .outerBox {
    margin-top: 44px;
    background-color: #fff;
    padding: 21px 20px 0 20px;
  }
  .list-ul li{
    margin-bottom: 20px;
    .top {
      height: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 20px;
      .time {
        font-size: 10px;
        color: #999;
      }
      .inline-flex {
        display: inline-flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        img {
        width: 20px;
        height: 16px;
        margin-left: 4px;
        }
      }
    }
  }
  .bottom {
    background-color: #FAFAFA;
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 14px 0 14px 12px;
    position: relative;
    border-radius: 3px;
    border: 1px solid rgba(221,221,221,1);
    .triangle{
      display: block;
      position: absolute;
      left: 15px;
      width:0;
      height:0;
      border-right:8px solid transparent;
      border-left:8px solid transparent;
    }
    .triangle_one{
      top: -7px;
      border-bottom:8px solid #FAFAFA;
    }
    .triangle_two{
      top: -8px;
      border-bottom:8px solid rgba(221,221,221,1);
    }
    .genjinText {
      color: #333;
      line-height: 1.6;
    }
    img {
      width: 38px;
      height: 34px;
    }
  }
  .bottom .playSoundBox {
    width: 142px;
    height: 34px;
    background-color: #0076FF;
    border-radius: 17px;
    margin-top: 6px;
    position: relative;
    .progressCantainer {
      width: 80px;
      height: 4px;
      border-radius: 2px;
      background-color: #4D9FFF;
      position: absolute;
      top: 15px;
      left: 42px;
      .progressTime {
        width: 0;
        height: 4px;
        border-radius: 2px;
        background-color: #fff;
      }
    }
  }

  // ----- v2.1
  .customer_brief{
    margin-top: 40px;
    padding: 0 20px;
    background-color: #fff;
    li{
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #F3F3F3;
      .info_box{
        display: flex;
        span{
          display: block;
        }
      }
      img:nth-child(1){
        margin: 12px 9px 0 0;
      }
      img:nth-child(2){
        margin-top: 12px;
      }
      span:nth-child(2){
        color:rgba(51,51,51,1);
        margin-right: 20px;
        width: 90px;
      }
      span:nth-child(3){
        width: 110px;
      }
    }
  }
  // 客户详情
  .customer_title{
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.06);
    span{
      font-size: 16px;
      color:rgba(0,118,255,1);
    }
  }
  // 客户分配框
  .kehufanpei{
    width:127px;
    height:50px;
    line-height: 50px;
    position: absolute;
    top: 41px;
    right: 8px;
    padding: 0 20px;
    background-color: #f3f3f3;
    display: flex;
    color: #333333;
    justify-content: space-between;
    border-radius: 3px;
    img{
      margin-top: 15px;
    }
    .triangle{
      display: block;
      position: absolute;
      left: 105px;
      top: -7px;
      width:0;
      height:0;
      border-right:8px solid transparent;
      border-left:8px solid transparent;
      border-bottom:8px solid #f3f3f3;
    }
  }
  .popup {
    width: 100%;
  }
  // 确认选择的弹框
  .confirmation_box{
    border-radius:4px;
    overflow: hidden;
    .inner_box{
      width:295px;
      height:148px;
      padding: 20px;
      background:rgba(255,255,255,1);
      text-align: center;
      p{
        line-height: 32px;
        font-weight:600;
        color:rgba(51,51,51,1);
        .allot_nau{
          color:rgba(255,106,0,1);
        }
      }
      button{
        margin-top: 14px;
        width:120px;
        height:40px;
        background:rgba(40,128,254,1);
        border-radius:2px;
      }
      button:nth-child(3){
        color:#0076FF;
        background:rgba(221,221,221,1);
        margin-right: 10px;
      }
      button:nth-child(4){
        color:#FFFFFF;
        background:rgba(40,128,254,1);
      }
    }
  }
  // 分配案场专员
  .choice_person{
    width: 100%;
    max-height: 217px;
    margin-top: 52px;
    overflow-y: scroll;
    padding: 0 0 0 20px;
    .choice_person_header{
      width: 95%;
      height: 52px;
      line-height: 52px;
      font-weight: 600;
      position: absolute;
      top: 0;
      font-size: 20px;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dddddd;
    }
    .person_list{
      li{
        padding: 12px 21px 12px 0;
        text-align: center;
        font-size: 16px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dddddd;
      }
    }
  }
</style>
