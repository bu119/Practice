# 06 PJT

# 사용자 인증 기반 관계형 DB 설계

## 1. Model

### 학습한 내용

- 모델 클래스 **Movie**, **Comment**, **User** 를 정의하기

#### 예시

- 정의할 모델 클래스의 이름은 Comment이며, 다음과 같은 정보를 저장합니다.

| 필드명   | 데이터 유형  | 역할                       |
| -------- | ------------ | -------------------------- |
| content  | varchar(100) | 댓글 내용                  |
| movie_id | integer      | 외래 키(Movie 클래스 참조) |
| user_id  | integer      | 외래 키(Movie 클래스 참조) |

- movies 앱의 models.py

```python
from django.db import models
from django.conf import settings

class Movie(models.Model):
    title = models.CharField(max_length=20)
    description = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class Comment(models.Model):
    content = models.CharField(max_length=100)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


    def __str__(self):
        return self.content
```

### 어려웠던 부분

- 모델 클래스 **Movie**와 **Comment** 의 `id` 를 정의 할 때 **표에 제시 된 필드 명이 스키마에 나타나야하는 필드명임을 인지 하지 못 하고** **처음 클래스 설정 부분에서 id를 붙여 `movie_id `, `user_id` 로 생성**하여 **스키마에 `movie_id_id`, `user_id_id` 로 필드명이 생성**되어 값이 들어가지 못하는 에러가 났습니다.

### 새로 배운 것

- 제시된 요구사항이 처음 클래스 생성부분에서의 필드명이 아닌 데이터베이스 스키마에 대한 내용임을 알게되었습니다. 

---

## 2. URL

### 학습한 내용

- 제시된 요구 사항에 맞게 movies 앱과  accounts 앱의 URL 생성하기

#### 예시

- movies 앱은 다음 URL 요청에 맞는 역할을 가집니다.

| URL 패턴                                         | 역할                                                 |
| :----------------------------------------------- | ---------------------------------------------------- |
| /movies/                                         | 전체 영화 목록 페이지 조회                           |
| /movies/create/                                  | 새로운 영화 생성 페이지 조회 & 단일 영화 데이터 저장 |
| ...                                              | ...                                                  |
| /movies/<movie_pk>/comments/<comment_pk>/delete/ | 단일 댓글 데이터 삭제                                |

- movies 앱의 urls.py

```python
from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('<int:pk>/', views.detail, name='detail'),
    path('<int:pk>/update/', views.update, name='update'),
    path('<int:pk>/delete/', views.delete, name='delete'),
    path('<int:pk>/comments/', views.comments_create, name='comments_create'),
    path('<int:movie_pk>/comments/<int:comment_pk>/delete/', views.comments_delete, name='comments_delete'),

]
```

### 어려웠던 부분

- movies 앱 url을 작성하면서 `<int:movies_pk>` 라는 오타를 생성하였고 **댓글을 삭제하는 과정**에서 **TypeError 에러**가 발생했습니다.

<img width="831" alt="url_movies 에러" src="https://user-images.githubusercontent.com/109335452/195983595-41e511ba-8db1-4ee5-91c1-5492c1ca1eff.png">

### 느낀 점

- 에러 페이지를 읽고 원인을 찾아 수정할 수 있었고 간단한 에러 페이지였지만 에러 페이지를 읽고 문제를 해결하는 것에 조금은 자신감이 생겼습니다.

---

## 3. View

### 학습한 내용

- 제시된 요구 사항에 맞게 movies 앱과 accounts 앱의 view 함수 작성하기

#### 예시

- movies 앱은 다음 역할을 가지는 view 함수를 가집니다.

| View 함수명     | 역할                                                         | 허용 HTTP Method |
| --------------- | ------------------------------------------------------------ | ---------------- |
| index           | 전체 영화 데이터 조회 및 index.html 렌더링                   | GET              |
| create          | create.html 렌더링 유효성 검증 및 영화 데이터 저장 후 detail.html 리다이렉트 | GET & POST       |
| ...             | ...                                                          | ...              |
| comments_delete | 단일 댓글 데이터 삭제 및 detail.html 리다이렉트              | POST             |

- movies 앱의 views.py 의 일부분

