import requests
from pprint import pprint


def credits(title):
    pass 
    # 여기에 코드를 작성합니다.  
    BASE_URL1 = 'https://api.themoviedb.org/3'
    path1 = '/search/movie'
    params1 = {
        'api_key' : 'f954b5a3cfb8f0d9431c8d55eff3873c',
        'language' : 'ko',
        'region' : 'KR',
        'query' : title, 
    }

    response1 = requests.get(BASE_URL1 + path1, params = params1).json()
    results1 = response1.get('results')
    
    if results1:
        movie_id = results1[0].get('id')
    else:
        return None

    BASE_URL2 = 'https://api.themoviedb.org/3'
    path2 = f'/movie/{movie_id}/credits'
    params2 = {
        'api_key' : 'f954b5a3cfb8f0d9431c8d55eff3873c',
        'language' : 'ko',
        'region' : 'KR', 
    }

    response2 = requests.get(BASE_URL2 + path2, params = params2).json()
    result_case = response2.get('cast')
    result_crew = response2.get('crew')
    cast_name = []
    department_name = []


    for i in result_case:
        if i.get('cast_id') < 10:
            cast_name.append(i.get('name'))
        
    for j in result_crew:
        if j.get('department') == 'Directing':
            department_name.append(j.get('name'))
    
    credits_name = {'cast': cast_name, 'directing' : department_name}

    return credits_name
    
   

# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    """
    제목에 해당하는 영화가 있으면 해당 영화 id를 통해 영화 상세정보를 검색하여 주연배우 목록(cast)과 스태프(crew) 중 연출진 목록을 반환
    영화 id 검색에 실패할 경우 None을 반환
    """
    pprint(credits('기생충'))
    # {'cast': ['Song Kang-ho', 'Lee Sun-kyun', ..., 'Jang Hye-jin'], 'crew': ['Bong Joon-ho', 'Park Hyun-cheol', ..., 'Yoon Young-woo']}
    pprint(credits('검색할 수 없는 영화'))
    # None
