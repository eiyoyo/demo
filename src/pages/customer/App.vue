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
  div, p, span, ul, li {
    box-sizing: border-box;
  }
</style>
