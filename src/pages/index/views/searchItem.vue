<template>
  <div class="searching">
    <mt-header title="检索" style="position: fixed;width:100%;z-index:999;" class="m_header">
      <img slot="left" @click="$router.back()" src="./../../../assets/img/topbar_btn_back@2x.png" alt="" width="44" height="44" style="margin-left:10px;">
    </mt-header>
    <section class="search_body">
      <input type="text" placeholder="提交人员(案场/联动)" v-model="submitPersonnel" @focus="fixed()">
      <input type="text" placeholder="关联项目" v-model="relatedProject" @focus="fixed()">
      <div class="condition">
          <div class="input-box" @click="approvalTypeListPopupVisible = true">
            <span class="plaseholder" v-if="!approvalType.length">审批类型</span>
            <span class="current-staff" v-else>{{ approvalType }}</span>
          </div>
        </div>
      <!-- 搜索提示 -->
      <div class="searching-result" v-if="searchRelatedProjectResult.length">
        <div
          class="searching-result-item elliptical"
          v-for="(item,index) in searchRelatedProjectResult"
          :key="index"
          @click="addResult(item)">{{ item.propertyName }}</div>
      </div>
      <div @click="toCustomerDetail" class="search-button" :class="{'change': judgeFlag}">检索</div>
    </section>
    <!-- 审批类型列表 -->
      <mt-popup
        class="popup"
        v-model="approvalTypeListPopupVisible"
        position="bottom"
        >
        <div class="popup_box_houses">
          <!-- 头部 -->
          <div class="pop-action" @touchmove.prevent>
            <div>
              <span @click="memberListPopupVisible = false">
              <img src="../../../assets/img/btn_close.png" height="17" width="16"/>
              </span>
              <span class="select_title">审批类型</span>
            </div>
          </div>
          <!-- 列表 -->
          <div class="select-group-members">
            <ul class="group-members-list">
              <!-- 审批列表 -->
              <li v-for="(item,index) in approvalTypeList" :key="index" @click="setApprovalType(item)">
                <div :class="{'current_staff': approvalType == item}">
                  {{item}}
                </div>
                <div class="img" v-if="approvalType == item">
                  <img src="../../../assets/img/icon_checked.png" height="14" width="18"/>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'searchItem',
  data () {
    return {
      submitPersonnel: '',
      relatedProject: '',
      relatedProjectId: this.$route.query.propertyId,
      searchRelatedProjectResult: [],
      hasBlur: false,
      showNone: false,
      showSearch: true,
      approvalType: '',
      approvalTypeList: ['全部', '大定审批', '草签审批', '正签审批'],
      approvalTypeListPopupVisible: false
    }
  },
  methods: {
    fixed () {
      this.hasBlur = false
      // ios 软键盘弹出时 body的scrollTop 设为0
      if (this.checkIOS()) {
        this.$nextTick(() => {
          window.scroll(0, 0)
        })
      }
    },
    // 检测ios系统
    checkIOS () {
      let u = navigator.userAgent
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      return isIOS
    },
    // 模糊搜索客户
    searchProject () {
      this.$axios.get(this.ldjlApi + '/home/page/property', {
        params: {
          keyword: this.relatedProject
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.searchRelatedProjectResult = res.data.data
        }
      })
    },
    // 点击搜索结果
    addResult (item) {
      this.hasBlur = true
      this.relatedProject = item.propertyName
      this.relatedProjectId = item.propertyId
      this.searchRelatedProjectResult = []
    },
    toCustomerDetail (id) {
      if (this.approvalType === '全部') {
        this.approvalType = ''
      }
      let propertyId = this.relatedProjectId ? `&propertyId=${this.relatedProjectId}&` : ''
      let submitUserName = this.submitPersonnel.trim().length ? `submitUserName=${this.submitPersonnel.trim()}&` : ''
      let approvalType = this.approvalType.trim().length ? `approvalType=${this.approvalType.trim()}` : ''
      this.$router.push('/approval?managerId=' + this.$route.query.marketManagerId + propertyId + submitUserName + approvalType)
    },
    setApprovalType (item) {
      if (item === '全部') {
        this.approvalType = '全部'
        this.approvalTypeListPopupVisible = false
        return
      }
      this.approvalType = item
      this.approvalTypeListPopupVisible = false
    }
  },
  computed: {
    judgeFlag () {
      if (this.submitPersonnel.trim() !== '' || this.relatedProject.trim() !== '' || this.approvalType.trim() !== '') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    relatedProject (newValue, oldValue) {
      if (this.hasBlur) return
      if (this.relatedProject.trim().length) {
        this.searchProject()
      } else {
        this.searchRelatedProjectResult = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .searching {
    background-color: #F3F3F3;
    height: 100vh;
    overflow: hidden;
    .search_body {
      padding: 68px 30px 22px;
      max-width: calc(100% - 45px);
      overflow-y: scroll;
      position: relative;
      height: calc(100vh - 82px);
      .change {
        color:#fff;
        background-color: #2880FE;
      }
    }
    input {
      width: 100%;
      height:40px;
      border-radius:1px;
      border: 1px solid rgba(221,221,221,1) !important;
      border-top: 1px solid rgba(221,221,221,1) !important;
      caret-color: rgba(51,51,51,1);
      -webkit-appearance: none;
      // border: 0;
      text-indent: 8px;
      font-size:16px;
      margin-bottom: 20px;
      outline: none !important;
    }
    .text:nth-child(2) {
      ime-mode:disabled;
    }
    .search-button {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #ccc;
      border-radius: 5px;
      text-align: center;
      margin-top: 30px;
      color: #fff;
      cursor: pointer;
    }
  }
  .searching-result {
    background-color: #fff;
    position: absolute;
    top: 167px;
    left: 30px;
    max-height: 350px;
    width: 85%;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: scroll;
    border: 1px solid #dddddd;
    .searching-result-item {
      line-height: 35px;
      text-indent: 8px;
    }
  }// 分配组员
  .popup {
    width: 100%;
    .pop-action {
      position: absolute;
      width: 100%;
      line-height: 44px;
      top: 0;
      font-weight: 700;
      > div {
        display: flex;
        margin: 0 20px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(244, 243, 244, 1);
        .select_title {
          display: inline-block;
          margin: 0 auto;
          font-size:20px;
          font-weight:600;
          letter-spacing: 2px;
          color:rgba(51,51,51,1);
        }
      }
      > div:first-child {
        height: 52px;
        line-height: 52px;
        img {
          vertical-align: middle;
        }
      }
    }
    .list-manager {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      max-height: 217px;
      margin-top: 52px;
      overflow-y: scroll;
      ul > li {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size:16px;
        color:rgba(51,51,51,1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(221,221,221,1);
      }
      ul > li:last-child {
        border: none;
      }
      .list-manager-out {
        color: #999999;
      }
      .current_staff {
        font-size:16px;
        font-weight:600;
        letter-spacing: 1px;
        font-family:PingFang-SC-Semibold;
        color:rgba(0,118,255,1);
      }
    }
  }
  // 筛选组员弹出框
  .select-group-members {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    max-height: 217px;
    margin-top: 52px;
    height: 100%;
    overflow-y: scroll;
    .group-members-list {
      li {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 16px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
      }
      .current_staff {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 1px;
        font-family: PingFang-SC-Semibold;
        color: #0076ff;
      }
    }
  }
  .condition {
    margin-bottom: 20px;
    background-color: #fff;
    p {
      height:14px;
      font-size:14px;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:14px;
      margin-bottom: 8px;
    }
    .input-box {
      height:40px;
      line-height: 40px;
      box-sizing: border-box;
      padding: 0 30px 0 10px;
      background-color:rgba(250,250,250,1);
      background: url('./../../../assets/img/btn_form_down@2x.png') no-repeat;
      background-size: 10px 6px;
      background-position: 94% 17px;
      border-radius: 1px;
      border:1px solid rgba(221,221,221,1);
      .plaseholder {
        color: #C3C3C3;
      }
      .current-staff {
        color: #333333;
      }
    }
    .change {
      color:#fff;
      background-color: #2880FE;
    }
  }
</style>
