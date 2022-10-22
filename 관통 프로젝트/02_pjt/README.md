# 02 PJT

# Python을 활용한 데이터 수집 2

## A. 인기 영화 조회 (problem_a)

- 학습한 내용 
  -  API의 활용하여URL을 받아 get으로 json을 불러옴
  - 인기 영화 목록을 응답 받아 개수를 출력

```python
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
```

- 새로 배운 점 / 느낀 점
  - 교수님과 함께 진행하여 API를  활용해 URL을 불러올 수 있었습니다.



## B. 특정 조건에 맞는 인기 영화 조회 1 (problem_b)

- 학습한 내용 
  -  get으로  불러온 json을  활용
  - 인기 영화 목록 중 평점(vote_average)이 8점 이상인 영화 목록을 반환하는 함수를 작성

```python
def vote_average_movies():
    pass 
    # 여기에 코드를 작성합니다. 

    BASE_URL = 'https://api.themoviedb.org/3'
    path = '/movie/popular'
    params = {
        'api_key' : 'f954b5a3cfb8f0d9431c8d55eff3873c', 
        'language' : 'ko',
        'region' : 'KR'
         }

    response = requests.get( BASE_URL + path, params = params).json()
    results = response.get('results')
    average_movies = []
    for result in results:
      if result['vote_average'] >= 8:
        average_movies.append(result)
    return average_movies
```

- 새로 배운 점 / 느낀 점
  - 앞에서 불러온 json자료로 쉽게 해결할 수있었다.



# C. 특정 조건에 맞는 인기 영화 조회 2 (problem_c)

- 학습한 내용 
  - 데이터 중 평점(vote_average)을 기준으로 평점이 높은 영화 5개의 정보를 리스트로 반환하는 함수 ranking을 작성
  -  sorted 함수 이용

```python
def ranking():
    pass 
    # 여기에 코드를 작성합니다.  
    BASE_URL = 'https://api.themoviedb.org/3'
    path = '/movie/popular'
    params = {
        'api_key' : 'f954b5a3cfb8f0d9431c8d55eff3873c', 
        'language' : 'ko',
        'region' : 'KR'
         }
    response = requests.get( BASE_URL + path, params = params).json()
    results = response.get('results')    # 리스트
    # 리스트 안에 각 딕셔너리의 'vote_average' 값을 뽑아서 내림파순으로 5개 나열.

    ranking = sorted(results, key=lambda results : -results.get('vote_average'))
    return ranking[0:5]


# sorted() 함수 이용 x

    # average_id = []
    # ranking5 = []
    # for result in results:
    #   average_id.append((result.get('vote_average'), result.get("id")))
    
    # sorted_avg = sorted(average_id, reverse=True)

    # for result in results:
    #   for i in range(5):
    #     if result.get('id') == sorted_avg[i][1]:
    #       ranking5.append(result)
    # return ranking5
```

- 어려운 점
  - 딕셔너리의 Value값을 가지고 정렬하는게 어려웠습니다.
  - 처음에는 lambda함수를 사용하지 않고 함수를 만들어 함수의 길이가 길어졌습니다.
  - lambda함수에 대해 동기들에게 물어보았고 실행에 성공해 길이가 훨씬 짧아졌으나 아직 원리를 잘 이해하지 못한 것 같습니다.



- 새로 배운 점 / 느낀 점
  - lambda함수로 딕셔너리의 Value값을 쉽게 정렬할 수 있다는 것을 배웠습니다.



# D. 특정 추천 영화 조회 (problem_d)

- 학습한 내용
  - API를 활용하여 2개의 주소를 사용
  - 제공된 영화 제목(’기생충’, ‘그래비티’, ‘검색할 수 없는 영화’)을 검색하여 추천 영화 목록을 출력

```python
def recommendation(title):
    pass 
    # 여기에 코드를 작성합니다.
    result_id = []
    recommend = []

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
    path2 = f'/movie/{movie_id}/recommendations'
    params2 = {
        'api_key' : 'f954b5a3cfb8f0d9431c8d55eff3873c',
        'language' : 'ko',
        'region' : 'KR', 
    }

    response2 = requests.get(BASE_URL2 + path2, params = params2).json()
    results2 = response2.get('results')

    title_id = []

    for i in results2:
        title_id.append(i.get('title'))


    return title_id
```

- 어려운 점
  - 교수님께 배운대로 주소를 깔끔하게 불러오는 것이 어려워 오랜시간이 걸렸습니다.
  - 깔끔하게 불러오지 못해 긴 주소를 사용하였고 보기가 어려워 문제를 해결하는데 오랜시간이 걸렸습니다.
  - 검색한 영화 정보가 없다면 None을 반환하는 것을 어떻게 만들어 내야할 지도 오랜 시간을 고민하였습니다.



- 새로 배운 점 / 느낀 점
  - API를 활용하여 주소를 변수에 정리하여 깔끔히 불러오는 방법을 배웠습니다.
  - 어려운 문제에 직면하여 오랜 시간이 걸릴 때 동기들의 소중함을 느낄 수 있었습니다.



# E. 출연진, 연출진 데이터 조회 (problem_e)

- 학습한 내용
  - API를 활용하여 2개의 주소를 사용
  - 제공된 영화 제목(’기생충’, ‘검색할 수 없는 영화’)을 검색하여 해당 영화의 출연진(cast) 그리고 스태프(crew) 중 연출진 목록만을 출력

```python
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
```

- 어려운 점
  - Json자료의 형태가 길어 똑바로 파악하지 못했고 문제를 해석하는 데 오랜시간이 소요되었습니다.
  - f스프링으로 다른 주소들을 불러올 때 오류가 발생해 힘들었지만 동기들의 도움으로 오류를 해결할 수 있었습니다.



- 새로 배운 점 / 느낀 점
  - Json자료를 더 주의깊게 보는 계기가 되었습니다.
  - problem_d에서 많은 시간을 소요해 힘들었지만 자료형을 파악하고 나서는 금방 할 수 있었습니다.
  - for문, if문을 만드는 것 보다 API를 활용하여 주소를 불러오고 보기좋게 정리하는 것에 부족함을 많이 느꼈습니다.





