# 🍿 과제 설명
이번 과제는 오픈 API를 사용해서 영화 검색 사이트를 만드는 것입니다. 

<img width="1306" alt="image" src="https://github.com/Likelion-PNU-FE/React_Movie_Search/assets/80307321/bc1e1f52-837e-4e6f-8bda-4adb50f8bed3">

> 오픈 API란 누구나 사용할 수 있도록 공개된 API 를 의미합니다.

### 사이트
- [참고사이트](https://fedc-4-11-vue-rose.vercel.app)
- [오픈 API 링크](https://omdbapi.com)


### 브랜치 설정 잊지 말기
🚨 지난 과제에서 설명한 [브랜치 설정](https://github.com/Likelion-PNU-FE/React_Basic/blob/main/README.md)에 따라 브랜치를 설정하고 작업해주세요! 🚨

`main` 브랜치는 건드리지 않도록 주의...! 복구작업이 필요하게 될 수도 있어요. 


# 🍿 요구사항

### 기본 요구사항
- [ ]  제목을 통해 영화 목록을 검색할 수 있다.
- [ ]  영화를 페이지별로 조회할 수 있다.
- [ ]  영화 포스터를 클릭하면 상세 페이지를 보여준다.
- [ ]  CSS 를 사용해 스타일링 한다.

### 심화 요구사항
- [ ]  서버로 API 요청을 하는 동안 로딩화면을 보여준다.
- [ ]  vercel 을 사용해 만든 프로젝트를 배포해본다.

# 🍿 주의사항

api를 사용하기 전에 메뉴에 있는 API Key 버튼을 클릭하여 API Key를 발급받아야 합니다. **타인에게 노출되지 않도록 주의해주세요!**

<img width="1240" alt="Untitled" src="https://github.com/Likelion-PNU-FE/React_Movie_Search/assets/80307321/d2c1de7b-7ebf-410a-8f99-26a270411c79">

만일 API Key를 정상적으로 발급받았다면 외부로부터 키를 보호하기 위해 환경 변수를 사용해서 관리합니다.

### 환경 변수 생성

- 폴더 최상단에 `.env` 라는 이름의 파일을 생성합니다.
- 해당 폴더 내에 Key:value 의 형태로 발급받은 키를 저장합니다.
- ❗React 에선 반드시 모든 환경변수에 `REACT_APP` 을 붙여줘야 제대로 동작합니다.
    
    ```jsx
    REACT_APP_API_KEY=발급받은_키
    ```
    

### 환경 변수 사용

- 환경 변수를 사용하고 싶다면 다음과 같이 사용합니다.
    
    ```jsx
    const key = process.env.REACT_APP_API_KEY;
    ```
