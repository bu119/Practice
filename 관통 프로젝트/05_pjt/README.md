# 05 PJT

# DB를 활용한 웹 페이지 구현

- 데이터를 생성, 조회, 수정, 삭제할 수 있는 Web application 제작
- Django web framework를 사용한 데이터 처리
- Django Model과 ORM에 대한 이해 
- Django ModelForm을 활용한 사용자 요청 데이터 유효성 검사



## 1. forms.py

#### 학습한 내용

- ModelForm의 widget을 활용한 form구현하기

```python
release_date = forms.DateTimeField(
    widget=forms.DateInput(
        attrs={
            'type': 'date'
        }
    )
)
```

```python
 GENRE_CHOICES = [
        ('comedy','코미디'),
        ('romance','로맨스'), 
        ('drama', '드라마'),
        ('action','액션'),
        ('horror','공포'),
        ('fantasy','판타지'),
        ('thriller','스릴러'),
    ]
    genre = forms.ChoiceField(choices= GENRE_CHOICES)
```

#### 어려웠던 부분

- 각 필드에서 요구하는 내용을 구현하기 어려웠습니다.
- 각 필드의 데이터 유형이 달라서 어떤 폼 필드를 사용해야할 지 선택하는 것이 어려웠습니다.

#### 새로 배운 것들 및 느낀 점

- form에서 release_date를 선택을 생성할 때 DateTimeField를 사용해야한다는 것을 새로 배웠습니다.
- form에서 genre를 선택을 생성할 때  ChoiceField를 사용해야하고 장르 리스트를 만들어 사용해야한다는 것을 깨달았습니다.
- 교수님이 많은 도움을 주셔서 잘 해낼 수 있었습니다.



## 2. Bootstrap 사용

#### 학습한 내용

-  bootstrap을 활용하여 홈페이지 꾸미기
- base.html 에 Bootstrap을 적용하여 모든 템플릿 파일이  Bootstrap을 상속받아 사용하게 만든다.
- Bootstrap의 class를 활용하여 주어진 조건에 맞게 적용시킨다.

```html
{% load bootstrap5 %}

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {% bootstrap_css %}
  <title>Document</title>
</head>
<body>
  <div class="container">
    {% block content %}
    {% endblock content %}
  </div>
  {% bootstrap_javascript %}
</body>
</html>
```

```html
{% extends 'base.html' %}
{% load bootstrap5 %}

{% block content %}
  <h1 class="text-center">DETAIL</h1>
  <hr>
  <div class="d-flex justify-content-center mt-5">
    <div class="card" style="width: 18rem;">
      <img src="{{ movie.poster_url }}" class="card-img-top" alt="exit">
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">Audience : {{ movie.audience }}</p>
        <p class="card-text">Release Dates : {{ movie.release_date }}</p>
        <p class="card-text">Genre : {{ movie.genre }}</p>
        <p class="card-text">Score : {{ movie.score }}</p>
        <p class="card-text">{{ movie.description }}</p>
        <a href="{% url 'movies:update' movie.pk %}" class="btn btn-info" >UPDATE</a>
        <form action="{% url 'movies:delete' movie.pk %}" method="POST" class="d-inline">
          {% csrf_token %}
          {% comment %} <input type="submit" value='DELETE' class="btn btn-danger"> {% endcomment %}
          <button type="submit" class="btn btn-danger">DELETE</button>
        </form>
      </div>
    </div>
  </div>
  <a href="{% url 'movies:index' %}" class="btn btn-warning">BACK</a>  
{% endblock content %}
```

#### 어려웠던 부분

- Bootstrap을 오랜만에 마주하여 거의 잊어버려서 낯설었습니다.
- {% load bootstrap5 %}는 처음 사용하여 장고 Bootstrap을 어떻게 적용해야할지 어려웠습니다.
- 버튼의 색상을 변경하는 것은 Bootstrap 홈페이지를 활용하여 쉽게 해결할 수 있었지만 detail.html을 카드형태로 변경하는 것에 어려움을 느꼈습니다.

#### 새로 배운 것들 및 느낀 점

- 장고에 Bootstrap이 있다는 것을 새롭게 알았습니다.
- 장고에 Bootstrap 사용을 상속시켜도 일반  Bootstrap을 사용하듯이 적용할 수 있다는 것을 알게 되었습니다.
- 교수님의 도움을 통해 수월하게 해결할 수 있었고 점점 기억이 되살아나 Bootstrap을 이해할 수 있었습니다.
- Bootstrap을 적용시킨 홈페이지를 보니 프론트의 중요성을 알 수 있었습니다.