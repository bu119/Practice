#  Python을 활용한 데이터 수집 1



## 1. problem_a ( 제공되는 영화 데이터의 주요내용 수집 )

- 학습한 내용

  -  제공된 examples/ 폴더의 예시 파일을 먼저 참고.

  - 딕셔너리로 이루어진  movie.json을 활용하여 필요한 자료를 불러옴.

  

```python
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
```



- 새로 배운 점 / 느낀 점

  - 교수님과 함께 진행하여 json을 활용을 이해하는 데 큰 도움이 되었습니다.





## 2. problem_b ( 제공되는 영화 데이터의 주요내용 수정 )

- 학습한 내용

  - movie.json, genres.json을 활용하여 필요한 자료를 불러옴.
  - genre_ids를 장르 번호가 아닌 장르 이름 리스트 genre_names로 수정함.
    - 각 ids를 name으로 바꾸기 위해 genres.json에서 해당 ids를 만족하는 영화 장르 이름 정보를 찾음.

  

```python
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
```



- 어려운 점

  - json에 대해 제대로 이해하지 못한 채  프로젝트를 진행하게 되어 시작이 막막했습니다.
  - 두 가지의 자료를 활용해야 하므로 어떻게 연결해야 할지 설계하는 과정이 필요했습니다.
  - 각 json 자료를 불러오면서 다수의 오류가 발생했고 오류를 이해하고 자료를 불러오는데 많은 시간이 걸렸습니다.
    - json의 자료 형태를 파악하지 못하고 자료를 불러와 오류를 발생시켰습니다.
    - json의 형태에 따라 불러오는 방법이 다름을 인지하지 못했습니다.
  - 함수의 마지막에 return 값을 주지 않아 None이 계속 등장하였고 코드의 잘 못 된 점을 찾는 데 많은 시간이 들었습니다.

  

- 새로 배운 점 / 느낀 점
  
  - 발생한 오류를 읽어보며 오류를 해석하는 데 익숙해지고 잘못된 점을 찾아갈 수 있었습니다.
  - 오류를 해결하며 json 활용법에 대해 더 이해할 수 있었습니다.
  - json의 자료형이 딕셔너리인지 리스트인지부터 파악하는 것이 가장 중요하다고 느꼈습니다.





##  3. problem_c ( 다중 데이터 분석 및 수정 )

- 학습한 내용
  - movies.json, genres.json을 활용
  - 주어진 20개의 영화 데이터에서 필요한 정보만 추출하여 새로운 list를 만듬.
    - list의 append 함수를 활용하여 각 영화의 필요한 정보를 새로운 리스트에 추가함.



```python
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
```



- 어려운 점

  - 새로운 json 자료의 등장으로 어떻게 활용하여 구현해야 할지 설계하는 과정이 어려웠습니다.
  - 출력 과정에서 앞의 단계의 오류를 발견했고 다시 수정해야 하는 어려움을 겪었습니다.

  

- 새로 배운 점 / 느낀 점

  - 앞의 단계에서 많은 오류를 접했기 때문에 설계가 끝난 후 구현 과정은 수월하게 진행할 수 있었습니다.





## 4. problem_d ( 알고리즘을 사용한 데이터 출력 )

- 학습한 내용
  -  movies.json과 movies 폴더 내부의 파일들을 활용하여 폴더 내부의 파일을 불러옴.
  - 영화 세부 정보 중 수입 정보를 이용하여 가장 높은 수익을 낸 영화 제목을 출력함.
    - if 문을 활용하여 가장 높은 수익을 낸 영화를 찾음.



```python
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
```



- 어려운 점
  - movies 폴더 내부의 파일들을 불러오는 방법을 알지 못해 어려움을 느꼈습니다.
  - 다른 주소를 가진 다수의 파일을 어떻게 모두 불러올 수 있을지 설계하는 과정이 어려웠습니다.
  - 최댓값 함수를 쓰지 않고 if 문을 활용하여 값을 비교하면서 최댓값을 만들어 내는 과정 또한 어려움을 느꼈습니다.
  - 가장 높은 수익을 찾는 것에만 집중해 실행 예시처럼 영화의 제목을 출력해야 하는 것을 생각하지 못했고 제목 출력을 설계하는데 많은 시간이 소요되었습니다.



