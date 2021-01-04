## Disease-Drug-Protein Potential Relationship based on Machine Learning Analysis
This Disease-Drug-Protein potential relationship is exported from Word Embedding model with PubMed 10 Years (2010~2019).

[Datatables](https://datatables.net/) 를 사용한 grid 데이터 다루기 예제.


## Progress: 50%
1.1 Generate data to example [v]

1.2 Ttest minimal data [v]

2.1 Generate splited data

2.1 Generate splited data

2.2 Apply reload action with splited data



## [example site](https://kimyoungjin06.github.io/ddppr/)

## log

## 20201117
현재 질병-약에 대한 상위 100개 테이블에 대해 예제로 구현을 지난 주말에 구현을 완료했습니다.
향후 약-유전자에 대한 table을 시각화하는 테이블을 위아래로 배치할 예정입니다.
가로로 배치하는게 가독성이 더 떨어질 것 같기도 하고 수정이 더 많이 필요하긴 한데 이부분은 더 중요한 부분들을 구현한 이후 시간이 남을 경우 추가적으로 진행해보도록 하겠습니다!

1. Library: Datatables
사용한 라이브러리는 Datatables라는 라이브러리입니다.
이름 그대로 데이터 그리드를 다루는 라이브러리로, 검색,  필터링, 정렬 기능이 매우 잘 되어있는 라이브러리입니다. 일정 크기 미만에서는 (10만건 이하) 서버사이드로 구현할 필요도 없고 저희의 경우에 가장 적합해서 이 라이브러리를 사용했습니다.

1. Data: 4775*100 + 8591*100 rows (~150M)
질병 4775개, 약 8591개에 대해 100개씩 매칭되는 상위 corr 100개씩 뽑은 데이터를 json array로 만들어서 데이터를 만들었습니다.
그렇게 semi-DB는 다음과 같이 한번에 뽑을 경우 이렇게 용량이 커서 GitHub page에서 처리를 하기 어려운 상황에 있습니다.

```
-rw-r--r-- 1 root root  56M Nov 16 07:33 DIS_DRG.json
-rw-r--r-- 1 root root  98M Nov 16 07:50 DRG_PROT.json
```

그래서 두 가지 안을 고민중에 있습니다.

2. Choice
2.1 Data spliting
- 데이터를 잘게 쪼개서 4775의 질병 리스트 + 8591개의 약 리스트에서 해당 약을 선택하면 각 샘플에 대한  100개의 상위 상관관계 100개 항목을 동적으로 보여주는 방식
우선 이 부분이 GitHub pages에서 구현이 가능한지, 그리고 제가 2주 내로 구현을 할 수 있는지는 아직 미지수에 있습니다.

2.2 Data undersampling
- 상위 상관관계 10개까지 보여주기
이 부분은 1안을 구현하지 못한 경우 차선책으로 고민하고 있는 부분입니다. 
1. ajax
2. 반응형
3. custom cell data
4. 언어 변경
5. Column별 검색기능
6. 기간 검색
7. 금액 총합 (필터링 된 데이터 가능)
8. CSV 파일로 Export (필터링 된 결과)
9. 약간의 스타일

## [DEMO PAGE IS HERE](https://saintsilver.github.io/datatables-ex/)

- Datatables Example

https://datatables.net/

https://kutar37.tistory.com/entry/Grid-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%ACDatatables-%EC%82%AC%EC%9A%A9%EB%B2%95%EC%98%88%EC%A0%9C

- 구글드라이브를 DB처럼
- http://tlog.tammolo.com/tags/db/
- corr rendering
- https://datatables.net/examples/basic_init/data_rendering.html
- 제이쿼리 데이터만 리로드
- https://dduruddung.tistory.com/entry/%EC%A0%9C%EC%9D%B4%EC%BF%BC%EB%A6%AC-DataTables-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A7%8C-reload
- pymongo
- https://somjang.tistory.com/entry/MongoDB-Python%EA%B3%BC-Pymongo%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%B6%94%EA%B0%80%ED%95%98%EA%B3%A0-%EC%B6%9C%EB%A0%A5%ED%95%B4%EB%B3%B4%EA%B8%B0
