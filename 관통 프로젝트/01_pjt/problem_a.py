import json
from pprint import pprint

# id, title, poster_path, vote_average, overview, genre_ids 값 추출

def movie_info(movie):
    movie_is = movie.get('id')
    detail = {
        'id' : movie_is,
        'title' : movie.get('title'),
        'poster_path' : movie.get('poster_path'),
        'vote_average' : movie.get('vote_average'),
        'overview' : movie.get('overview'),
        'genre_ids' : movie.get('genre_ids'),
    }

    return detail


# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movie_json = open('data/movie.json', encoding='UTF8')
    movie_dict = json.load(movie_json)     # 딕셔너리
    
    pprint(movie_info(movie_dict))