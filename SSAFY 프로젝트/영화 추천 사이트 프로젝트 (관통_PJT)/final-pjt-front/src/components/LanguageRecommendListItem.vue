<template>
  <div>
    <h2># 한국</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.ko"
          :key="mov.id">
          <router-link
            :to="{ 
              name: 'DetailView',
              params: { id: mov.id }
            }"  
            >
            <img id="movie_card" :src="movieImgURL+mov.poster_path" alt="..." width=250 style="border-radius: 18px;">
          </router-link>
        </span>
      </swiper-slide>
    </swiper>
    <br>
    <br>
    <br>
    <h2># 중국</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.zh"
          :key="mov.id">
          <router-link
            :to="{ 
              name: 'DetailView',
              params: { id: mov.id }
            }"  
            >
              <img id="movie_card" :src="movieImgURL+mov.poster_path" alt="..." width=250 style="border-radius: 18px;">
            </router-link>
        </span>
      </swiper-slide>
    </swiper>
    <br>
    <br>
    <br>  
    <h2># 일본</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.ja"
          :key="mov.id">
          <router-link
            :to="{ 
              name: 'DetailView',
              params: { id: mov.id }
            }"  
            >
              <img id="movie_card" :src="movieImgURL+mov.poster_path" alt="..." width=250 style="border-radius: 18px;">
            </router-link>
        </span>
      </swiper-slide>
    </swiper>
    <br>
    <br>
    <br>
    <h2># 프랑스</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.fr"
          :key="mov.id">
          <router-link
            :to="{ 
              name: 'DetailView',
              params: { id: mov.id }
            }"  
            >
              <img id="movie_card" :src="movieImgURL+mov.poster_path" alt="..." width=250 style="border-radius: 18px;">
            </router-link>
        </span>
      </swiper-slide>
    </swiper> 
    <br>
    <br>
    <br>
    <h2># 스페인</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.es"
          :key="mov.id">
          <router-link
            :to="{ 
              name: 'DetailView',
              params: { id: mov.id }
            }"  
            >
              <img id="movie_card" :src="movieImgURL+mov.poster_path" alt="..." width=250 style="border-radius: 18px;">
            </router-link>
        </span>
      </swiper-slide>
    </swiper>
    <br>
    <br>
    <br>
    <h2># 영어</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.en"
          :key="mov.id">
          <router-link
            :to="{ 
              name: 'DetailView',
              params: { id: mov.id }
            }"  
            >
              <img id="movie_card" :src="movieImgURL+mov.poster_path" alt="..." width=250 style="border-radius: 18px;">
            </router-link>
        </span>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'LanguageRecommendListItem',
  props: {
    movie: Object,
  },
  components: {
    swiper,
    swiperSlide,
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 17, // swiper-slide 사이의 간격 지정
        slidesOffsetBefore: 0, // slidesOffsetBefore는 첫번째 슬라이드의 시작점에 대한 변경할 때 사용
        slidesOffsetAfter: 0, // slidesOffsetAfter는 마지막 슬라이드 시작점 + 마지막 슬라이드 너비에 해당하는 위치의 변경이 필요할 때 사용
        freeMode: true, // freeMode를 사용시 스크롤하는 느낌으로 구현 가능
        centerInsufficientSlides: true, // 컨텐츠의 수량에 따라 중앙정렬 여부를 결정함
      }
    }
  },
  computed: {
    movieImgURL() {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2`
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: auto; // auto 값을 지정해야 슬라이드의 width값이 텍스트 길이 기준으로 바뀜
  min-width: 56px; // min-width를 지정하지 않을 경우 텍스트가 1개 내지는 2개가 들어갈 때 탭 모양이 상이할 수 있으므로 넣어준다.
  padding: 0px 1px;
  font-size: 14px;
  line-height: 36px;
  // text-align: center;
  // color: #84868c;
  border: 0;
  // border-radius: 18px;
  // background: #f3f4f7;
  appearance: none;
  cursor: pointer;
}
.swiper {
  margin-bottom: 40px;
}

h2 {
  padding-left: 20px;
  text-align: left;
  /* font-size: 24px; */
  line-height: 36px;
  display: block;
  /* font-weight: bold; */
  margin: 0 0 20px;
}
#movie_card:hover {
  transform: scale(1.1, 1.1);
  /* width: 110%; */
}
.box {
  margin: 20px;
}
</style>