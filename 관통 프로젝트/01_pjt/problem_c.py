import json
from pprint import pprint


def movie_info(movies, genres):
    movs=[]
    for mov in movies:
        detail = {
            'id' : mov.get('id'),
            'title' : mov.get('title'),
            'poster_path' : mov.get('poster_path'),
            'vote_average' : mov.get('vote_average'),
            'overview' : mov.get('overview'),
            'genre_ids' : mov.get('genre_ids'),
            }

        del(detail['genre_ids'])
        name=[]
        for i in mov.get('genre_ids'):
            for genre in genres:
                if i == genre["id"]:
                    name.append(genre["name"])
        detail['genre_name'] = name

        movs.append(detail)

    return movs


# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='UTF8')
    movies_list = json.load(movies_json)

    genres_json = open('data/genres.json', encoding='UTF8')
    genres_list = json.load(genres_json)

    pprint(movie_info(movies_list, genres_list))