# 8기 FINAL 관통 PJT

# 영화 추천 알고리즘 기반 커뮤니티 서비스

## 1. 프로젝트 목표

- 영화 데이터 기반 추천 서비스 구성
- 영화 추천 알고리즘 구성
- 커뮤니티 서비스 구성
- 서비스 관리 및 유지보수



## 2. 개발 환경

### 1) 필수 개발 환경

- Python 3.9.x
- Django 3.2.x
- Node.js 16.x
- Vue 2



### 2) 사용 아키텍처

- Django REST Framework & Vue



## 3. 필수 요구사항

### 1) 영화 데이터

##### 최소 50개 이상 데이터는 fixtures를 사용하여 언제든 load 될 수 있도록 준비

- **1071** 개의 인기 영화 데이터
- **19** 개의 영화 장르 데이터 



### 2) 영화 추천 알고리즘

##### 추천 방식은 자유롭게 구성하되 해당 서비스를 이용하는 사용자는 반드시 최소 1개 이상의 영화 추천

##### 어떠한 방식으로 추천 시스템을 구현 했는지 기술적으로 설명

- 회원가입시 3순위의 관심 장르 정보를 받아 추천하는 알고리즘 구현
- 각 유저가 영화에 남긴 리뷰 평점을 활용하여 다른 유저가 남긴 평점이 4.5점 이상인 영화를 추천하는 알고리즘 구현
- 유저가 그날의 기분을 선택하면 기분에 맞는 영화를 추천해주는 알고리즘 구현



### 3) API

##### 사용하는 API에는 제한이 없음 (TMDB, Youtube, Naver API 등)

- TBDM API
- Youtube API



### 4) 커뮤니티

##### 유저간 소통 할 수 있는 커뮤니티 기능을 구현 (게시글, 댓글, 좋아요, 팔로우 등)

##### 소통 방식은 자유롭게 구성

- 영화 디테일 페이지에서 리뷰를 통한 소통 기능 구현



### 5) 기타

##### 최소한 5개 이상의 URL 및 페이지를 구성

##### HTTP Method와 HTTP response status code는 상황에 맞게 적절하게 반환되어야 하며, 필요에 따라 적절한 에러 페이지를 구성

##### .gitignore 파일을 사용하여 불필요한 파일 및 폴더는 제출하지 않도록 합니다.

##### 프로젝트명: final-pjt-front, final-pjt-back (두 서버를 모두 사용하는 경우)

---

# FINAL PJT

## 팀원정보 및 업무 분담 내역

### 1. 팀원 정보

- 11조
- 팀장 : 김부경
- 팀원 : 황지연

### 2. 역할 분담

#### Front-end, Back-end 공동 개발

- Server
  - 김부경: Account, Movie(Comment)
  - 황지연: Movie, Account
- Client
  - 공동 개발



## 2. 목표 서비스 구현 및 실제 구현 정도

### 1. 목표

#### 완료

- 추천 알고리즘 구현
  - 회원가입시 3순위의 관심 장르 정보를 받아 영화 추천
- 장르별, 언어별 추천 알고리즘 구현 
- 최신 인기 영화, 최신 개봉 영화, 스테디 셀러 영화 구현
- Axios를 활용한 리뷰 등록, 수정, 삭제 구현
- accounts App - DRF 인증 시스템 구현
- 로그인, 로그아웃, 회원가입 구현

#### 추가 구현

- 각 유저가 영화에 남긴 리뷰 평점을 활용하여 다른 유저가 남긴 평점이 4.5점 이상인 영화 추천
- 기분을 선택받아 기분에 맞는 장르별 영화 추천

#### 미완료

- 개인 영화 리스트
- 정보 수정 페이지
- 영화 검색 기능


---

<img width="776" alt="image" src="https://user-images.githubusercontent.com/109335452/203851263-8d0b8790-9999-4771-bf27-06316fe3397a.png">

<img width="755" alt="detail" src="https://user-images.githubusercontent.com/109335452/203860611-d7304e1f-d71d-4635-89a2-a5a59c573f1c.png">

<img width="728" alt="prfile" src="https://user-images.githubusercontent.com/109335452/203854166-3190845e-d70d-4d76-8c3f-fa535681a4d1.png">

---

## 3. 데이터베이스 모텔링 (ERD)

<img width="837" alt="ERD" src="https://user-images.githubusercontent.com/109335452/203854349-c7ec80c9-6a4c-46bd-bea2-3719e126c4ca.png">

## 4. 영화 추천 알고리즘에 대한 기술적 설명

#### 회원가입 시 유저가 고른 관심 장르에 관련된 영화 추천

