<template>
  <div class="baobei">
    <mt-header title="草签详情" fixed>
      <div slot="left">
        <mt-button @click="back()"><img src="../../../assets/img/btn_back.png" height="18" width="24"/>
        </mt-button>
      </div>
    </mt-header>
    <main><preSign></preSign></main>
  </div>

</template>

<script>
import preSign from '../../../components/preSign'

export default {
  name: 'preSign-detail',
  components: {
    preSign
  },
  methods: {
    back () {
      if (this.$route.query.from) {
        var u = navigator.userAgent
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
          // 安卓手机
          // eslint-disable-next-line no-undef
          AndroidWebView.backHome()
        } else if (u.indexOf('iPhone') > -1) {
          // 苹果手机
          window.webkit.messageHandlers.xianshi.postMessage('')
        } else {
          this.$router.back()
        }
      } else {
        this.$router.back()
      }
    }

  }
}
</script>

<style scoped lang="scss">
  main{
    -webkit-overflow-scrolling: touch;
    padding-top: 50px;
  }

</style>
