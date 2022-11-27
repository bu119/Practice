<template>
  <swiper-slide role="tab">
    <div id="movie_card">
      <router-link
        :to="{ 
          name: 'DetailView',
          params: { id: movie.id }
        }"  
      >
        <img :src="movieImgURL" alt="..." width=250 style="border-radius: 18px;">
      </router-link>
      <p>{{ movie.title }}</p>
    </div>
  </swiper-slide>
</template>

<script>
import { swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'RecentMovieListItem',
  props: {
    movie: Object,
  },
  computed: {
    movieImgURL() {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.movie.poster_path}`
    }
  },
  components: {
    swiperSlide
  }
}

</script>

<style lang="scss" scoped>
.swiper-slide {
  width: auto; // auto 값을 지정해야 슬라이드의 width값이 텍스트 길이 기준으로 바뀜
  min-width: 56px; // min-width를 지정하지 않을 경우 텍스트가 1개 내지는 2개가 들어갈 때 탭 모양이 상이할 수 있으므로 넣어준다.
  // padding: 0px 1px;
  line-height: 36px;
  // text-align: center;
  // color: #84868c;
  border: 0;
  // border-radius: 18px;
  // background: #f3f4f7;
  appearance: none;
  cursor: pointer;
  margin-left: 1px;
  margin-top: 20px;
}

p {
  padding: 0.327em 0 0 0.05em;
  padding-left: 20px;
  text-align: left;
}
#movie_card:hover {
  transform: scale(1.1, 1.1);
  /* width: 110%; */

}
// .box {
//   margin: 20px;
// }

</style>