- User model custom

```python
# accounts/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser
# from ..movies.models import Genre

# Create your models here.
class User(AbstractUser):
    interested_genre1 = models.CharField(max_length=30, null=True)
    interested_genre2 = models.CharField(max_length=30, null=True)
    interested_genre3 = models.CharField(max_length=30, null=True)
```

- Serialize 작성

```python
# accounts/serializers.py

from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):

    interested_genre1 = serializers.CharField()
    interested_genre2 = serializers.CharField()
    interested_genre3 = serializers.CharField()


    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['interested_genre1'] = self.validated_data.get('interested_genre1','')
        data['interested_genre2'] = self.validated_data.get('interested_genre2','')
        data['interested_genre3'] = self.validated_data.get('interested_genre3','')

        return data
```

- view 함수 작성

```python
# movies/views.py

# 관심장르 영화 추천
@api_view(['GET'])
def interested_recommend(request, username):
    if request.method == 'GET':
        movies = Movie.objects.all().order_by('-released_date', '-popularity')
        User = get_user_model()
        user = get_object_or_404(User, username=username)
        genre1 = user.interested_genre1
        genre2 = user.interested_genre2
        genre3 = user.interested_genre3
        serializer = MovieListSerializer(movies, many=True)
        interested_movies = []
        # 데이터 정제
        for movie in serializer.data:
            for genre in movie['genres']:
                if (genre['name'] == genre1 or genre['name'] == genre2 or genre['name'] == genre3) and movie not in interested_movies:
                    interested_movies.append(movie)
            if len(interested_movies) >= 10:
                break
        return Response(interested_movies)
```

#### 다른 유저가 영화에 남긴 리뷰 평점을 활용하여 4.5점이상으로 평가한 영화 추천

- Comment model 작성

```python
# movies/models.py

from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


class Genre(models.Model):
    name = models.CharField(max_length=50)


class Movie(models.Model):
    poster_path = models.CharField(max_length=200)
    backdrop_path = models.CharField(max_length=200, null=True)
    adult = models.BooleanField(default=False)
    overview = models.TextField()
    released_date = models.DateField()
    original_language = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    popularity = models.FloatField()
    vote_count = models.IntegerField()
    vote_avg = models.FloatField()
    genres = models.ManyToManyField(Genre, related_name='genres')


class Comment(models.Model):
    movie = models.ForeignKey(Movie,on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    score = models.FloatField(default=0, validators=[MinValueValidator(0),MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def username(self):
        return self.user.username

```

- Serialize 작성

```python
# movies/serializers.py

from rest_framework import serializers
from .models import Movie, Genre, Comment


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    moviename = serializers.CharField(source='movie.title', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('movie', 'username', 'moviename')
        extra_kwargs = {'user': { 'required':False }}


class GenreSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Genre
        fields = ('name',)


class MovieListSerializer(serializers.ModelSerializer):
    genres = GenreSerializers(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializers(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
```

- view 함수 작성

```python
# movies/views.py

@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        # comments = Comment.objects.all()
        comments = get_list_or_404(Comment)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def comment_create(request, movie_pk):
    user = request.user
    movie = get_object_or_404(Movie, pk=movie_pk)
    # print(movie.comments.filter(user=user).exists())
    if request.method == "GET":
        comments = movie.comments.all()
        serializer = CommentSerializer(comments, many=True)
        print(serializer)
        return Response(serializer.data)
    elif request.method == "POST":
        if movie.comments.filter(user=user).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = CommentSerializer(data = request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(movie=movie, user=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'DELETE', 'PUT'])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        if comment.user == request.user:
            comment.delete()
            data = {
                'data' : f'{comment_pk}번 리뷰가 삭제되었습니다.'
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
```

- axios를 통한 vue와 데이터 전달



## 5. 서비스 대표 기능에 대한 설명 

### 회원가입 시 유저가 고른 관심 장르에 관련된 영화 추천

#####  1. 관심 장르 고르기

- User는 회원가입시 자신의 관심 장르를 1순위부터 3순위까지 고른다.

##### 2. 데이터 정제하기

- 영화 데이터를 최신순, 인기순으로 정렬하여
- User가 고른 관심 장르 3가지에 해당하는 영화를 가져온다.
- 여러 장르를 가진 영화가 존재하므로 장르 선택시 가져온 영화의 중복 제거 처리가 필요하다.

### 다른 유저가 영화에 남긴 리뷰 평점을 활용하여 4.5점이상으로 평가한 영화 추천

##### 1. 영화 리뷰 기능 만들기

