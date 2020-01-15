<template>
  <div class="outer">
    <mt-header fixed title="全部评价" class="white">
      <span @click="$router.back()" slot="left">
        <img src="../../../assets/img/btn_back.png" height="18" width="24"/>
      </span>
    </mt-header>
    <main>
    <evaluationAll></evaluationAll>
    </main>
  </div>
</template>
<script>
import evaluationAll from '../../../components/evaluationAll'

export default {
  name: 'evaluation-allbox',
  components: {
    evaluationAll
  }
}
</script>
