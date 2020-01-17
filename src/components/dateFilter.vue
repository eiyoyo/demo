<template>
  <div>
    <div class='tabsWrap'>
      <div class='tabs'>
        <span @click="tabClick(3)" :class="{'active':tabActive == 3}">本周</span>
        <span @click="tabClick(5)" :class="{'active':tabActive == 5}">本月</span>
        <span @click="tabClick(7)" :class="{'active':tabActive == 7}">本年</span>
        <span @click="tabClick(9)" :class="{'active':tabActive == 9}">自定义</span>
      </div>
    </div>

    <van-popup v-model="dateSelshow" position="bottom" class="datePop">
      <van-tabs color='#0076FF' @click="dateClick" v-model="active">
        <van-tab title="开始时间">
          <van-datetime-picker
            v-model="startTime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :show-toolbar= false
          />
        </van-tab>
        <van-tab title="结束时间">
          <van-datetime-picker
            v-model="endTime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :show-toolbar= false
          />
        </van-tab>
        <van-tab title="确定">
          <van-datetime-picker
            v-model="endTime"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :show-toolbar= false
          />
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Tab, Tabs, DatetimePicker, Toast } from 'vant'

import 'vant/lib/popup/style'
import 'vant/lib/tab/style'
import 'vant/lib/tabs/style'
import 'vant/lib/toast/style'
import 'vant/lib/datetime-picker/style'

export default {
  name: 'date',
  props: ['type'],
  components: {
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [DatetimePicker.name]: DatetimePicker,
    [Toast.name]: Toast
  },
  data () {
    return {
      active: 0,
      tabColor: '#0076FF',
      tabActive: this.type,
      dateSelshow: false, // 日期选择下拉
      startTime: new Date(2019, 0, 1),
      endTime: new Date(),
      minDate: new Date(2014, 0, 1),
      maxDate: new Date(),
      params: {
        startTime: '',
        endTime: ''
      }
    }
  },
  created () {
    if (this.$route.query.startTime && this.$route.query.startTime !== 'null') {
      this.startTime = new Date(decodeURIComponent(this.$route.query.startTime))
      this.endTime = new Date(decodeURIComponent(this.$route.query.endTime))
    }
  },
  methods: {
    dateClick (index, title) {
      if (index === 2) {
        if (this.startTime === 'Invalid Date') {
          Toast('请选择开始时间')
          return
        } else if (this.endTime === 'Invalid Date') {
          Toast('请选择结束时间')
          return
        }
        if (this.endTime >= this.startTime) {
          this.params.startTime = this.formate(this.startTime) + ' 00:00:00'
          this.params.endTime = this.formate(this.endTime) + ' 23:59:59'
          this.tabActive = 9
          this.dateSelshow = false
          this.$parent.resetCountType(9, this.params)
        } else {
          Toast('结束时间不能小于开始时间')
        }
      }
    },
    formate (data) {
      let oDate = new Date(data)
      let year = oDate.getFullYear()
      let month = oDate.getMonth() + 1
      let date = oDate.getDate()
      let omonth = month.toString().length === 2 ? month : '0' + month.toString()
      let odate = date.toString().length === 2 ? date : '0' + date.toString()
      return year + '-' + omonth + '-' + odate
    },
    tabClick (num) {
      this.active = 0
      if (num !== 9) {
        this.tabActive = num
        this.$parent.resetCountType(num)
      } else {
        this.dateSelshow = true
      }
    }

  }
}
</script>

<style scoped lang="scss">

.van-tabs__nav--card{
  margin: 0 65px;
}
.datePop .van-tabs__wrap{
  width: 64%;
}
.datePop .van-tab{
  background-color: #F3F3F3;
}
.datePop .van-picker__toolbar{
  display: none;
}

/* 折叠面板 */

.infoCollapse .van-cell{
  line-height: 40px;
  font-size: 16px;
  font-family:PingFang-SC-Semibold;
  font-weight:600;
}
.van-cell__right-icon{
  line-height: 40px;
}
.van-collapse-item{
  margin-top: 0.6rem;
}

.tabsWrap{
    height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: center;
  .tabs {
    margin: auto;
    height: 28px;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #dddddd;
    display: inline-flex;
    span {
      width: 54px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size:16px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(221,221,221,1);
      &.active {
        color: #0076FF;
      }
      &:not(:last-child) {
        border-right: 1px solid #dddddd;
      }
    }
  }
}

.okDate{
  width: 36%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 99;
  background: #F3F3F3;
  text-align: right;
  color: #0076FF;
  line-height: 44px;
  padding-right: 20px;
}
</style>