- 각 영화의 디테일 페이지에 영화에 대한 리뷰를 남기는 기능을 포함시킨다.
- 리뷰를 남길 때 별점으로 해당 영화에 User마다 평가 점수를 줄 수 있다.

##### 2. 다른 유저의 리뷰 데이터 정제

- 전체 리뷰 데이터에서 내가 아닌 다른 User가 남긴 리뷰 중,
- 평가 점수가 4.5 이상인 영화를 가져온다.

## 6. 기타 (느낀 점, 후기 등)

#### 김부경

- 프로젝트의 기획, 구현, 개발 과정을 처음부터 끝까지 진행해보면서, 기획과정의 중요성을 깨달을 수 있었습니다. 또한 기획을 잘해놔야 개발 과정이 조금이나마 순조로울 것이라는 생각에 다른 팀 보다 오랜시간 기획을 했지만 이 정도면 괜찮다고 생각하고 시작했음에도 많은 부분을 고쳐나가야했습니다. 기획은 개발하는 내내 수정되었고 처음부터 완벽한 기획은 없다는 것을 느낄 수 있었습니다.
- 또한 기획과정에서 페어와 의견을 주고 받으면서 생각의 차이를 좁혀나가는 것의 중요성을 배울 수 있었습니다. 서로의 의견을 물어보고 이야기하며 생각의 차이를 좁혀나가면서 협업 과정에서 소통하는 법을 배울 수 있었습니다.
- 프로젝트를 진행하면서 익숙하지 않았던 개념과 맞닥뜨리면서 의문점도 많아지고 오류도 많아 지면서 구현 과정에 오랜 시간이 들었지만 그 오류들을 해결해 나가면서 성장함을 느낄 수 있었습니다. 또한 에로사항이 나타날 때, 혼자서 해결하기보다는 도움을 요청하거나 페어와 소통하며 해결하는 것이 자신을 더욱 발전 시킬 수 있는 방법 것을 배웠습니다.
- 최종 관통 프로젝트를 통해 개념적인 부분도 중요하고 코드를 잘 작성하는 것도 중요하지만 가장 중요한 것은  팀워크라는 것을 몸소 느낄 수 있었습니다. 사소한 변화라고 생각되는 모든 것을 팀원과 끊임없이 이야기 해야한다는 것을 배웠습니다.
- 일주일동안 고생한 나의 페어 지연이에게 정말 수고했고 끝까지 함께 해줘서 고맙다고 말하고싶습니다.!!

#### 황지연

- 최종 관통 프로젝트를 통해서 개발이라는 것을 처음부터 끝까지 경험해 볼 수 있어 뜻깊었습니다. 개발자로서의 삶이 어떤 것인지, 어떤 일을 하는 것인지에 대해 조금 알 수 있었습니다.  또한 페어 프로젝트를 진행하면서 협동심이 무엇인지, 싸피에서 중요하게 여기던 소통이라는 것이 얼마나 중요한지에 대해 알게 되었습니다. Git에서 팀원과 함께 코드를 올리고 다운받고 하는 과정에서 'push하는거 알고 있겠지' 라는 안일한 생각으로 인해 몇시간동안 작성하던 코드를 날려버린 사고가 있었습니다. 이 때, 서로 대화하고 상황을 주고 받는 것이 얼마나 중요한 것인지 뼈저리게 느꼈습니다. 또한 한 프로젝트를 두명이서 꾸려나가면서 의견충돌이 빈번하게 일어났습니다. 두 사람이 생각하는 것이 다르다는 것은 당연한 일인데 이를 이해하지 못하고 혼자 마음 상한 적이 많았습니다. 하지만 주변 팀들을 둘러보니 서로 '너는 이거해, 저거해'가 아닌 '이건 어때? 저건?'처럼 물음표로 끝나는 말을 많이 한다는 것을 알게 되었습니다. 팀워크에서 서로 존중과 배려가 기본이라는 것을 또 한번 느낄 수 있었습니다. 초반에는 많이 충돌하고 마음이 힘들었지만 점점 서로 주변 사람들을 보며 소통의 중요성을 깨닫으며 관계가 발전해나가는 저희를 볼 수 있었습니다. 관계가 좋아지니 프로젝트 진행 속도 또한 빨라졌고 때문에 좋은 결과물을 만들 수 있었다 생각합니다. 이번 관통 프로젝트를 통해서 개발의 어려움, 개발의 필요성 등 개발에 대한 깨닫음도 많았지만 팀워크에 대한 이해를 확실하게 인지시켜준 것 같아 좋은 기회였다 생각합니다.