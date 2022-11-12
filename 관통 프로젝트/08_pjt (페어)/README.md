# 08 PJT - 김부경

# 알고리즘을 적용한 서버 구성

## 목표

- 데이터를 생성 , 조회 , 수정 , 삭제할 수 있는 Web Application 제작
- AJAX 통신과 JSON 구조에 대한 이해
- Database many to one relationship(N:1) 에 대한 이해
- Database many to many relationship(M:N) 에 대한 이해
- 영화 추천 알고리즘 설계



## A. 유저 팔로우 기능

### 학습한 내용

- 팔로우 버튼을 클릭하는 경우 , AJAX 통신을 이용하여 서버에서 JSON 데이터를 받아와 상황에 맞게 HTML 화면을 구성 합니다.

### 어려웠던 부분

- accounts 앱의 profile.html

```html
{% extends 'base.html' %}

{% block content %}
  <h1>{{ person.username }}의 프로필 페이지</h1>

	...

        <form id="follow-form" data-user-id="{{ person.pk }}">
          {% csrf_token %}
          {% if user in followers %}
            <button id="followBtn">언팔로우</button>
          {% else %}
            <button id="followBtn">팔로우</button>
          {% endif %}
        </form>

	...

{% block script %}
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const form = document.querySelector('#follow-form')
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value

    form.addEventListener('submit', function (event) {
      event.preventDefault()
      const userId = event.target.dataset.userId

      axios({
        method: 'post',
        url: `/accounts/${userId}/follow/`,
        headers: {'X-CSRFToken' : csrftoken}
      })
        .then((response) => {
          const isFollowed = response.data.is_followed
          const followBtn = document.querySelector('#follow-form > button')

          if (isFollowed === true) {
            followBtn.innerText = '언팔로우'
          } else {
            followBtn.innerText = '팔로우'
          }

	...
        
  </script>
{% endblock script %}
```

- 기존 코드에서 axios를 적용시키는게 어려웠습니다.
- 버튼을 누르면 팔로우 버튼이 언팔로우 버튼으로 바뀌어야하는데 바뀌지 않아 어려움을 겪었습니다. 
-  `button` 태그를 활용했기때문에  `script`부분에서 `innerText`를 사용해야했는데 `value` 사용하여 버튼 표시가 바뀌지않아 어려움을 겪었습니다.



### 새로 배운 것

-  `button` 태그를 사용할 때는  `script`부분에서 `innerText`를 사용해야한다는 것을 한 번 더 배울 수 있었습니다.



## B. 리뷰 좋아요 기능

### 학습한 내용

- 전체 리뷰 목록 조회 페이지에 좋아요 버튼과 좋아요 개수를 표시합니다. 
- 이미 좋아요 버튼을 누른 경우 좋아요 취소 버튼을 표시합니다.
- 인증된 사용자만 리뷰에 좋아요 할 수 있습니다.
- 좋아요 버튼을 클릭하는 경우, AJAX 통신을 이용하여 서버에서 JSON 데이터를 받아와 상황에 맞게 HTML 화면을 구성합니다.

### 어려웠던 부분

- community 앱의 index.html

```html
{% extends 'base.html' %}

{% block content %}
  <h1>Community</h1>
	
	...

      <p>
        <span id="likeUserNum-{{ review.pk }}">{{ review.like_users.all | length }}</span> 명이 이 글을 좋아합니다.
      </p>

	...

{% endblock %}

{% block script %}
 	
	...
    
	axios({
          method: 'post',
          url: `/community/${reviewId}/like/`,
          headers: {'X-CSRFToken': csrftoken},
        })
          .then((response) => {
            const isLiked = response.data.is_liked
            const likeBtn = document.querySelector(`#like-${reviewId}`)
            const countNum = response.data.countNum
            console.log(response)

            if (isLiked === true) {
              likeBtn.innerText = '좋아요 취소'
            } else {
              likeBtn.innerText = '좋아요'
            }

            const likeUser = document.querySelector(`#likeUserNum-${reviewId}`)
            likeUser.innerText = countNum
	...

{% endblock script %}
```



- community 앱의 index.html

```python
@require_POST
def like(request, review_pk):
    if request.user.is_authenticated:
        review = get_object_or_404(Review, pk=review_pk)
        user = request.user


        if review.like_users.filter(pk=user.pk).exists():
            review.like_users.remove(user)
            is_liked = False

        else:
            review.like_users.add(user)
            is_liked = True
        context = {
            'is_liked': is_liked,
            'countNum': review.like_users.count(), 
        }
        return JsonResponse(context)
    return redirect('accounts:login')
