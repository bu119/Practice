import requests


def popular_count():
    pass 
    # 1. URL 정보 설정
    # https://api.themoviedb.org/3/movie/popular?api_key=f954b5a3cfb8f0d9431c8d55eff3873c&language=ko&page=1
    BASE_URL = 'https://api.themoviedb.org/3'
    path = '/movie/popular'
    params = {
        'api_key' : 'f954b5a3cfb8f0d9431c8d55eff3873c', 
        'language' : 'ko',
        'region' : 'KR'
         }


    # 2. 요청 응답
    # requests.get('url').json() 
    # response = requests.get('https://api.themoviedb.org/3/movie/popular?api_key=f954b5a3cfb8f0d9431c8d55eff3873c&language=ko&page=1').json()
    response = requests.get( BASE_URL + path, params = params).json()
    results = response.get('results')
    # print(results)
    return len(results)

# 아래의 코드는 수정하지 않습니다.
if __name__ == '__main__':
    """
    popular 영화목록의 개수 반환
    """
    print(popular_count())
    # 20 