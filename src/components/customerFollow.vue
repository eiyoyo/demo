<template>
  <div class="outerBox">
    <ul class="list-ul"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="80"
    >
      <li v-for="(item,index) in listData" :key="index">
          <div class="top">
            <span class="inline-flex">
              <span v-if='item.followRole==1' class='anchangColor'>{{item.followMan}}</span>
              <span v-if='item.followRole==3' class='qudaoColor'>{{item.followMan}}</span>
              <span v-if='item.followRole==2' class='liandongColor'>{{item.followMan}}</span>
              <img v-if='item.followRole==1' src="../assets/img/genjin_ic_an.png">
              <img v-if='item.followRole==2' src="../assets/img/genjin_ic_lian.png">
              <img v-if='item.followRole==3' src="../assets/img/genjin_ic_qu.png">
              </span>
            <span class="time">{{item.followTime}}</span>
          </div>
          <div class="bottom">
            <div class="genjinText">
              <p>{{decodeURIComponent(item.text)}}</p>
              <div class="playSoundBox" v-if='item.recordFile'>
                <span >
                  <img v-if="showPlayImg(index)" @click="pauseSound(item.recordFile,index)" src="../assets/img/genjin_btn_pause@2x.png" width="34" height="35">
                  <img v-if="!showPlayImg(index)" @click="playSound(item.recordFile,index)" src="../assets/img/genjin_btn_play@2x.png" width="34" height="35">
                </span>
                <div class="progressCantainer">
                  <div class="progressTime" :style="{width: 0}"></div>
                </div>
              </div>
            </div>
            <img v-if='item.followType==1' src="../assets/img/genjin_ic_talk.png">
            <img v-if='item.followType==2' src="../assets/img/genjin_ic_wechat.png">
            <img v-if='item.followType==3' src="../assets/img/genjin_ic_phone.png">
            <span v-if='item.followType==4'></span>
          </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'customerFollow',
  data () {
    return {
      loading: false,
      listData: [],
      customerParams: {
        customerId: this.$route.query.customerId,
        pageNo: 1,
        pageSize: 20
      },
      shouldLoad: true,
      audioBox: []
    }
  },
  destroyed: function () {
    this.stopPlaySound()
  },
  methods: {
    customer () {
      this.loading = true
      this.Indicator.open()
      this.$axios.get(this.acApi + '/customer/v1/follow-list', { params: this.customerParams }).then((res) => {
        if (res.data.status === 'success') {
          this.loading = false

          if (this.customerParams.pageNo === 1) {
            this.listData = res.data.data.list
          } else {
            this.listData = this.listData.concat(res.data.data.list)
          }
          if (res.data.data.list.length === 0) {
            this.shouldLoad = false
          }
          this.customerParams.pageNo++
          this.loading = false
          this.Indicator.close()
          let audioBox = []
          this.listData.map(e => {
            audioBox.push({ isplay: false, progress: 0 })
          })
          this.audioBox = audioBox
        }
      })
    },
    loadMore () {
      if (this.shouldLoad) {
        this.customer()
      }
    },
    playSound (sound, index) {
      this.activeSound = index
      for (var i = 0; i < this.audioBox.length; i++) {
        this.audioBox[i]['isplay'] = false
      }
      this.audioBox[index]['isplay'] = true
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.mediaPlayerStart('http://rec.goothy.com:33887' + sound)
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.bofang.postMessage({ 'body': 'http://rec.goothy.com:33887' + sound })
      }
    },
    pauseSound (sound, index) {
      this.audioBox[index]['isplay'] = false
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.mediaPlayerPause()
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.pause.postMessage('')
      }
    },
    stopPlaySound () {
      var u = navigator.userAgent
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { // 安卓手机
        // eslint-disable-next-line no-undef
        AndroidWebView.mediaPlayerStop()
      } else if (u.indexOf('iPhone') > -1) { // 苹果手机
        window.webkit.messageHandlers.stopbofang.postMessage('')
      }
    },
    showPlayImg (index) {
      return this.audioBox[index] && this.audioBox[index]['isplay'] && index === this.activeSound
    }
  },

  created () {
    this.loadMore()
  }
}
</script>
<style scoped lang="scss">
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
    background-color: #fff;
    padding: 21px 20px 1px 20px;
  }
  .list-ul li{
    margin-bottom: 20px;
    .top {
      height: 19px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 19px;
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
    background-color: #F3F3F3;
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 14px 0 14px 12px;
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
</style>
