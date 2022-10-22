# 04 PJT

- 처음 프로젝트 파일을 생성할 때 마지막에 `.` 을 찍지 않아서 새로운 폴더안에 파일이 생성되어 파일을 지우고 새롭게 처음 부터 만들어 시간이 지체되었습니다. 
- `urls.py`와 `html`, `templates`파일을 생성하고 `view.py` 파일을 이동하며 `Code`를 작성하는 것이 어려웠습니다.
- `error` 메시지를 보는 것이 어려웠고 교수님의 도움을 받아 해결할 수 있었습니다.
- 작성한 파일들의 오타를 찾는 것이 가장 어려웠고 친구들이 많은 도움을 주었습니다.



### CODE

- `view.py` 에서 함수를 return 할 때 `render` 과 `redirect` 에 대한 개념이 바로 잡히지 않아 혼돈하여 `error`를 발생시켰습니다.

  ```python
  return render(request, 'movies/new.html', context)
  
  return redirect('movies:index')
  ```

  - `render` 는 템플릿을 불러오고, 
  - `redirect` 는 URL로 이동한다.
    - URL 로 이동한다는 것은 그 URL 에 맞는 views 가 다시 실행되고 여기서 `render` 를 할지 다시 `redirect` 할지 결정할 것이다. 

  

- `EDIT` 페이지에서 장르의 값을 수정하기전 현재 값을 유지하는 방법이 어려웠다.

  ```python
  def edit(request, pk):
      movie = Movie.objects.get(pk=pk)
      genres = [ '코미디', '로맨틱 코미디', '멜로', '액션', '공포', '전쟁', '공상과학', '판타지']
      context = {
          'movie': movie,
          'genres': genres,
      }
      return render(request, 'movies/edit.html', context)
  ```

  ```html
  <label for="genre">GENRE</label>
  <select id="genre" name="genre">
    {% for genre in  genres %}
      {% if genre == movie.genre %}
        <option value= "{{ genre }}" selected >{{ genre }}</option>
      {% else %}
        <option value= "{{ genre }}" >{{ genre }}</option>
      {% endif %}
    {% endfor %}
  </select><br>
  ```

  - `view.py` 에서 리스트로 장르의 값을 주고 `edit.html` 에서 `for 문`과 `if 문`을 활용하여 값을 유지시킬 수 있었습니다.

