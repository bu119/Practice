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