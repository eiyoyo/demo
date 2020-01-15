<template>

    <i>
        <svg @click="drawColor(1)" v-if='svgName == "chart"' width="22px" height="16px" viewBox="0 0 22 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
            <title>柱状图-未选中</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                <g id="个人业绩" transform="translate(-334.000000, -259.000000)" :stroke="barColor" stroke-width="1.2">
                    <g id="Group-6" transform="translate(334.000000, 259.000000)">
                        <g id="柱状图" transform="translate(3.000000, 1.000000)">
                            <rect id="Rectangle" x="6.4" y="0" width="3.2" height="14"></rect>
                            <rect id="Rectangle" x="0" y="8.61538462" width="3.2" height="5.38461538"></rect>
                            <rect id="Rectangle" x="12.8" y="4.30769231" width="3.2" height="9.69230769"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <svg @click="drawColor(2)" v-if='svgName == "chart"' width="22px" height="16px" viewBox="0 0 22 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
            <title>折线-选中</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                <g id="个人业绩" transform="translate(-297.000000, -259.000000)" fill-rule="nonzero" :stroke="lineColor" stroke-width="1.59836629">
                    <g id="Group-4" transform="translate(297.000000, 259.000000)">
                        <polyline id="折线" points="2 12 7.59748823 6.06051143 12.8840389 11.3809768 20 4"></polyline>
                    </g>
                </g>
            </g>
        </svg>
        <svg v-if='svgName == "down"' width="14px" height="8px" viewBox="0 0 14 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
            <title>client_ic_more_xia</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                <g id="客户详情" transform="translate(-341.000000, -604.000000)" stroke="#999999" stroke-width="1.2">
                    <g id="详情/渠道信息" transform="translate(0.000000, 536.000000)">
                        <g id="渠道信息">
                            <g id="ic_custom_down_export" transform="translate(341.000000, 68.000000)">
                                <g id="heixia" transform="translate(1.000000, 1.000000)">
                                    <polyline id="Path-8" points="0 0 5.92427033 6 12 0"></polyline>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <svg v-if='svgName == "up"' width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
            <title>detail_btn_more_up</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                <g id="个人业绩" transform="translate(-336.000000, -512.000000)" stroke="#999999" stroke-width="1.2">
                    <g id="新增" transform="translate(0.000000, 495.000000)">
                        <g id="detail_btn_more_up_export" transform="translate(336.000000, 17.000000)">
                            <polyline id="detail_btn_more_up" transform="translate(11.000000, 11.000000) scale(1, -1) translate(-11.000000, -11.000000) " points="5 8 10.9242703 14 17 8"></polyline>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <svg v-if='svgName == "right"' width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->
            <title>ic_more</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="首页（完成）" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="审批详情-未审批" transform="translate(-328.000000, -511.000000)" :fill="color" fill-rule="nonzero">
                    <g id="Group-4" transform="translate(0.000000, 405.000000)">
                        <g id="ic_more_export" transform="translate(328.000000, 106.000000)">
                            <g id="ic_more" transform="translate(4.000000, 6.000000) rotate(-90.000000) translate(-4.000000, -6.000000) translate(-2.000000, 2.000000)">
                                <polygon id="Shape" points="10.59 0.59 6 5.17 1.41 0.59 0 2 6 8 12 2"></polygon>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
</i>
</template>
<script>
export default {
  name: 'Icon',
  props: ['svgName', 'color'],
  data () {
    return {
      lineColor: '#333',
      barColor: '#0076FF'
    }
  },
  methods: {
    drawColor (num) {
      this.$parent.chartToggle(num)
      switch (num) {
        case 1:
          this.barColor = '#0076FF'
          this.lineColor = '#333'
          break
        case 2:
          this.lineColor = '#0076FF'
          this.barColor = '#333'
          break
        default:
          break
      }
    }
  }

}
</script>
<style scoped>
    i{
      vertical-align: middle;
    }
</style>
