<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'customer',
  pageType: '1',
  watch: {
    '$route': {
      handler (to, _from) {
        if (_from && to.fullPath.indexOf('list') && _from.fullPath.indexOf('khDetail')) {
          this.pageType = _from.params.type
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="scss">
  #app main{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
}
  body {
    margin: 0;
    background: #F3F3F3;
  }

  p {
    margin: 0;
  }

  div, p, span, ul, li {
    box-sizing: border-box;
  }

  ul, menu, dir {
    list-style-type: none;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-padding-start: 0;
  }

  p {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .black.mint-header {
    background: #494C5B;
    line-height: 44px;
    .mint-header-title {
      font-size: 17px;
      font-weight: bold;
      overflow: auto;
    }
    img {
      vertical-align: middle;
    }
  }

  .white.mint-header {
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
    line-height: 44px;
    .mint-header-title {
      font-size: 17px;
      font-weight: bold;
      color: #333;
      overflow: auto;
    }
    img {
      vertical-align: middle;
    }
  }
</style>
