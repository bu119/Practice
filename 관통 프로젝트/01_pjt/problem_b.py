import json
from pprint import pprint


def movie_info(movie, genres):
    movie_is = movie.get('id')
    detail = {
        'id' : movie_is,
        'title' : movie.get('title'),
        'poster_path' : movie.get('poster_path'),
        'vote_average' : movie.get('vote_average'),
        'overview' : movie.get('overview'),
        'genre_ids' : movie.get('genre_ids'),
    }

    del(detail['genre_ids'])
    name=[]
    for i in movie.get('genre_ids'):
        for genre in genres:
            if i == genre["id"]:
                name.append(genre["name"])
    detail['genre_name'] = name

    return detail

# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movie_json = open('data/movie.json', encoding='UTF8')
    movie = json.load(movie_json)

    genres_json = open('data/genres.json', encoding='UTF8')
    genres_list = json.load(genres_json)

    pprint(movie_info(movie, genres_list))





    