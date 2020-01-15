<template>
  <div>
    <mt-header fixed title="全部跟进" class="white">
      <span @click="$router.back()" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24"/>
      </span>
    </mt-header>
    <main>
    <customerFollow></customerFollow>
    </main>
  </div>
</template>
<script>
import customerFollow from '../../../components/customerFollow'
export default {
  name: 'customer-Followbox',
  components: {
    customerFollow
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped lang="scss">

</style>
