<template>
  <div class="chartdate">
    <div>
      <div id="main">
        <div>
          <canvas id="histogram"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'histogram',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dpr: 1,
      mouseTimer: null,
      mouseClicked: false,
      clickedIndex: -1,
      mousePosition: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    histogram () {
      let { categoryWeights } = this.chartData
      let chartData = []
      for (let i in categoryWeights) {
        chartData.push({
          label: i,
          value: Math.round(categoryWeights[i] * 1000) / 10 + '%'
        })
      }
      return chartData
    }
  },
  methods: {
    // 处理高分屏显示模糊问题
    scaleHandle (canvas, ctx, dpr) {
      // 获取css的宽高
      let { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect()
      // 根据dpr，扩大canvas画布的像素，使1个canvas像素和1个物理像素相等
      canvas.style.width = canvas.width + 'px'
      canvas.style.height = canvas.height + 'px'
      canvas.width = dpr * cssWidth
      canvas.height = dpr * cssHeight
      // 由于画布扩大，canvas的坐标系也跟着扩大，如果按照原先的坐标系绘图内容会缩小
      // 所以需要将绘制比例放大
      ctx.scale(dpr, dpr)
    },
    // 设置相关样式
    setStyleHandle () {
      let m = document.getElementById('main')
      let canvas = document.getElementById('histogram')
      m.parentNode.style = `width:${20 + this.histogram.length * 64}px`
      m.style = 'width: 100%;height: 270px;-webkit-tap-highlight-color: transparent;user-select: none;'
      canvas.width = m.clientWidth
      canvas.height = m.clientHeight
      canvas.parentNode.style = `position: relative;overflow: hidden;width: ${m.clientWidth}px;height: 270px;padding: 0px;margin: 0px;border-width: 0px;cursor: default;`
      canvas.style = `position: absolute;left: 0px;top: 0px;width: ${m.clientWidth}px;height: 270px;user-select: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);padding: 0px;margin: 0px;border-width: 0px;`
    },
    // 绘图
    renderHistogram (ctx, columns = []) {
      // 定义全局变量
      let width = ctx.canvas.width
      let height = parseInt(ctx.canvas.style.height.slice(0, -1))
      // 描绘柱体
      columns.forEach((element, index) => {
        let { label, value } = element
        let labelX = 20 + index * 64 // 底部文字和百分比文字的 X 坐标
        let middleX = 33 + index * 64 // 柱体顶部半圆的圆心的 X 坐标
        let fillRectX = 20 + index * 64
        let fillRectY = 35 + Math.ceil(100 - element.value.slice(0, -1)) * 2
        let color = index % 2 === 0 ? { start: '#273D6D', end: '#477FA0', text: '#C2C1C5' } : { start: '#693756', end: '#744F5A', text: '#C2C1C5' }

        ctx.beginPath()
        ctx.rect(fillRectX, fillRectY + 12, 24, 236 - fillRectY - 12) // 柱体部分
        ctx.arc(fillRectX + 12, fillRectY + 12, 12, Math.PI, Math.PI * 2) // 顶部半圆
        // 绘制高亮
        if (this.mouseClicked && ctx.isPointInPath(this.mousePosition.x, this.mousePosition.y)) {
          let grd = ctx.createLinearGradient(middleX, 237, middleX, fillRectY + 12)
          this.clickedIndex = index
          if (color.start === '#693756') {
            color = { start: '#E56590', end: '#FFDC98', text: '#FFFFFF' }
          } else {
            color = { start: '#5476BF', end: '#C0D2DD', text: '#FFFFFF' }
          }
          grd.addColorStop(0, color.start)
          grd.addColorStop(1, color.end)
          ctx.fillStyle = grd
        } else {
          let grd = ctx.createLinearGradient(middleX, 237, middleX, fillRectY + 12)
          grd.addColorStop(0, color.start)
          grd.addColorStop(1, color.end)
          ctx.fillStyle = grd
        }

        ctx.fill()
        ctx.clearRect(labelX, height - 34, 24, 30) // 当半分比较小，清除漏出来的部分
        ctx.closePath()

        ctx.beginPath()
        ctx.font = "14px 'Microsoft Yahei'"
        ctx.fillStyle = color.text
        ctx.textAlign = 'center'
        ctx.fillText(value, labelX + 14, fillRectY - 6)
        ctx.fillText(label, labelX + 12, 258)
        ctx.closePath()
      })
      // 描绘横坐标轴
      ctx.beginPath()
      ctx.strokeStyle = '#1AB394'
      ctx.lineWidth = 2
      ctx.moveTo(2, height - 33)
      ctx.lineTo(width - 2, height - 33)
      ctx.lineCap = 'round'
      ctx.stroke()
    },
    // 添加点击事件的监听
    canvasEventLisenerHandle (canvas) {
      let ctx = canvas.getContext('2d')
      canvas.addEventListener('click', (e) => {
        e = e || window.event
        if (e.layerX || e.layerX === 0) {
          this.mousePosition.x = e.layerX * this.dpr
          this.mousePosition.y = e.layerY * this.dpr
        } else if (e.offsetX || e.offsetX === 0) {
          this.mousePosition.x = e.offsetX * this.dpr
          this.mousePosition.y = e.offsetY * this.dpr
        }

        clearTimeout(this.mouseTimer)
        this.mouseTimer = setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          this.mouseClicked = true
          this.renderHistogram(ctx, this.histogram)
        }, 10)
      }, false)
    }
  },
  mounted () {
    let histogram = document.getElementById('histogram')
    // 兼容性检测
    if (histogram.getContext) {
      // 初始化样式
      this.setStyleHandle()
      // 绘制
      let ctx = histogram.getContext('2d')
      // 处理不同dpr显示模糊问题
      this.dpr = window.devicePixelRatio // 获取设备dpr
      this.scaleHandle(histogram, ctx, this.dpr)
      // 开始绘制
      this.renderHistogram(ctx, this.histogram)
      // 监听点击事件
      this.canvasEventLisenerHandle(histogram)
    } else {
      alert('你的浏览器不支持 canvas，请升级你的浏览器。')
    }
  }
}
</script>

<style lang="less" scoped>
  .chartdate {
    width: 100%;
    overflow: scroll;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }
</style>
