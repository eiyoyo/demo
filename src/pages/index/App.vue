<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app{
  height:100vh;
}
.content .mint-navbar{
  top:44px;
}
.content .mint-tab-item-label{
  font-size: 14px;
}
.content .mint-navbar .mint-tab-item{
    padding: 0;
    height:40px;

}

.content .mint-tab-item-label span{
    line-height:40px;

}

.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #0076FF;
    color: #0076FF;
    margin-bottom: -3px;
}

</style>
