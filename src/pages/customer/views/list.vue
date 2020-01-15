<template>
  <div class="list">
    <mt-header fixed title="客户" class="black">
      <span slot="left" @click="goToSearch">
        <img class="sousuo" src="../../../assets/img/topbar_btn_search_white.png" width="44" height="44">
      </span>
      <span slot="right" class="allotClient">
        <div class="e-input">
          <button class="cancel_btn" @click="showAllotList(0)" v-if="showAllot">取消</button>
          <img src="../../../assets/img/topbar_btn.png" height="21px" width="22px" @click="showAllotList(1)" v-if="showChange" >
        </div>
      </span>
    </mt-header>
    <mt-navbar fixed v-model="managerCustomerParams.customerState">
      <mt-tab-item id="1" @click.native="managerCustomer('1',1,currentMenberId);managerMember('1',salesUserIdList)"><span>全部</span></mt-tab-item>
      <mt-tab-item id="2" @click.native="managerCustomer('2',1,currentMenberId);managerMember('2',salesUserIdList)"><span>预约</span></mt-tab-item>
      <mt-tab-item id="3" @click.native="managerCustomer('3',1,currentMenberId);managerMember('3',salesUserIdList)"><span>来访</span></mt-tab-item>
      <mt-tab-item id="4" @click.native="managerCustomer('4',1,currentMenberId);managerMember('4',salesUserIdList)"><span>成交</span></mt-tab-item>
      <div class="crew ellipse" @click="popupVisible = true"><span>{{salesUserName}}</span></div>
    </mt-navbar>
    <main class="main_body" :style="{'-webkit-overflow-scrolling':(popupVisible?'':'touch')}">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div :class="selections" @click="changeHidden" v-if="toggleShow">
          <span class="icselect"> </span>
          <span>隐藏已退定/已退房客户</span>
        </div>
        <ul class="list-ul"
            v-infinite-scroll="loadMore"
            :infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="1">
          <li v-for="(item,index) in listData"
              @click="showChange && goDetail(item.id)"
              :key="index">
              <div class="users_info_list">
                <div :class="item.isselected" v-if="showAllot">
                  <span class="icselect" v-if="item.isCanTransfer" @click.stop="addAllotUser(item.id)"></span>
                </div>
                <div class="users_info">
                  <div class="left">
                    <p class="name">
                      {{item.name}}
                      <span class="level" v-if="item.level">{{item.level === 1? 'A':item.level === 2? 'B':item.level === 3? 'C':item.level === 4? 'D': '' }}</span>
                    </p>
                    <p class="qudao">
                      <span class="qudaoInfo">{{item.custoStates}} </span>
                      <span class="qudaoInfo ellipse qudaoName" v-if="item.abbreviation || item.abbreviation !== null" >
                        {{item.abbreviation}}
                      </span>
                      <span class="qudaoInfo ellipse qudaoName" v-else>
                        自访
                      </span>
                    </p>
                    <span class="salesName ellipse " v-if="item.saleUserName">
                      {{ item.saleUserName }}
                    </span>
                  </div>
                  <div class="right">
                    <span class="checking" v-if="item.stateManage && (item.checkPass === 1)" style="color:#FFBC00">
                      <img src="../../../assets/img/shenhe_ic_wait.png" width="16" height="16"/>{{item.examineState}}
                    </span>
                    <span class="checking" v-if="item.stateManage && (item.checkPass === 2)" style="color:#3FC8A3">
                      <img src="../../../assets/img/shenhe_ic_success.png" width="16" height="16"/>{{item.examineState}}
                    </span>
                    <span class="checking" v-if="item.stateManage && item.checkPass === 3" style="color:#FF5555">
                      <img src="../../../assets/img/shenhe_ic_red.png" width="16" height="16"/>{{item.examineState}}
                    </span>
                    <span class="checking" v-if="item.stateManage && item.checkPass === 4" style="color:#FFBC00">
                      <img src="../../../assets/img/shenhe_ic_yellow.png" width="16" height="16"/>{{item.examineState}}
                    </span>
                    <span class="checking" v-if="item.stateManage && item.checkPass === 5" style="color:#FFBC00">
                      <img src="../../../assets/img/shenhe_ic_yellow.png" width="16" height="16"/>{{item.examineState}}
                    </span>
                  </div>
                  <p class="time">{{item.updateTime}}</p>
                </div>
              </div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="userlist_footer" v-if="showAllot">
        <div :class="userAllAllot" @click="selectAllUser" >
          <span class="icselect"></span>
          <span>{{selectAll}}</span>
        </div>
        <button :class="allotUsersBtn" @click="allotcrew = true;loading=false;" :disabled="userCheckList.length===0">{{allotBtnName}}</button>
      </div>
    </main>
    <!-- 筛选不同组员的客户列表 -->
    <mt-popup
      class="popup"
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade">
      <div class="list-manager">
        <div class="pop-action">
          <span @click="popupVisible = false"><img src="../../../assets/img/btn_close.png" height="17" width="16"/></span>
          <span class="itemOption">选择组员</span>
        </div>
        <ul class="list-manager-in">
          <li :class="{selectitem:currentUser}" @click="managerCustomer(managerCustomerParams.customerState,1,salesUserIdList);salesUserName = '全部'" >
            <div>
              全部
            </div>
            <div class="img" v-if="currentMenberId === salesUserIdList"><img
              src="../../../assets/img/icon_checked.png" height="14" width="18"/>
            </div>
          </li>
          <li :class="{selectitem:currentMenberId === 0}" @click="managerCustomer(managerCustomerParams.customerState,1,'0');salesUserName = '未指定'" >
            <div>
              未指定 ({{unAppointCustomerCount}})
            </div>
            <div class="img" v-if="currentMenberId === 0"><img
              src="../../../assets/img/icon_checked.png" height="14" width="18"/>
            </div>
          </li>
          <li v-for="(item,index) in inOrganization"
              @click="managerCustomer(managerCustomerParams.customerState,1,item.userId);salesUserName = item.fullName"
              :key="index"
              :class="{selectitem:currentMenberId === item.userId}">
            <div>
              {{item.fullName}} ({{item.customerNum}})
            </div>
            <div class="img" v-if="currentMenberId === item.userId"><img
              src="../../../assets/img/icon_checked.png" height="14" width="18"/>
            </div>
          </li>
        </ul>
        <ul class="list-manager-out">
          <li v-for="(item,index) in outOrganization"
              @click="managerCustomer(managerCustomerParams.customerState,1,item.userId);salesUserName = item.fullName"
              :key="index"
              :class="{selectitem:currentMenberId === item.userId}">
            <div>
              {{item.fullName}} ({{item.customerNum}})
              <span class="menber-manager">离职</span>
            </div>
            <div class="img" v-if="currentMenberId === item.userId"><img
              src="../../../assets/img/icon_checked.png" height="14" width="18"/></div>
          </li>
        </ul>
        <ul class="list-manager-out">
          <li v-for="(item,index) in examineOrganization"
              @click="managerCustomer(managerCustomerParams.customerState,1,item.userId);salesUserName = item.fullName"
              :key="index"
              :class="{selectitem:currentMenberId === item.userId}">
            <div>
              {{item.fullName}} ({{item.customerNum}})
              <span class="menber-manager">试用期</span>
            </div>
            <div class="img" v-if="currentMenberId === item.userId"><img
              src="../../../assets/img/icon_checked.png" height="14" width="18"/></div>
          </li>
        </ul>
      </div>
    </mt-popup>
    <!-- 分配组员 -->
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
        <p>确定将<span class="allot_nau">{{userCheckList.length}}名</span>客户分配给案场</p>
        <p><span>{{checkedUser}}</span>吗？</p>
        <mt-button type="primary" @click="confirmationBox = false">取消</mt-button>
        <mt-button type="primary" @click="allotUserSure">确定</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      popupVisible: false,
      checkedUser: '',
      checkedUserId: '',
      confirmationBox: false,
      allotcrew: false,
      SureBtn: 'allot_users_btn',
      loading: false,
      totalCount: 0,
      listData: [],
      selectAll: '全选当前',
      allotBtnName: '分配客户',
      salesUserName: '全部',
      managerCustomerParams: {
        managerId: this.$route.query.userId,
        salesUserId: '',
        pageSize: 50,
        pageNo: 1,
        propertyId: this.$route.query.propertyId,
        customerState: '1', // 1全部 2报备 3来访 4成交（正签+草签），默认1
        isShow: 0
      },
      manager: {
        managerId: this.$route.query.userId,
        propertyId: this.$route.query.propertyId,
        customerState: '1', // 客户状态 1全部 2报备 3来访 4成交（正签+草签），默认1
        isShow: 0
      },
      outOrganization: [],
      inOrganization: [],
      unAppointCustomerCount: '',
      examineOrganization: [],
      currentMenberId: null,
      salesUserIdList: '',
      allotUsersBtn: 'allot_users_btn',
      toggleShow: true,
      // 分配客户
      showAllot: false,
      showChange: true,
      selections: 'toggerselect',
      // 全选按钮的样式控制
      userAllAllot: 'toggerunselect',
      checkFlag: 0,
      // 被选中的客户的样式
      usersAllot: 'toggerunselect users_allot',
      // 已分配客户
      userCheckList: [],
      // 可分配用户列表
      checkBoxList: [],
      // 用于分配客户的案场专员列表
      personList: []
    }
  },
  created () {
    this.managerMember(1)
    let allSales = [...this.inOrganization, ...this.examineOrganization, ...this.examineOrganization]
    allSales.forEach((item, index) => {
      this.salesUserIdList.push(item.userId)
    })
    this.managerCustomer('1', 1)
    this.getPersonId()
  },
  methods: {
    async getPersonId () {
      let res = await this.$axios.get(this.hrApi + '/outside/v2/property-users', {
        params: {
          propertyId: this.$route.query.propertyId,
          roleType: 1,
          managerRoleType: 2,
          managerId: this.$route.query.userId
        }
      })
      console.log(res.data.data)
      if (res.data.code === 200) {
        this.personList = res.data.data
      }
    },
    // 参数 1.customerState 客户状态  2.页数 默认为1  3.案场专员Id列表
    managerCustomer (customerState, pageNo, salesUserId) {
      if (this.popupVisible) {
        this.popupVisible = false
      }
      this.loading = true
      this.Indicator.open()
      this.managerCustomerParams.salesUserId = salesUserId || null
      this.managerCustomerParams.customerState = customerState
      this.managerCustomerParams.pageNo = pageNo
      this.currentMenberId = salesUserId || this.salesUserIdList
      this.$axios.get(this.acApi + '/manager-customer/v2', { params: this.managerCustomerParams }).then((res) => {
        if (res.data.status === 'success') {
          if (!res.data.data.totalCount) {
            this.loading = false
            this.Indicator.close()
            this.totalCount = 80
            this.listData = {}
            return false
          }
          if (pageNo === 1) {
            this.listData = res.data.data.list
            this.listData.forEach((item, index) => {
              this.$set(item, 'isselected', 'toggerunselect users_allot')
              if (item.isCanTransfer === 1) {
                this.checkBoxList.push(item.id)
              }
            })
            this.setStateManage()
          } else {
            res.data.data.list.forEach((item, index) => {
              this.$set(item, 'isselected', 'toggerunselect users_allot')
              if (item.isCanTransfer === 1) {
                this.checkBoxList.push(item.id)
              }
            })
            this.listData = this.listData.concat(res.data.data.list)
            this.setStateManage()
          }
          this.totalCount = res.data.data.totalCount
          this.managerCustomerParams.pageNo++
          this.loading = false
        } else {
          this.Toast(res.data.info)
          this.totalCount = 0
          this.listData = {}
        }
        this.Indicator.close()
      })
    },
    loadMore () {
      this.managerCustomer(this.managerCustomerParams.customerState, this.managerCustomerParams.pageNo, this.currentMenberId)
      if (this.selectAll === '取消全选') {
        this.selectAll = '全选当前'
        this.userAllAllot = 'toggerunselect'
      }
      if (this.checkFlag === 1) {
        this.checkFlag = 0
      }
      this.loading = true
    },
    managerMember (customerState) {
      this.manager.customerState = customerState
      this.salesUserName = this.salesUserName === '' ? '全部' : this.salesUserName
      this.$axios.get(this.acApi + '/manager-customer/v2/users', { params: this.manager }).then((res) => {
        if (res.data.status === 'success') {
          this.outOrganization = res.data.data.outOrganization
          this.inOrganization = res.data.data.inOrganization
          this.examineOrganization = res.data.data.examineOrganization
          this.examineOrganization = res.data.data.examineOrganization
          this.unAppointCustomerCount = res.data.data.unAppointCustomerCount
        } else {
          this.Toast(res.data.info)
          this.outOrganization = []
          this.inOrganization = []
          this.examineOrganization = []
          this.unAppointCustomerCount = 0
        }
      })
    },
    goDetail (id) {
      // console.log(id)
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebKehu + '/khDetail/' + id + '/' + this.$route.query.userId + '/' + this.$route.query.propertyId)
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.yincang.postMessage({ 'body': this.acjlWebKehu + '/khDetail/' + id + '/' + this.$route.query.userId + '/' + this.$route.query.propertyId })
      } else { // pc
        this.$router.push('/khDetail/' + id + '/' + this.$route.query.userId + '/' + this.$route.query.propertyId)
      }
    },
    loadTop () {
      this.resetList()
      if (this.$parent.pageType) {
        this.managerCustomerParams.customerState = this.$route.query.type
        this.managerCustomer(this.$parent.pageType, 1, this.currentMenberId)
        this.managerMember(this.$parent.pageType, this.currentMenberId)
      } else {
        this.managerCustomer(this.managerCustomerParams.customerState, 1, this.currentMenberId)
        console.log(this.listData)
        this.managerMember(this.managerCustomerParams.customerState, this.currentMenberId)
      }
      this.$refs.loadmore.onTopLoaded()
    },
    statesManage () {
      this.listData.forEach(element => {
        switch (element.checkPass) {
          case 1:
            element.examineState = '审核中'
            break
          case 2:
            element.examineState = '通过'
            break
          case 3:
            element.examineState = '被驳回'
            break
          case 5:
            element.examineState = '待提交'
            break
        }
        if (element.customerState >= 0 < 2) {
          element.stateManage = false
        } else if (element.customerState === 2 && element.checkPass === 4) {
          element.stateManage = true
          element.examineState = '退定'
        } else if (element.customerState > 2 < 5 && element.checkPass === 4) {
          element.stateManage = true
          element.examineState = '退房'
        } else return false
      })
    },
    // 处理客户状态和审核状态
    setStateManage () {
      this.listData.forEach(element => {
        switch (element.checkPass) {
          case 1:
            element.examineState = '审核中'
            break
          case 2:
            element.examineState = '通过'
            break
          case 3:
            element.examineState = '被驳回'
            break
          case 5:
            element.examineState = '待提交'
            break
        }
        if (element.customerState === 0 || element.customerState === 1) {
          element.stateManage = false
        } else if (element.customerState === 2) {
          element.stateManage = true
          if (element.checkPass === 4) element.examineState = '退定'
        } else if (element.customerState > 2) {
          element.stateManage = true
          if (element.checkPass === 4) element.examineState = '退房'
        } else return false
      })
    },
    // 隐藏已退定/退房客户
    changeHidden () {
      this.selections = this.selections === 'toggerunselect' ? 'toggerselect' : 'toggerunselect'
      this.managerCustomerParams.isShow = this.managerCustomerParams.isShow === 0 ? 1 : 0
      this.manager.isShow = this.manager.isShow === 0 ? 1 : 0
      this.managerCustomer(this.managerCustomerParams.customerState, 1, this.currentMenberId)
      this.managerMember(1)
    },
    showAllotList (num) {
      switch (num) {
        case 0:
          this.resetList()
          break
        case 1:
          this.listData.forEach((item, index) => {
            if (item.isCanTransfer === 1) {
              this.checkBoxList.push(item.id)
            }
          })
      }
      this.showChange = this.showChange === false
      this.showAllot = this.showAllot !== true
      this.toggleShow = this.toggleShow === false
    },
    // 选中所有用户
    selectAllUser () {
      this.userAllAllot = this.userAllAllot === 'toggerunselect' ? 'toggerselect' : 'toggerunselect'
      this.selectAll = this.selectAll === '全选当前' ? '取消全选' : '全选当前'
      this.checkFlag = this.checkFlag === 0 ? 1 : 0
      if (this.listData !== [] && this.userAllAllot === 'toggerunselect') {
        // 取消全选
        this.allotBtnName = '分配客户'
        this.allotUsersBtn = this.allotUsersBtn === 'allot_users_btn' ? 'allot_users_btn allot_users_btn_c' : 'allot_users_btn'
        this.listData.forEach((item, index) => {
          item.isselected = 'toggerunselect users_allot'
        })
        if (this.checkFlag === 0) { this.userCheckList = [] }
      } else {
        // 全选
        this.allotBtnName = '转移客户'
        this.allotUsersBtn = 'allot_users_btn allot_users_btn_c'
        this.listData.forEach((item, index) => {
          item.isselected = 'toggerselect users_allot'
        })
        if (this.managerCustomerParams.pageNo === 1) {
          this.userCheckList = this.checkBoxList
        } else {
          this.userCheckList = this.userCheckList.concat(this.checkBoxList)
        }
        this.loading = true
      }
    },
    // 选中当前被分配的用户
    addAllotUser (userId) {
      let id = 0
      this.listData.forEach((item, index) => {
        if (item.id === userId) {
          id = index
        }
      })
      if (this.checkBoxList.indexOf(userId) === -1) {
        this.listData[id].isselected = 'toggerunselect'
      }
      if (this.listData[id].isselected.indexOf('toggerunselect') === -1) {
        // 取消
        let checkId = this.userCheckList.indexOf(userId)
        this.listData[id].isselected = 'toggerunselect users_allot'
        this.userCheckList.splice(checkId, 1)
      } else {
        this.listData[id].isselected = 'toggerselect users_allot'
        this.userCheckList.push(userId)
      }
      if (this.userCheckList.length !== 0) {
        this.allotBtnName = '转移客户'
        this.allotUsersBtn = 'allot_users_btn allot_users_btn_c'
      } else {
        this.allotBtnName = '分配客户'
        this.allotUsersBtn = 'allot_users_btn'
      }
      console.log(userId)
      console.log(id)
      console.log(this.userCheckList)
      console.log(this.listData)
    },
    // 选中案场,进行分配
    selectUser (id, name) {
      this.confirmationBox = true
      this.checkedUser = name
      this.checkedUserId = id
      this.allotcrew = false
    },
    // 确认分配
    async allotUserSure () {
      let res = await this.$axios.put(this.acApi + '/customer/v1/change-customer', {
        customerIdList: this.userCheckList,
        afterSaleUserId: this.checkedUserId,
        changeUserId: this.$route.query.userId
      })
      if (res.data.code === 200) {
        this.managerCustomer('1', 1, this.currentMenberId)
        this.Toast('转移客户成功！')
      } else {
        this.Toast(res.data.info)
      }
      this.confirmationBox = false
      this.userCheckList = []
      this.userAllAllot = 'toggerunselect'
      this.selections = 'toggerselect'
      this.showChange = true
      this.showAllot = false
      this.toggleShow = true
      this.selectAll = '全选当前'
      this.allotBtnName = '分配客户'
    },
    // 重置分配客户列表的样式及数据
    resetList () {
      this.userAllAllot = 'toggerunselect'
      this.selectAll = '全选当前'
      this.allotBtnName = '分配客户'
      this.allotUsersBtn = 'allot_users_btn'
      this.userCheckList = []
      this.checkBoxList = []
      this.listData.forEach((item, index) => {
        item.isselected = 'toggerunselect users_allot'
      })
    },
    // 去搜索客户
    goToSearch () {
      let { managerCustomerParams: { managerId, propertyId } } = this
      let route = `/sousuoBox?managerId=${managerId}&propertyId=${propertyId}`

      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.open(this.acjlWebKehu + route)
      } else { // pc && IOS
        this.$router.push(route)
      }
    }
  },
  computed: {
    currentUser () {
      return this.currentMenberId === this.salesUserIdList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .list {
    padding-top: 0.1px;
    margin-top: 44px;
  }

  .inline-flex {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    &:nth-child(2n+1) {
      width: 110px;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    img {
      margin-right: 7px;
    }
  }

  .record {
    background: #ffffff;
    padding: 10px 20px;
    margin-bottom: 4px;
    margin-top: 16px;
    color: #FF6A00;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .reset-record {
      width: 91px;
      height: 28px;
      line-height: 26px;
      text-align: center;
      font-weight: normal;
      border-radius: 22px;
      border: 1px solid #0B79EB;
      font-size: 12px;
      color: #0B79EB;
    }
  }

  img {
    vertical-align: middle;
  }

  .list-ul{
    margin-bottom: 48px;
    .users_info {
      width: 100%;
      height: 93px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      padding: 20px 20px;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      line-height: 1;
      margin-bottom: 4px;
      color: #999999;
      position: relative;
      .mainInfo{
        width: 100%;
        height: 100%;
        display: flex;
      }
      img {
        margin-right: 7px;
      }
      .left{
        flex-basis: 235px;
        position: relative;
      }
      .left .name {
        font-weight: bold;
        font-size: 16px;
        color: #333333;
        margin-bottom: 15px;
        .level{
          display: inline-block;
          width:15px;
          height:18px;
          background-image: url('../../../assets/img/client_ic_tag.png');
          background-size: contain;
          text-align: center;
          color: #FF6A00;
          font-size:13px;
          line-height:18px;
          font-weight:600;
          margin-left: 8px;
        }
        .updatetime{
            position: absolute;
            right: 20px;
            font-size:12px;
            font-weight:400;
            color:rgba(153,153,153,1);
        }
      }
      .left .qudao {
        font-size:13px;
        font-weight:400;
        color:rgba(153,153,153,1);
        display: flex;
        .qudaoInfo{
          padding: 4px;
          margin-right: 7px;
          min-width: 36px;
          border:1px solid rgba(221,221,221,1);
          border-radius: 4px;
          display: inline-block;
        }
        .qudaoName{
          max-width: 88px;
        }
        .person-name{
          width: 63px;
        }
      }
      .left .checking {
        font-size: 14px;
        color: #FFBC00;
        display: inline-flex;
        align-items: center;

      }
      .right {
        padding-top: 30px;
        width: 88px;
      }
      .time {
        margin-bottom: 25px;
        position: absolute;
        right: 20px;
        top: 18px;
      }
      img{
        vertical-align: bottom;
      }
    }
  }

  .popup {
    width: 100%;
    .pop-action {
      position: absolute;
      top: 0;
      width: 95%;
      padding-right: 20px;
      font-size: 20px;
      height: 52px;
      font-weight: 600;
      line-height: 52px;
      > div {
        display: flex;
        margin: 0 20px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(221,221,221,1);
      }
    }
  }

  .list-manager {
    width: 100%;
    max-height: 217px;
    margin-top: 52px;
    overflow-y: scroll;
    padding: 0 0 0 20px;
    ul > li {
      padding: 12px 21px 12px 0;
      text-align: center;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dddddd;
    }
    .list-manager-out {
      color: #999999;
    }
  }
  .sousuo {
    margin: 0 20px 0 10px;
  }
  .crew{
    width: 80px;
    line-height: 46px;
    padding: 0 5px;
    color: #0076FF !important;
    box-shadow: -2px 0px 4px 0px rgba(70,129,235,0.1);
  }
  .ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .menber-manager {
    padding: 3px 8px;
    color: #999999;
    font-style: 14px;
    background:rgba(243,243,243,1);
    margin-left: 24px;
  }
  .pop-action{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(221,221,221,1);
  }
  .selectitem{
    font-weight: 600;
    color: #0076FF;
  }
  .checking{
    font-size: 14px;
    margin-left: 10px;
    text-align: right;
    display: block;
    width: 65px;
  }
  .toggerunselect{
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #999999;
    margin: -8px 0 0 20px;
    .icselect{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url('../../../assets/img/client_ic_unselect.png');
      background-size: cover;
      position: relative;
      top: 2px;
    }
  }
  .toggerselect{
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #0076FF;
    margin: -8px 0 0 20px;
    .icselect{
      display: inline-block;
      width: 16px;
      height: 17px;
      background-image: url('../../../assets/img/client_ic_selected.png');
      background-size: cover;
      position: relative;
      top: 2px;
    }
  }

  .users_info_list{
    display: flex;
    width: 100%;
  }

  .users_allot{
    margin: 0;
    min-width: 50px;
    height: 93px;
    .icselect{
      width: 24px;
      height: 24px;
      margin: 35px 0 0 16px;
    }
  }

  .cancel_btn{
    width:54px;
    height:26px;
    background:rgba(0,118,255,1);
    font-size:14px;
    font-weight:400;
    line-height:25px;
    color:rgba(255,255,255,1);
    border: 1px solid transparent;
    border-radius: 3px;
    outline: none;
  }
  .allot_users_btn{
    width: 95px;
    height: 32px;
    line-height: 32px;
    padding: 0;
    background:rgba(221,221,221,1);
    border: 1px solid transparent;
    border-radius:2px;
    outline: none;
    font-size:16px;
    color:rgba(153,153,153,1);
    margin-right: 20px;
  }
  .allot_users_btn_c{
    color: #ffffff;
    background:rgba(0,118,255,1);
  }

  .main_body{
    padding-top: 100px;
  }
  .userlist_footer {
    width: 100%;
    height: 48px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:rgba(243,243,243,1);
    border:1px solid rgba(221,221,221,1);
    div{
      margin: 0 0 0 20px;
    }
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
  //
  .salesName{
    max-width: 65px;
    height: 23px;
    position: absolute;
    line-height: 23px;
    right: 0px;
    bottom: 0px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 4px;
    font-size: 13px;
  }
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
