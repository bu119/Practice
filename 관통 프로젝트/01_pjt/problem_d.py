import json


def max_revenue(movies):
    revenue_max = 0
    title_max = ''

    for mov in movies:
        m = mov['id']
        movies_ids = open(f'data/movies/{m}.json', encoding='UTF8')
        movies_de = json.load(movies_ids)
        
        if revenue_max < movies_de.get("revenue"):
            revenue_max = movies_de.get("revenue")
            title_max = movies_de.get("title")

    return title_max    
        
        
# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    movies_json = open('data/movies.json', encoding='UTF8')
    movies_list = json.load(movies_json)
    
    print(max_revenue(movies_list))
