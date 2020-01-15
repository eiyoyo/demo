<template>
  <div class="pop" v-if="popupVisible" @click.self="closePop">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in img" :key="index">
        <div class="swiper-zoom-container">
          <img :src="imageUrl + item.url">
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div class="swiper-button-close" @click="closePop"></div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'pop-swiper',
  components: {
    swiper,
    swiperSlide
  },
  props: ['img', 'popupVisible', 'index'],
  data () {
    return {
      swiperOption: {
        zoom: {
          minRatio: 1,
          maxRatio: 3
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observer: true,
        observeParents: true,
        autoHeight: true
      }
    }
  },
  methods: {
    closePop () {
      this.$emit('update:popupVisible', false)
    },
    initIndex () {
      this.$nextTick(() => {
        this.$refs.mySwiper.swiper.slideTo(this.index, 1000, false)
      })
    }
  },
  watch: {
    img () {
      this.initIndex()
    }
  }
}
</script>

<style scoped>
  .pop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, .5);
    z-index: 999;
  }

  .pop .swiper-container {
    top: 0;
    left: 0;
    /* transform: translate(-50%, -50%); */
  }

  .swiper-button-close {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: url("./../assets/img/ic_close.png") no-repeat center top;
    background-size: cover;
    z-index: 2002;
  }
</style>
