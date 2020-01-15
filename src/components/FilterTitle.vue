<template>
  <div class="filter-title">
    {{title}}
    <p>
      <span v-if="type === 'chart' || type === 'allChart'" :class="{'active':active==='1'}" @click="emit('1')">本周</span>
      <span :class="{'active':active==='2'}" @click="emit('2')">本月</span>
      <span :class="{'active':active==='3'}" @click="emit('3')">本年</span>
      <span v-if="!(type === 'chart' || type === 'allChart')" :class="{'active':active==='6'}"
            @click="emit('6')">全部</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'filter-title',
  props: ['title', 'type'],
  data () {
    return {
      active: '4'
    }
  },
  methods: {
    emit (time) {
      this.active = time
      this.$emit('resetYeji', [time, this.type])
    }
  }
}
</script>

<style scoped lang="scss">
  .filter-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    p {
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 2px;
      span {
        width: 57px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        color: #DDD;
        font-weight: normal;
        &.active {
          color: #0076FF;
        }
        &:not(:last-child) {
          border-right: 1px solid #ddd;
        }
      }
    }
  }
</style>
