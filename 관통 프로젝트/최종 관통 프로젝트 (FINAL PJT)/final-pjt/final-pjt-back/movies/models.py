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
