<template>
  <div>
    <!-- <h1>스테디셀러</h1> -->
    <h2>다시 보고 싶어지는 영화</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      
      <SteadySellerListItem
        v-for="movie in steadysellers"
        :key="movie.id"
        :movie="movie"
      />
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper } from 'vue-awesome-swiper'

import SteadySellerListItem from '@/components/SteadySellerListItem'

export default {
  name: 'SteadySellerList',
  components: {
    SteadySellerListItem,
    swiper,
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 12, // swiper-slide 사이의 간격 지정
        slidesOffsetBefore: 0, // slidesOffsetBefore는 첫번째 슬라이드의 시작점에 대한 변경할 때 사용
        slidesOffsetAfter: 0, // slidesOffsetAfter는 마지막 슬라이드 시작점 + 마지막 슬라이드 너비에 해당하는 위치의 변경이 필요할 때 사용
        freeMode: true, // freeMode를 사용시 스크롤하는 느낌으로 구현 가능
        centerInsufficientSlides: true, // 컨텐츠의 수량에 따라 중앙정렬 여부를 결정함
      }
    }
  },
  computed: {
    steadysellers() {
      return this.$store.state.steadysellers
    }
  },
}
</script>

<style scoped>
h2 {
  padding-left: 20px;
  text-align: left;
  /* font-size: 24px; */
  line-height: 36px;
  display: block;
  /* font-weight: bold; */
  /* margin: 0 0 20px; */
}
</style>