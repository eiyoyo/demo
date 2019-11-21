<template>
  <div class="mobile-index">
    <div class="imageWrapper" ref="imageWrapper">
      <img class="headportrait" src="https://kclass.krcedu.com:81/file/3a52bee0440a3013fc640d78cae3c27d" >
      <div class="histogram">
        <histogram :chartData="chartData"></histogram>
      </div>
    </div>
    <img width="100%" :src="dataURL" />
    <button class="button" @click="toImage">开始转换</button>
    <a class="download button" :href="dataURL " :download="dataURL">下载图片</a>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import histogram from './../components/histogram'

export default {
  name: 'mobile',
  components: { histogram },
  data () {
    return {
      chartData: {},
      dataURL: ''
    }
  },
  created () {
    let data = {
      'type3': 'ENTJ',
      'posWeights': {
        '客服': { '客服代表': 0.3390375 },
        '技术': {
          '程序员': 0.52233833,
          '系统软件开发': 0.74652576,
          'IT网络管理': 0.6814058,
          '应用软件开发': 0.6193867
        },
        '行政': {
          '行政管理': 0.2788561,
          '行政助理': 0.30010334
        },
        '管理': {
          '营销管理': 1.0,
          '运营管理': 0.790743,
          '人力资源管理': 0.7294131,
          '财务管理': 0.64878833,
          '销售管理': 0.9385551,
          '公关经理': 0.85528886,
          '行政经理': 0.59101874,
          '运输/仓储管理': 0.62478465,
          '采购管理': 0.7230964
        },
        '工程': {
          '生物/农业工程': 0.4599747,
          '化学工程': 0.57895947,
          '环境工程': 0.46227172,
          '电子工程': 0.54714596,
          '机械工程': 0.4885724
        },
        '财务': {
          '会计': 0.44412538,
          '财务': 0.56873775
        },
        '咨询类': {
          '财务咨询': 0.74353963,
          '管理咨询': 0.8125646
        },
        '设计': {
          '平面设计': 0.59871364,
          '产品设计': 0.73262894
        },
        '产品': {
          '产品文员': 0.21878947,
          '产品装配': 0.35167107,
          '产品维修': 0.5264729
        },
        '市场': {
          '公共关系': 0.68197995,
          '市场咨询': 1.0
        },
        '采购': {
          '采购专员': 0.570116
        },
        '公益': {
          '社工/公益类': 0.5605834
        },
        '销售': {
          '销售顾问': 0.7630642,
          '房产销售': 0.7032273,
          '零售销售': 0.5809119,
          '医药销售': 0.74675554,
          '批发类/制造业销售': 0.81692886,
          '理财销售': 0.9863328,
          '保险销售': 0.84219587
        },
        '人力资源类': {
          '薪酬福利类': 0.5339382,
          '劳动关系类': 0.48489717,
          '培训类': 0.6136442,
          '招聘类': 0.7488228
        }
      },
      'type2': 'ESTP',
      'categoryWeights': {
        '客服': 1.0000375,
        '技术': 0.64241415,
        '行政': 0.28947973,
        '管理': 0.7668542,
        '工程': 0.5073849,
        '财务': 0.5064316,
        '咨询类': 0.7780521,
        '设计': 0.6656713,
        '产品': 1.00004448,
        '市场': 0.0208995,
        '采购': 0.110116,
        '公益': 0.5605834,
        '销售': 0.0000000,
        '人力资源类': 0.5953256
      },
      'oriScore': { 'P': 5, 'S': 3, 'T': 5, 'E': 5, 'F': 2, 'I': 2, 'J': 2, 'N': 4 },
      'type': 'ENTP',
      'weight3': 0.1,
      'weight2': 0.3,
      'weight1': 0.6,
      'status': true
    }
    this.chartData = data
  },
  methods: {
    toImage () {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null, // 解决生成的图片有白边
        useCORS: true
      }).then((canvas) => {
        let dataURL = canvas.toDataURL('image/png')
        this.dataURL = dataURL
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .mobile-index {
    width: 100vw;
    min-height: 100vh;
    padding: 0 12px;
    border-top: 50px solid #171730;
    box-sizing: border-box;
    background-color: #171730;
    .histogram {
      position: relative;
      background-color: #171730;
    }
  }
  .histogram::after {
    content: '(点击柱状图查看详情) ';
    display: block;
    position: absolute;
    top: 2px;
    right: 0;
    text-align: right;
    color: #929299;
    font-size: 14px;
  }
  .button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    user-select: none;
    font-size: 14px;
    border-radius: 20px;
    padding: 12px 23px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .download {
    text-decoration: none;
    margin-left: 10px;
  }
  .imageWrapper {
    background-color: #171730;
    .headportrait {
      width: 50px;
      border-radius: 50%;
    }
  }

</style>
