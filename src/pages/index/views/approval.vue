<template>
  <div>
    <mt-header fixed title="审批" class="white">
      <span @click="outLine" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24"/>
      </span>
      <img class="search-btn" src="./../../../assets/img/topbar_btn_search_white@2x.png" alt="搜索" slot="right" @click="$router.push('/searchitem?marketManagerId=' + $route.query.managerId + '&propertyId=' + $route.query.propertyId)" />
    </mt-header>
    <main class="content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" @click="approveTypeA"><span>未审批</span></mt-tab-item>
        <mt-tab-item id="2" @click="approveTypeB"><span>已审批</span></mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore1">
            <ul class="listContent">
              <h4 class="totalHeader">
                <div class="listTotal">总计:{{ listSizeA }}</div>
              </h4>
              <li v-for="(item,index) in listA" @click="goMsg(item)" :key="index">
                <div>
                  <p>
                    <span>{{ item.createUserName }}</span>
                    <span>{{ item.updateTime }}</span>
                  </p>
                </div>
                <div>
                  <p>{{ item.type }}</p>
                  <p><span class="visitIcon visitIcon3"></span>
                  {{ item.propertyName }}&nbsp;
                  {{item.buildingName}}{{(item.unitName === null||item.unitName === '')?'':'-'+item.unitName}}{{(item.houseName === null||item.houseName === '')?'':'-'+item.houseName}}
                  </p>
                </div>
              </li>
            </ul>
          </mt-loadmore>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-loadmore :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore2">
            <ul class="listContent">
              <h4 class="totalHeader">
                <div class="listTotal">总计:{{ listSizeB }}</div>
              </h4>
              <li v-for="(item,index) in listB" :key="index" @click="goMsg(item)">
                <div>
                  <p>
                    <span>{{ item.createUserName }}</span>
                    <span class="approveStatus" :style="{color:item.checkColor}"><icon :svgName='item.svgName'></icon>{{ item.examineState }}</span>
                    <span>{{ item.updateTime }}</span>
                  </p>
                </div>
                <div>
                  <p>{{ item.type }}</p>
                  <p><span class="visitIcon visitIcon3"></span>
                  {{ item.propertyName }}&nbsp;
                  {{item.buildingName}}{{(item.unitName === null||item.unitName === '')?'':'-'+item.unitName}}{{(item.houseName === null||item.houseName === '')?'':'-'+item.houseName}}
                  </p>
                </div>
              </li>
            </ul>
          </mt-loadmore>
        </mt-tab-container-item>
      </mt-tab-container>
    </main>
  </div>
</template>

<script>
import icon from '@/pages/index/views/common/icon'

