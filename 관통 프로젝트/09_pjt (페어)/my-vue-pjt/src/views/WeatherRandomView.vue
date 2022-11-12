<template>
  <div>
    <nav>
      <div id="randomNav"> 
        <router-link :to="{name: 'random'}">Just</router-link> |
        <router-link :to="{name: 'weather'}">Weather</router-link>
      </div>
    </nav>
    <h1>오늘, 당신 마음 속 날씨는 어떤가요?</h1>
    <br>
    <div class="d-flex justify-content-center">
      <select class="form-select d-grid gap-2" style="width: 600px; height: 50px;" aria-label="Default select example">
        <option selected>오늘 기분 어때요 ?</option>
        <option value="1">햇살</option>
        <option value="2">흐림</option>
        <option value="3">비온 뒤 맑음</option>
        <option value="4">천둥번개</option>
        <option value="5">한파주의보</option>
      </select>
    </div>
    <!-- <div class="d-grid gap-2">
      <button @click="@" class="btn btn-primary" type="button">PICK</button>
    </div> -->
    <hr>
    <!-- <div class="col">
      <div class="card h-100" v-if="movie">
        <img :src="randomImgURL" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>{{ movie.title }}</b></h5>
        </div>
      </div>
    </div> -->
    <img src="https://dawkorea.com/cons/cons.gif" alt="서버 점검 중" style="width: 1100px; height: 600px;">
    <h1>서버 점검 중 . . .</h1>
    <p>(이하에 기분에 맞는 영화 추천 예정)</p>
  </div>
</template>

<script>
export default {
  name: 'WeatherRandomView',
}
</script>

<style>

</style>