<template>
  <div>
   <div class="bg-light p-4 text-center " style="float: left; color: black; width: 600px"> 
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">User</th>
            <th scope="col">Title</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(com, idx) in comment"
            :key="idx">
            <th scope="row">{{ idx+1 }}</th>
            <td>{{ com.username }}</td>
            <td><router-link :to="{ name: 'DetailView', params: { id: com.movie } }">{{ com.moviename }}</router-link></td>
            <!-- <td>{{ com.content }}</td> -->
            <td>
              <div id="star">
              <span v-if="com.score === 5">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
              </span>

              <span v-else-if="com.score === 4.5">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
              </span>

              <span v-else-if="com.score === 4">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i>
              </span>

              <span v-else-if="com.score === 3.5">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i>
              </span>

              <span v-else-if="com.score === 3">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
              </span>

              <span v-else-if="com.score === 2.5">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
              </span>

              <span v-else-if="com.score === 2">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
              </span>

              <span v-else-if="com.score === 1.5">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
              </span>

              <span v-else-if="com.score === 1">
                <i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
              </span>

              <span v-else-if="com.score === 0.5">
                <i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
              </span>

              <span v-else>
                <i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
              </span>
              </div>  
            </td>
          </tr>
        </tbody>
      </table>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'OtherUserCommentListItem',
  props: {
    comment: Object
  },
}
</script>

<style>

</style>