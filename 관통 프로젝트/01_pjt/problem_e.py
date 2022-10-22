import json


def dec_movies(movies):

    title_12 = []

    for mov in movies:
        m = mov['id']
        movies_ids = open(f'data/movies/{m}.json', encoding='UTF8')
        movies_de = json.load(movies_ids)

        if int(movies_de.get("release_date")[5:7]) == 12:
            title_12.append(movies_de.get("title")) 

    return title_12


# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='UTF8')
    movies_list = json.load(movies_json)
    
    print(dec_movies(movies_list))