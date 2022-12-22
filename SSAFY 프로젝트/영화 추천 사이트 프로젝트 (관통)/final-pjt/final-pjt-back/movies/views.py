from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from datetime import datetime

# permission Decorators
# from rest_framework.decorators import permission_classes
# from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
from .models import Movie, Comment
from .serializers import MovieListSerializer, MovieSerializer, CommentSerializer

# 최신 인기영화 추천
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def recent_popular_movie_list(request):
    if request.method == 'GET':
        timenow = datetime.now().date()
        recent_popular_movies = Movie.objects.all().order_by('-popularity', '-released_date')[:30]
        serializer = MovieListSerializer(recent_popular_movies, many=True)
        
        movies_per_date = {
            'comingsoon': [],
            'presented': [],
        }

        for movie in serializer.data:
            timemovie = datetime.strptime(movie['released_date'], '%Y-%m-%d').date()
            if timemovie > timenow:
                movies_per_date['comingsoon'].append(movie)
            else:
                movies_per_date['presented'].append(movie)

        return Response(movies_per_date)
        

# 최신 영화 추천
@api_view(['GET'])
def recent_movie_list(request):
    timenow = datetime.now().date()
    if request.method == 'GET':
        recent_movies = Movie.objects.all().order_by('-released_date')[:30]
        serializer = MovieListSerializer(recent_movies, many=True)
        movies_per_date = {
            'comingsoon': [],
            'presented': [],
        }

        for movie in serializer.data:
            timemovie = datetime.strptime(movie['released_date'], '%Y-%m-%d').date()
            if timemovie > timenow:
                movies_per_date['comingsoon'].append(movie)
            else:
                movies_per_date['presented'].append(movie)

        return Response(movies_per_date)


# 스테디셀러
@api_view(['GET'])
def steady_seller_movie_list(request):
    if request.method == 'GET':
        steady_seller_movies = Movie.objects.all().order_by('-vote_count')[:30]
        serializer = MovieListSerializer(steady_seller_movies, many=True)
        return Response(serializer.data)

# 장르별 추천
@api_view(['GET'])
def genre_recommend(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieListSerializer(movies, many=True)
        genre_recommend_movies = {
            'Action': [],
            'Animation': [],
            'Comedy': [],
            'Romance': [],
            'Fantasy': [],
            'Horror': [],
            'Mystery': [],
            'SF': []
        }
        # 데이터 정제
        for movie in serializer.data:
            # if movie['genres']:
            for genre in movie['genres']:
                if genre['name'] == 'Science Fiction' and len(genre_recommend_movies['SF']) <= 14:
                    genre_recommend_movies['SF'].append(movie)
                if genre['name'] in genre_recommend_movies.keys() and len(genre_recommend_movies[genre['name']]) <= 14:
                    genre_recommend_movies[genre['name']].append(movie)

        return Response(genre_recommend_movies)

# 언어별 추천
@api_view(['GET'])
def language_recommend(request):
    if request.method == 'GET':
        movies = Movie.objects.all().order_by('-vote_count')
        serializer = MovieListSerializer(movies, many=True)
        language_recommend_movies = {
            'ko': [], #korean
            'zh': [], #chinese
            'ja': [], #japanese
            'fr': [], #french
            'es': [], #spanish
            'en': [], #english
        }
        # 데이터 정제
        for movie in serializer.data:
            if movie['original_language'] in language_recommend_movies.keys() and len(language_recommend_movies[movie['original_language']]) <= 14:
                language_recommend_movies[movie['original_language']].append(movie)

        return Response(language_recommend_movies)

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

# 기분별 영화 추천
@api_view(['GET'])
def feeling_movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all().order_by('-popularity').distinct()
        serializer = MovieListSerializer(movies, many=True)
        feeling_movies = {
            'happy': [],
            'depressive': [],
            'angry': [],
        }
        # 데이터 정제
        for movie in serializer.data:
            for genre in movie['genres']:
                if (genre['name'] == 'Romance' or genre['name'] == 'Family' or genre['name'] == 'Fantasy') and len(feeling_movies['happy']) < 10 and movie not in feeling_movies['happy']:
                    feeling_movies['happy'].append(movie)
                elif (genre['name'] == 'Comedy' or genre['name'] == 'Animation') and len(feeling_movies['depressive']) < 10 and movie not in feeling_movies['depressive']:
                    feeling_movies['depressive'].append(movie)
                elif (genre['name'] == 'Action' or genre['name'] == 'Science Fiction' or genre['name'] == 'War') and len(feeling_movies['angry']) < 10 and movie not in feeling_movies['angry']:
                    feeling_movies['angry'].append(movie)
        
        return Response(feeling_movies)
        
# 상세정보
@api_view(['GET'])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

# 리뷰
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

# @api_view(['POST'])
# def comment_create(request,movie_pk):
#     movie= get_object_or_404(Movie, pk=movie_pk)
#     if movie.comments.filter(user=request.user).exists():
#         return Response(status=status.HTTP_400_BAD_REQUEST)
#     else:
#         serializer = CommentSerializer(data = request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save(user=request.user, movie=movie)

#             comments = movie.comments.all()
#             serializer = CommentSerializer(comments, many=True)
#             return Response(serializer.data , status=status.HTTP_201_CREATED)
    

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