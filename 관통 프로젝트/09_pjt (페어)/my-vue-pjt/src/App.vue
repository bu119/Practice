<template>
  <div id="app">
    <!-- <nav class="navbar bg-light">
      <a class="navbar-brand" href="#">
        <img src="./assets/logo.png" height=50px alt="">
      </a>
      <div>
        <li class="nitem"><router-link to="/">MovieView</router-link></li>
        <li class="nitem"><router-link to="/random">RandomView</router-link></li>
        <li class="nitem"><router-link to="/watch-list">WatchList</router-link></li>
      </div>
    </nav> -->

    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="./assets/logo.png" height=50px alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"><router-link to="/">MovieView</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><router-link to="/random">RandomView</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><router-link to="/watch-list">WatchList</router-link></a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  display: grid;
  grid-template-columns: 600px 1fr;
  text-align: center;
  
}

.nitem{
  display: flex;
  float: left;
  padding: 15px;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.nav-item {
  margin: 10px;
}

/* #navbarNav {
  display: flex;
  justify-content: end;
} */

</style>