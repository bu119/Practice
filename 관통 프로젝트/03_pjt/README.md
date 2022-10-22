# 03 PJT

# 반응형 웹 페이지 구현

## 01_nav_footer.html

- 학습한 내용
  - Bootstrap을 이용한 Navigation Bar,  Footer 만들기
  - Navigation Bar의 상단 고정, 하이퍼링크, Moda 만들기
  - Footer의 하단 고정, 수직·수평 가운데 정렬하기

```html
<nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <div class="container-fluid">

      <a class="navbar-brand" href="02_home.html">
        <img src="images/logo.png" alt="logo img" height="40">
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="02_home.html">Home</a>
          <a class="nav-link" href="03_community.html">Community</a>
          <!-- link trigger modal -->
          <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#LoginModal">Login</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modal -->
  <div class="modal fade" id="LoginModal" tabindex="-1" aria-labelledby="LoginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">

          <h5 class="modal-title" id="LoginModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

        </div>

        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="email" class="form-label">Username or Email</label>
              <input type="email" id="email" class="form-control">
              <p class="text-secondary fw-light">We'll naver shall your email anyone else.</p>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" class="form-control">
            </div>
            <div>
              <input type="checkbox" id="checkbox" class="form-check-input">
              <label for="checkbox" class="form-check-label">Check me out</label>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Submit</button>
        </div>

      </div>
    </div>
  </div>

  <footer class="d-flex justify-content-center align-items-center fixed-bottom py-3">
    <p class="mb-0">Web-bootstrap PJT, by Kim Bu Gyeong</p>
  </footer>
```

- 어려운 점
  - Bootstrap에 짜여진 코드를 보고 변형하는 것이 어려웠습니다.



- 새로 배운 점 / 느낀 점

  - Bootstrap를 수정하며 원하는 모양을 만들어며 코드를 해석하는 것에 조금 더 익숙해질 수 있었습니다.

  - Bootstrap에는 버튼을 활용한 Modal 연결이 있었고 이를 응용하여  a태그를 활용한 Modal을 새롭게 배울 수 있었습니다.
    - Modal 을 만들면서 label과 input의 연결에 대해서도 다시 한번 이해할 수 있었습니다.
  - justify의 개념에 대해서도 다시 한번 이해할 수 있었습니다.



## 02_home.html

- 학습한 내용
  - Bootstrap을 이용한 Carousel,  Card 만들기

```html
<!-- 02_home.html -->
  <header>
    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <img src="images/header1.jpg" class="d-block w-100" alt="header1_img">
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="images/header2.jpg" class="d-block w-100" alt="header2_img">
        </div>
        <div class="carousel-item">
          <img src="images/header3.jpg" class="d-block w-100" alt="header3_img">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>


  </header>

  <h1 class="text-center">Boxoffice</h1>

  <div>
    <section class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <article class="col">
        <div class="card">
          <img src="images/movie1.jpg" class="card-img-top" alt="movie_img">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </article>

      <article class="col">
        <div class="card">
          <img src="images/movie2.jpg" class="card-img-top" alt="movie_img">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </article>

      <article class="col">
        <div class="card">
          <img src="images/movie3.jpg" class="card-img-top" alt="movie_img">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
      </article>

      <article class="col">
        <div class="card">
          <img src="images/movie4.jpg" class="card-img-top" alt="movie_img">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </article>

      <article class="col">
        <div class="card">
          <img src="images/movie5.jpg" class="card-img-top" alt="movie_img">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </article>

      <article class="col">
        <div class="card">
          <img src="images/movie6.jpg" class="card-img-top" alt="movie_img">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </article>


    </section>
  </div>
```

- 어려운 점
  - Bootstrap grid의 row, col을 이해하는 데 시간이 걸렸습니다.
  - breakpoint의 sm, md, lg등의 개념이 잡혀있지 않아 어려움을 겪었습니다.



- 새로 배운 점 / 느낀 점
  - Bootstrap에서 원하는 것을 가져와 수정하며 일주일 동안 혼란스러웠던 개념이 조금씩 자리잡혀가는 것을 느낄 수 있었습니다.
  - 반응형 웹이 보여주는 이미지를 통해 어렵기만 했던 웹에 흥미를 느낄 수 있었습니다.



## 03_community.html

- 학습한 내용
  - Bootstrap을 이용하여 Viewport의 크기에 따른 요소를 표시

```html
<!-- 03_community.html -->

  <main class="container">
    

    <h1>Community</h1>

    <div class="row row-cols-1 row-cols-lg-2 g-4">

      <!-- Aside - 게시판 목록 -->
      <aside class="col col-lg-2">
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action text-primary">Boxoffice</a>
          <a href="#" class="list-group-item list-group-item-action text-primary">Movies</a>
          <a href="#" class="list-group-item list-group-item-action text-primary">Genres</a>
          <a href="#" class="list-group-item list-group-item-action text-primary">Actors</a>
        </div>

        <div class="d-lg-none">
          <hr>
          <h1>Best Movie Ever</h1>
          <h2>Great Movie Title</h2>
          <p>User</p>
          <p>1 minute ago</p>

          <hr>
          <h1>Movie Test</h1>
          <h2>Great Movie Title</h2>
          <p>User</p>
          <p>1 minute ago</p>

          <hr>
          <h1>Movie Test</h1>
          <h2>Great Movie Title</h2>
          <p>User</p>
          <p>1 minute ago</p>
        </div>

      </aside>

      <!-- Section - 게시판 -->
      <section class="col-lg-10 d-none d-lg-block">
        <div>
          <table class="table table-striped">
            <thead class="table-dark">
              <tr>
                <th scope="col">영화 제목</th>
                <th scope="col">글 제목</th>
                <th scope="col">작성자</th>
                <th scope="col">작성 시간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Great Movies title</th>
                <td>Best Movies Ever</td>
                <td>User</td>
                <td>1 minute ago</td>
              </tr>
              <tr>
                <th scope="row">Great Movies title</th>
                <td>Movie Test</td>
                <td>User</td>
                <td>1 minute ago</td>
              </tr>
              <tr>
                <th scope="row">Great Movies title</th>
                <td>Movie Test</td>
                <td>User</td>
                <td>1 minute ago</td>
              </tr>
              <tr>
                <th scope="row">Great Movies title</th>
                <td>Movie Test</td>
                <td>User</td>
                <td>1 minute ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <article>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </article>
          
        </div>
      </section>
    </div>
  </main>
```

- 어려운 점
  - Viewport의 크기를 기준으로 보이는 너비를 지정하는 것이 어려웠습니다.
    - `row row-cols-1 row-cols-lg-2 g-4` 이런 코드를 짜는 것이 어려웠습니다.



- 새로 배운 점 / 느낀 점
  - Bootstrap를 그리드를 이해하는데 큰 도움이 되었습니다.
  - Bootstrap이 너무 어렵게 느껴졌지만 프로젝트를 진행하면서 많은 개념이 잡힐 수 있어서 좋았습니다.
  - 그리드를 통해 구현되는 웹에 많은 흥미를 느낄 수 있었습니다.