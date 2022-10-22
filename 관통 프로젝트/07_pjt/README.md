# 07 PJT

# DB 설계를 활용한 REST API 설계

## 프로젝트 목표

- DRF(Django Rest Framework)를 활용한 API Server 제작
- Database many to one relationship(1:N)에 대한 이해
- Database many to many relationship(M:N)에 대한 이해

## 1. Model

### 학습한 내용

- 모델 클래스 **Actor**, **Movie**, **Review** 정의하기

#### 예시

- 정의할 모델 클래스의 이름은 Movie이며, 다음과 같은 정보를 저장합니다.

| 필드명       | 데이터 유형  | 역할        |
| ------------ | ------------ | ----------- |
| title        | varchar(100) | 영화 제목   |
| overview     | text         | 줄거리      |
| release_date | datetime     | 개봉일      |
| poster_path  | text         | 포스터 주소 |

- movies 앱의 models.py

```python
from django.db import models

# Create your models here.
class Actor(models.Model):
    name = models.CharField(max_length=100)

class Movie(models.Model):
    actors = models.ManyToManyField(Actor, related_name='movies')
    title = models.CharField(max_length=100)
    overview = models.TextField()
    release_date = models.DateTimeField()
    poster_path = models.TextField()
    

class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
```



### 어려웠던 부분

- 모델 클래스 **Movie**에서 `release_date`필드를 정의 할 때 `DateField()`를 사용하여 `Json` 파일과 형식이 맞지않아 에러가 발생했습니다.

  

### 새로 배운 것

-  `DateField()`와 `DateTimeField()` 필드의 차이를 알게 되었고 `Json` 파일의 형식을 먼저 확인하고 그에 맞게 데이터 유형을 설정해야한다는 것을 배웠습니다.

------

## 2. Url, View

### 학습한 내용

- 제시된 요구 사항에 맞게 url 작성하기
- 제시된 요구 사항에 맞게 movies 앱의 view함수 작성하기

#### 예시

- movies 앱은 다음 역할을 가지는 view 함수를 가집니다.

| View 함수명   | 역할                                                  | 허용 HTTP Method   |
| ------------- | ----------------------------------------------------- | ------------------ |
| actor_list    | 전체 배우 목록 제공                                   | GET                |
| actor_detail  | 단일 배우 정보 제공 (출연 영화 제목 포함)             | GET                |
| ...           | ...                                                   | ...                |
| movie_detail  | 단일 영화 정보 제공 (출연 배우 이름과 리뷰 목록 포함) | GET                |
| ...           | ...                                                   | ...                |
| review_detail | 단일 리뷰 조회 & 수정 & 삭제 (출연 영화 제목 포함)    | GET / PUT / DELETE |

### 느낀점

- url 작성은 제시된 요구 사항을 보며 수월하게 작성할 수 있었습니다.
- view 함수는 이틀 전에도 연습했 던 것과 유사했기 때문에 수월하게 작성할 수 있었습니다.  



## 3. serializers

### 학습한 내용

- `Json` 파일을 활용하여 제시된 이미지와 같게 `serializers` 파일 작성하기
- movies 앱의 serializers 폴더의 movie.py

```python
from rest_framework import serializers
from ..models import Movie, Actor, Review

class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('title', 'overview',)


class MovieSerializer(serializers.ModelSerializer):
    class ActorSerializer(serializers.ModelSerializer):
        class Meta:
            model = Actor
            fields = ('name',)
    
    actors = ActorSerializer(many=True, read_only=True)

    class ReviewSerializer(serializers.ModelSerializer):
        class Meta:
            model = Review
            fields = '__all__'

    review_set = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
```



### 어려웠던 부분

- 데이터 베이스의 N : M관계를 구현하는 것이 어려웠습니다.
- `rest_framework` 를 import하는 것에도 익숙치않아 놓치는 부분이 많았습니다. 
- 클래스 안에 영향받을 클래스를 지정해 주는 것이 생소하여 구현하기 어려웠습니다.



###  새로 배운 것

- `serializers.py` 의 내용이 많으면 `serializers` 폴더 안에 각각의 `.py` 파일을 생성하여 ` serializer` 클래스를 작성할 수 있다는 것을 새롭게 배웠습니다. 
- 두 개이상의 serializers 클래스에 영향을 받을 때는 클래스 안에 클래스를 생성하여 값을 줄 수 있다는것을 알게 되었습니다.



### 느낀점

- N : M관계 구현을 위해 serializers 클래스안에 클래스를 생성하는 것이 낯설어 어려웠으나 교수님과 동기들의 도움으로 구현해 낼 수 있었습니다.
- 오타로 인한 에러가 많이 발생하여 여전히 오탈자에 대한 주의가 필요하다고 느꼈습니다.