- 새로 배운 점 / 느낀 점

  - 다시 한번 딕셔너리의 get의 편리함에 대해 배울 수 있었습니다.
  - 주소를 통해 폴더 내부의 파일을 불러오는 방법을 알 수 있습니다.
  - 이해한 부분이 맞는지 교수님께 질문하며 한 번 더 되새길 수 있었습니다.





## 5. problem_e ( 알고리즘을 사용한 데이터 출력 )

- 학습한 내용
  - movies.json과 movies 폴더 내부의 파일들을 활용
  - 영화 개봉일 정보를 이용하여 12월에 개 봉한 영화들의 제목 리스트를 출력함.



```python
def dec_movies(movies):

    title_12 = []

    for mov in movies:
        m = mov['id']
        movies_ids = open(f'data/movies/{m}.json', encoding='UTF8')
        movies_de = json.load(movies_ids)

        if int(movies_de.get("release_date")[5:7]) == 12:
            title_12.append(movies_de.get("title")) 

    return title_12
```



- 어려운 점
  
  - movies 폴더 내부 파일들의 "release_date" 값이 문자열로 되어있었지만 
  
    슬라이싱으로 특정 범위의 요소만 가져왔기 때문에 문자임을 인지하지 못하고 숫자 12와 비교하여  
  
    계속 빈 리스트의 값이 출력되었고 원인을 찾는데 시간이 소요되었습니다.



- 새로 배운 점 / 느낀 점

  - 앞의 과정을 통해 비교적 수월하게 구현할 수 있었습니다.
  - 문자열과 숫자형 자료 형태 파악의 중요성을 다시 한번 느낄 수 있었습니다.





## 6. problem_F ( 선택 과제 )

- 학습한 내용

  - 제공된 영화 데이터를 사용하여 내가 원하는 데이터를 추출하고 나만의 데이터 구조를 만듬.
  - movies.json과 movies 폴더 내부의 파일들을 활용
  - 90년대 개봉작 중 많은 수입을 올린 영화 순위대로 list로 출력함.

  

```python
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
```



- 어려운 점

  - 90년대 영화를 찾는 것은 쉬웠으나 영화 순위를 정렬하는 것에 어려움을 느꼈습니다.

  - 실행 예시가 없으니 어떤 식으로 출력되게 구현해야 할지 어려웠습니다.

    - 딕셔너리로 출력해야 할지

      ex)  `{ 1위: '반지의 제왕: 왕의 귀환' , ... }`

    - 리스트로 순서대로 나열해서 출력해야 할지

       ex) ` ['반지의 제왕: 왕의 귀환', '다크 나이트', ... ]`

  - 딕셔너리가 갖고 있는 수익 자료를 가지고 수익 자료는 드러내지 않은 채 제목만 출력해 내는 것이 어려웠습니다.

    - 딕셔너리를 활용하여 sorted 함수를 쓰지 않고 구현해 보려 하였으나 한계에 부딪혔습니다.
    - 쉬운 방법을 찾지 못했고 복잡한 방법을 택하였습니다.




- 새로 배운 점 / 느낀 점

  - 과제를 수행하면서 json을 활용한 자료 수집에는 성장했으나 

    선택 과제를 수행하면서 딕셔너리 활용에 많은 부족함을 느꼈습니다.





### 정리

- json을 활용한 프로젝트가 낯설어 힘들었지만 오류를 분석하며 프로젝트를 단계별로 수행하면서 json 활용에 적응할 수 있었습니다.
- 동료와 의견을 주고받으며 어려운 부분을 이해하는데 큰 도움이 되었고 동료의 중요성을 느낄 수 있었습니다.
- 주어진 문제를 해결하기 위해 생각하고 생각한 것을 구현하기 위해 설계하며 성장할 수 있었습니다. 
- 설계한 내용을 구현하기 위해 노력하면서 스스로의 부족함을 더욱 느낄 수 있었습니다.
- 특히 딕셔너리 활용에 부족함을 많이 느꼈고 함수를 쓰지 않고 구현하는 것에도 많은 어려움을 느꼈습니다.
- 설계한 것을 막힘없이 구현할 수 있도록 더 많은 것을 배우고 싶습니다.
