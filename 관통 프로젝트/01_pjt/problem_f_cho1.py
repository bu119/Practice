import json

# 90년대 개봉작 중 많은 수입을 올린 영화 순위

def movies_90(movies):
    title_90 = []
    movies_rank=[]

    for mov in movies:
        m = mov['id']
        movies_ids = open(f'data/movies/{m}.json', encoding='UTF8')
        movies_de = json.load(movies_ids)

        year_90 = int(movies_de.get("release_date")[:4])

        if year_90 >= 1990 or year_90 < 2000:
            title_90.append([movies_de.get("revenue"), movies_de.get("title")]) 
        title_90.sort(reverse=True)

    for move in title_90:
        movies_rank.append(move[1])

    return movies_rank


# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='UTF8')
    movies_list = json.load(movies_json)
    
    print(movies_90(movies_list))