```python
@require_safe
def index(request):
    movies = Movie.objects.all()
    context = {
        'movies' : movies,
    }
    return render(request, 'movies/index.html', context)


@require_http_methods(['GET', 'POST'])
def create(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():                     # 유효성 검사
            movie = form.save(commit=False)
            movie.user = request.user
            movie.save()
            return redirect('movies:detail', movie.pk)
    else:
        form = MovieForm()
    context = {
        'form': form,
    }
    return render(request, 'movies/create.html', context)
```

### 어려웠던 부분

- movies 앱의 view함수를 작성하면서 create함수에서 **`commit=False` 를 작성하지 않았고** **IntegrityError 에러**가 발생했습니다.

<img width="889" alt="view_create함수_comit에러" src="https://user-images.githubusercontent.com/109335452/195984412-707bc362-4214-448d-8258-03109d927274.png">

- 에러 해석:  `movies_movie` 테이블에 `user_id` 컬럼에서  NOT NULL 제약조건이 걸렸다.
  - 값이 비었다.
  - 외래키 값이 넘어오지 않는다.

### 새로 배운 것

- `save(commit=False)` 에 대한 개념이 제대로 잡혀있지 않았고 댓글을 생성할 때만 사용한다고 잘 못 이해하고 있었습니다.
- 외래키를 사용할 때는 게시글을 생성할 때도 `save(commit=False)` 를 해야한다는 것을 다시 한번 배울 수 있었습니다.

#### 잘 못 작성된 코드

- movies 앱의 views.py

```python
@require_http_methods(['GET', 'POST'])
def create(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            movie = form.save()			############## 잘 못 작성된 부분 ##############
            return redirect('movies:detail', movie.pk)
```

- 사용자의 입력 데이터는 `request.POST` 에 있는데 `movie_pk` 값을 넣은 적이 없으므로 당연히 비어있다.
-  `movie_pk` 값을 넣으려면 `movie` 인스턴스가 필요하다.
- 유효성 검사 이후 작성해 주면 되는데 저장 하기전에 작성할 틈을 주기위해  `commit=False` 를 작성한다.
  - `save(commit=False)` 는 저장하기전 인스턴스에 추가적으로 넣을 값이나 커스텀할 것들을 위해 저장의 결과물에 대해 미리 인스턴스를 주기위해 사용한다.
  - 데이터베이스에는 저장되지 않은 인스턴스를 반환한다.

#### 수정된 코드

- movies 앱의 views.py

```python
def create(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():                     # 유효성 검사
            movie = form.save(commit=False)
            movie.user = request.user
            movie.save()
            return redirect('movies:detail', movie.pk)
```

### 느낀 점

- 개념이 잘 못 잡혀있어서 혼자 힘으로는 오류를 해결 할 수 없었고 친구들이 모여 함께 오류를 찾으며 문제를 해결할 수 있었습니다.
- 동료들의 소중함을 한번 더 느낄 수 있었습니다.

---

## 4 . Template

### 학습한 내용

- 공유 템플릿 파일
  - A. base.html 
- movies 앱 템플릿 파일
  - B. index.html
  - C. detail.html
  - D. create.html
  - E. update.htm
- accounts 앱 템플릿 파일
  - F. login.html
  - G. signup.html
  - H. update.html
  - I. change_password.html

### 어려웠던 부분

- html 파일을 작성하는 부분에 있어서는 조건을 표현하는 부분들이 익숙하지 않아 어려웠습니다.

```html
{% if request.user == comment.user %}
```



### 느낀 점

- 제시된 이미지가 있었기 때문에 서버를 실행하여 비교하며 작성하였고 제시된 이미지를 참고하며 수정하는 것에 큰 어려움은 없었습니다.

---

## 프로젝트를 마무리하며..

- 이번 프로젝트를 통해 장고에 대해서 점점 더 익숙해지고 있다고 느꼈습니다. 
- 저의 에러와 동료들의 에러를 함께 해결해나가며 에러 페이지와 장고 구조를 이해하는 것에 조금 더 성장했다고을 느낄 수 있었습니다.
- 개념이 제대로 잡혀있지않아 겪은 어려움에 대해서는 동료와 교수님의 도움으로 해결해 나갈 수 있었습니다.
- 동료들에게 고마움을을 느꼈고 동료들의 소중함을 다시 한번 느낄 수 있었습니다.