```

- 좋아요 개수를 표시하는 것이 어려웠습니다. 친구들에게 도움을 요청했고 해결할 수 있었습니다.



## C. Movies 앱 기능

1. 전체 영화 목록 조회 (index)
2. 단일 영화 상세 조회 (detail)
3. 영화 추천 기능 (recommended)

### 어려웠던 부분

- 프론트 부분이 오랜만에 다뤄서 조금 어려웠습니다. 

### 느낀점

- 페어와 함께 서로 부족한 부분을 채워가면서 백엔드 부분을 쉽게 구현할 수 있었습니다.

---

## 첫 번째 페어 프로젝트를 마무리하며..

- 서로의 부족한 부분을 채워주며 재밌있게 첫 페어 프로젝트를 마칠 수 있었습니다.
- 구현되지 않는 부분에 대해 서로의 생각대로 코드를 바꿔가며 구현해 낼 수 있었습니다.
- 새로운 알고리즘을 구현하는 것에 많은 시간이 걸렸고 타이머 역할이 있어야겠다는 생각이 들었습니다.
- 프론트 부분에서는 시작하기 전에 디자인을 미리 정해놓지 않아 생각이 통일되지 않았고 구현해 놓은 것을 다시 지우고 새롭게 구현해야하는 것이 힘들었습니다.
- 다음 프로젝트에서는 시작하기 전에 구현할 디자인과 틀을 미리 정해놓고 시작해야겠다는 생각이 들었습니다.
- 혼자 프로젝트를 구현하는 것 보다 페어와 대화하면 서로의 생각을 공유하고 구현에 성공하는 것이 두 배는 더 즐겁고 재미있었습니다.
- 첫 페어 프로젝트여서 부족한 점이 많았지만 함께 프로젝트를 진행하는 방법에 대해 배울 수 있어 좋았습니다.

---

---

---

# Pjt08. - 황지연

여덟 번째 프로젝트는 페어와 함께 하는 프로젝트였다. 이전과 같이 프로젝트 내용은 영화와 관련된 내용이였다. 백엔드 파트 구현은 지금까지 해왔던 거라서 나름 수월하게 할 수 있었던 것 같다.

### BackEnd Part

영화 추천하는 부분에서 영화 평점 순으로 10개의 영화를 나열하려고 하는데 이 부분에서 어려움을 겪었다. 

```python
#view.py
@require_safe
def recommended(request):
    movies = Movie.objects.all()
    top10 = movies.order_by('-vote_average')[:10]
    context = {
        'movies': movies,
        'top10': top10,

    }
    return render(request, 'movies/recommended.html', context)
```

top10이 우리가 사용하고자 하는 영화 목록을 나타낸다. 평점이 높은 순으로 10개의 영화를 나열한 것인데 order_by()를 이용했다. 내림차순으로 정렬을 해야하므로 앞에 마이너스를 붙여주는 작업이 필요했다.



두번째로 어려움을 겪은 부분은 좋아요를 누른 사람의 수를 나타내는 것이였는데 view에서 사람 수를 나타내는 변수를 보내고 template에서 받아서 표현해야했다.

```python
#view.py
@require_POST
def like(request, review_pk):
    if request.user.is_authenticated:
        review = get_object_or_404(Review, pk=review_pk)
        user = request.user


        if review.like_users.filter(pk=user.pk).exists():
            review.like_users.remove(user)
            is_liked = False

        else:
            review.like_users.add(user)
            is_liked = True
        context = {
            'is_liked': is_liked,
            'countNum': review.like_users.count(), 
        }
        return JsonResponse(context)
    return redirect('accounts:login')
```

```html
{% extends 'base.html' %}

{% block content %}
  <h1>Community</h1>
  <hr>
  {% for review in reviews %}
    <p>작성자 : <a href="{% url 'accounts:profile' review.user.username %}">{{ review.user }}</a></p>
    <p>글 번호: {{ review.pk }}</p>
    <p>글 제목: {{ review.title }}</p>
    <p>글 내용: {{ review.content }}</p>
    <div>
      <form class="like-forms" data-review-id="{{ review.pk }}">
        {% csrf_token %}
        {% if user in review.like_users.all %}
          <button class="btn btn-warning" id="like-{{ review.pk }}">좋아요 취소</button>
        {% else %}
          <button class="btn btn-warning" id="like-{{ review.pk }}">좋아요</button>
        {% endif %}
      </form>
      <p>
        <span id="likeUserNum-{{ review.pk }}">{{ review.like_users.all | length }}</span> 명이 이 글을 좋아합니다.
      </p>
    </div>
    <a href="{% url 'community:detail' review.pk %}">[detail]</a>
    <hr>
  {% endfor %}
{% endblock %}

{% block script %}
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>  
  <script>
    const forms = document.querySelectorAll('.like-forms')
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    forms.forEach((form) => {
      form.addEventListener('submit', function (event) {
        event.preventDefault()

        const reviewId = event.target.dataset.reviewId

        axios({
          method: 'post',
          url: `/community/${reviewId}/like/`,
          headers: {'X-CSRFToken': csrftoken},
        })
          .then((response) => {
            const isLiked = response.data.is_liked
            const likeBtn = document.querySelector(`#like-${reviewId}`)
            const countNum = response.data.countNum
            console.log(response)

            if (isLiked === true) {
              likeBtn.innerText = '좋아요 취소'
            } else {
              likeBtn.innerText = '좋아요'
            }

            const likeUser = document.querySelector(`#likeUserNum-${reviewId}`)
            likeUser.innerText = countNum

            console.log(countNum)
          })
          .catch((error) => {
            console.log(error.response)
          })
      })
    })

  </script>
{% endblock script %}
```



### FrontEnd Part

프론트엔드 파트에서는 테마를 찾아서 적용하는게 힘들었다.

프론트엔드 테마 코드가 복잡하고 길다보니 붙여넣었을 때 기존에 작성했던 코드를 이에 적용시키는게 머리가 아팠다...



처음 해보는 페어프로그램이였는데 생각보다 의견충돌도 있고 대화가 많이 필요로 했지만 이에 적응하고 더 많이 소통하면 좋은 결과물을 만들 수 있을 것 같다! 최종 관통 프로젝트에서 완벽하게 만든 결과물을 만들어보자!! 부경언니도 화이팅!!