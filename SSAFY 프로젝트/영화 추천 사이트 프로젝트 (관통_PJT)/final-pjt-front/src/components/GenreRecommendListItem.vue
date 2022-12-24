<template>
  <div>
    <h2># 액션</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.Action"
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
    <h2># 애니메이션</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.Animation"
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
    <h2># 호러</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.Horror"
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
    <h2># 로맨스</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.Romance"
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
    <h2># 판타지</h2>
    <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.Fantasy"
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
    <h2># 미스터리</h2>
     <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.Mystery"
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
    <h2># 코미디</h2>
     <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.Comedy"
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
    <h2># SF</h2>
     <swiper ref="filterSwiper" :options="swiperOption" role="tablist">
      <swiper-slide role="tab" class="box">
        <span
          v-for="mov in movie.SF"
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
    <!-- <h2>모험</h2>
    <h2>드라마</h2>
    <h2>가족</h2>
    <h2>역사</h2>
    <h2>음악</h2>
    <h2>스릴러</h2>
    <h2>TV영화</h2>
    <h2>전쟁</h2>
    <h2>서부</h2> -->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'GenreRecommendListItem',
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
  // methods: {
  //   genreCheck(genre) {
  //     let result = false
  //     for (let i=0; i<this.movie.genres.length; i++) {
  //       if (this.movie.genres[i]['name'] === genre) {
  //         result = true
  //       }
  //     }
  //     return result
  //   }
  // }
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