export default {
  name: 'approval',
  components: {
    icon
  },
  data () {
    return {
      selected: '1',
      userID: null,
      propertyIds: null,
      pageNumA: 1,
      pageNumB: 1,
      pageSize: 10,
      searchStr: '',
      searchShow: false,
      searchDivShowVal: false,
      searchIconShow: true,
      searchVal: '',
      tId: null,

      listAsum: true,
      listBsum: true,
      listSsum: true,

      list: [],
      listSize: 0,

      listA: [],
      listB: [],
      listSizeA: 0,
      listSizeB: 0,
      allLoaded: false,
      topStatus: ''
    }
  },
  created () {
    let { managerId, propertyId, selected } = this.$route.query
    this.userID = managerId
    this.propertyIds = propertyId
    this.selected = selected || '1'

    this.getListA(1)
    this.getListB(1)
  },
  methods: {
    goMsg: function (item) {
      let { type, typeValue = 0, transactionNumber, foreignKey } = item
      let { managerId, propertyId, userName } = this.$route.query
      // 审核类型 1：大定审核／2：草签审核／3：正签审核/4：带看奖审批
      switch (type) {
        case '大定审批':
          typeValue = 1
          break
        case '草签审批':
          typeValue = 2
          break
        case '正签审批':
          typeValue = 3
          break
        case '带看奖审批':
          typeValue = 4
          break
        default:
          break
      }
      this.$router.push(`/approval/approvalMsg/${typeValue}/${transactionNumber}/${foreignKey}/${this.selected}?managerId=${managerId}&propertyId=${propertyId}&userName=${userName}`)
    },
    outLine: function () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.backHome()
      } else if (u.indexOf('iPhone') > -1) {
        // 苹果手机
        if (window.webkit.messageHandlers.backAction) {
          window.webkit.messageHandlers.backAction.postMessage('')
        } else {
          window.webkit.messageHandlers.xianshi.postMessage('')
        }
      } else {
        this.$router.back()
      }
    },
    approveTypeA: function () {
      this.selected = '1'
    },
    approveTypeB: function () {
      this.selected = '2'
    },
    loadBottom: function () {
      // 加载更多数据的操作
      var _this = this
      setTimeout(function () {
        if (_this.selected === '1') {
          _this.pageNumA++
          _this.getListA(_this.pageNumA)
          _this.$refs.loadmore1.onBottomLoaded()
        } else {
          _this.pageNumB++
          _this.getListB(_this.pageNumB)
          _this.$refs.loadmore2.onBottomLoaded()
        }
      }, 400)
    },
    handleTopChange: function (status) {
      this.topStatus = status
    },
    getListA: function (num) {
      this.$axios
        .get(this.acApi + '/manager-homePage/v1/examination', {
          params: {
            managerId: this.userID,
            propertyId: this.propertyIds,
            userName: this.$route.query.submitUserName,
            approvalType: this.$route.query.approvalType,
            type: 1,
            pageNo: num,
            pageSize: this.pageSize
          }
        })
        .then(Response => {
          var _this = this
          var res = Response.data.data
          if (Response.data.code === 200 && Response.data.status === 'success') {
            if (Response.data.data.list.length === 0) {
              // MessageBox('提示', '暂无数据！');
              _this.listSizeA = Response.data.data.totalCount
              _this.listAsum = true
            } else {
              _this.listSizeA = parseInt(Response.data.data.totalCount)
              _this.listAsum = false
              res.list.forEach(item => {
                _this.listA.push(item)
              })
            }

            if (this.listSizeA === this.listA.length) {
              this.allLoaded = true // 若数据已全部获取完毕
            } else {
              this.allLoaded = false
            }
          } else {
            // Toast("数据异常！");
          }
        })
    },
    getListB: function (num) {
      this.$axios
        .get(this.acApi + '/manager-homePage/v1/examination', {
          params: {
            managerId: this.userID,
            propertyId: this.propertyIds,
            userName: this.$route.query.submitUserName,
            approvalType: this.$route.query.approvalType,
            type: 2,
            pageNo: num,
            pageSize: this.pageSize
          }
        })
        .then(Response => {
          var _this = this
          var res = Response.data.data
          if (Response.data.code === 200 && Response.data.status === 'success') {
            if (Response.data.data.list.length === 0) {
              _this.listBsum = true
              _this.listSizeB = Response.data.data.totalCount
            } else {
              _this.listSizeB = parseInt(Response.data.data.totalCount)
              _this.listBsum = false

              res.list.forEach((item, i) => {
                switch (item.checkColor) {
                  case 1:
                    item.checkColor = '#FFBC00'
                    item.svgName = 'audit'
                    break
                  case 2:
                    item.checkColor = '#3FC8A3'
                    item.svgName = 'pass'
                    break
                  case 3:
                    item.checkColor = '#FF5555'
                    item.svgName = 'turndown'
                    break

                  default:
                    item.checkColor = ''
                    item.svgName = ''
                    break
                }

                _this.listB.push(item)
              })
            }
            if (this.listSizeB === this.listB.length) {
              this.allLoaded = true // 若数据已全部获取完毕
            } else {
              this.allLoaded = false
            }
          } else {
            // this.$toast("数据异常！");
          }
        })
    },
    loadTop1 () {
      this.listA = []
      this.getListA(1)
      this.$refs.loadmore1.onTopLoaded()
    },
    loadTop2 () {
      this.listB = []
      this.getListB(1)
      this.$refs.loadmore2.onTopLoaded()
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
    top: 45px;
    /* padding-top: 55px; */
    background: none;
  }
  .mint-header ~ main {
    margin-top: 0;
  }
  .search-btn{
    width: 44px;
    height: 44px;
    margin-right: 20px;
  }
</style>
