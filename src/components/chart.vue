<template>
  <div>
    <div id="main" style="width: 100%; height:240px;"></div>
  </div>
</template>

<script>
// 引入基本模板
var echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
// 引入组件
require('echarts/lib/component/legend')
export default {
  name: 'chart',
  data () {
    return {
      dateType: 1, // 1本周，2本月，3本年，4自定义
      chartData: [
        {
          name: '上周',
          data: [32, 22, 11, 24]
        },
        {
          name: '本周',
          data: [5, 20, 40, 10]
        }
      ],
      lineShow: true,
      barShow: false
    }
  },
  methods: {
    drawBar (type, chartData) {
      var seriesArr = []
      var legendData = []
      if (type === 9) {
        seriesArr = [
          {
            name: chartData[0].name,
            type: 'bar',
            barCategoryGap: '65%',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#FF6A00'
                  }
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#FF9C39' },
                    { offset: 0.5, color: '#FF7A63' },
                    { offset: 1, color: '#FF7A63' }
                  ]
                )
              }
            },
            data: chartData[0].data
          }]
        legendData = [chartData[0].name]
      } else {
        seriesArr = [
          {
            name: chartData[0].name,
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#999'
                  }
                },
                color: '#EBEBEB'
              }
            },
            barCategoryGap: '40%',
            barGap: '0',
            data: chartData[0].data
          },
          {
            name: chartData[1].name,
            type: 'bar',
            barGap: '20%',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#FF6A00'
                  }
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#FF9C39' },
                    { offset: 0.5, color: '#FF7A63' },
                    { offset: 1, color: '#FF7A63' }
                  ]
                )
              }
            },
            data: chartData[1].data
          }]
        legendData = [chartData[0].name, chartData[1].name]
      }
      // 基于准备好的dom，初始化echarts实例
      this.lineShow = false
      this.barShow = true
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '本期业绩完成'
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '16%',
          width: '90%'
        },
        legend: {
          right: '5%',
          top: 0,
          bottom: 20,
          data: legendData
        },
        xAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          },
          splitLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          data: ['报备(组)', '来访(组)', '认购(单)', '签约(单)']
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: seriesArr
      }, true)
    },
    drawLine (type, chartData) {
      // 基于准备好的dom，初始化echarts实例
      this.barShow = false
      this.lineShow = true
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      var dateArr = []
      var visitCount = []
      var dealCount = []

      chartData[0].forEach(item => {
        dateArr.push(item.typeTime)
        visitCount.push(item.count)
      })
      chartData[1].forEach(item => {
        dealCount.push(item.count)
      })
      myChart.setOption({
        color: ['#FF7A63', '#2AD7C7'], // 手动设置图例颜色
        legend: {
          top: 6,
          show: true,
          data: ['来访', '成交'],
          textStyle: {
            color: '#999'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 0 // 去掉指示线
            }
          }
        },
        grid: {
          left: '7%',
          right: '7%',
          bottom: '3%',
          top: '18%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: dateArr,
          axisTick: {
            // 坐标轴刻度显示
            show: true,
            lineStyle: {
              color: '#999',
              width: 1 // 这里是坐标轴的宽度,可以去掉
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999',
              width: 1 // 这里是坐标轴的宽度,可以去掉
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999',
              fontSize: '14',
              fontWeight: 'normal'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ddd']
            }
          },
          axisTick: {
            // 坐标轴刻度显示
            show: false,
            lineStyle: {
              color: '#aaa',
              width: 1 // 这里是坐标轴的宽度,可以去掉
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#bbb',
              width: 1 // 这里是坐标轴的宽度,可以去掉
            }
          },
          axisLabel: {
            color: '#999'
          }
        },
        series: [
          {
            name: '来访',
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3, // 折线宽度
                  color: '#FF7A63'
                }
              }
            },
            symbol: 'none', // 让折线图上的小圆点不显示
            smooth: true, // 拐点平滑
            data: visitCount
          },
          {
            name: '成交',
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 3, // 折线宽度
                  color: '#2AD7C7'
                }
              }
            },
            symbol: 'none',
            smooth: true, // 拐点平滑
            data: dealCount
          }
        ]
      }, true)
    }
  }
}
</script>
