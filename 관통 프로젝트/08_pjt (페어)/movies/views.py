from django.shortcuts import render
from django.views.decorators.http import require_safe

from .models import Movie, Genre


# Create your views here.
@require_safe
def index(request):
    movies = Movie.objects.all()
    context = {
        'movies': movies,
    }
    return render(request, 'movies/index.html', context)
    

@require_safe
def detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    genres = movie.genres.all
    context = {
        'movie': movie,
        'genres': genres,
    }
    return render(request, 'movies/detail.html', context)


@require_safe
def recommended(request):
    movies = Movie.objects.all()
    top10 = movies.order_by('-vote_average')[:10]
    context = {
        'movies': movies,
        'top10': top10,

    }
    return render(request, 'movies/recommended.html', context)

