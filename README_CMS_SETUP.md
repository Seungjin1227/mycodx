# MycoDx GitHub Pages CMS 운영 가이드

이 배포본은 **CMS 전용** 구조입니다. 기존 수동 관리자 페이지와 파일 다운로드 방식은 제거했습니다.

## 1. 운영 방식

기본 운영 방식은 Pages CMS입니다.

운영 흐름:

1. GitHub 저장소에 이 폴더 안의 파일을 업로드합니다.
2. GitHub Pages를 활성화합니다.
3. 운영자 GitHub 계정에 저장소 수정 권한을 부여합니다.
4. Pages CMS에 접속해 GitHub 계정으로 로그인합니다.
5. 해당 저장소를 선택합니다.
6. `홈페이지 콘텐츠`에서 뉴스, 게시판, 갤러리를 추가/수정/삭제합니다.
7. 저장하면 CMS가 GitHub 저장소의 `data/content.json`과 `assets/uploads/`를 수정하고, GitHub Pages에 자동 반영됩니다.

## 2. 폴더 구조

```text
/
├─ index.html
├─ news.html
├─ board.html
├─ gallery.html
├─ CNAME
├─ .pages.yml
├─ README.md
├─ README_CMS_SETUP.md
│
├─ admin/
│  ├─ index.html
│  └─ config.yml
│
├─ assets/
│  ├─ images/
│  │  ├─ hero-diagnostic-plates.png
│  │  ├─ logo-full.png
│  │  ├─ logo-horizontal.png
│  │  └─ logo-symbol.png
│  └─ uploads/
│
├─ css/
│  └─ style.css
│
├─ js/
│  └─ content-loader.js
│
└─ data/
   └─ content.json
```

## 3. 각 폴더 역할

| 경로 | 역할 |
|---|---|
| `.pages.yml` | Pages CMS 설정 파일 |
| `data/content.json` | 뉴스, 게시판, 갤러리 데이터 |
| `assets/uploads/` | CMS에서 업로드한 이미지 저장 위치 |
| `assets/images/` | 로고, 히어로 이미지 등 사이트 고정 이미지 |
| `css/style.css` | 전체 디자인 스타일 |
| `js/content-loader.js` | `content.json`을 읽어서 뉴스/게시판/갤러리를 화면에 표시 |
| `admin/` | Decap CMS를 사용할 경우를 위한 CMS 관리자 경로 |

## 4. 콘텐츠 데이터 구조

`data/content.json`은 아래 세 영역으로 구성됩니다.

```json
{
  "news": [],
  "board": [],
  "gallery": []
}
```

### 뉴스 항목

```json
{
  "date": "2026.06.04",
  "title": "뉴스 제목",
  "summary": "뉴스 요약 내용",
  "image": "/assets/uploads/news-image.jpg",
  "visual": "plateImg"
}
```

### 게시판 항목

```json
{
  "label": "Notice",
  "category": "notice",
  "title": "게시글 제목",
  "date": "2026.06.04",
  "url": "#"
}
```

### 갤러리 항목

```json
{
  "title": "사진 제목",
  "image": "/assets/uploads/photo.jpg",
  "visual": "plateImg"
}
```

이미지를 넣지 않으면 `visual` 값에 따라 기본 그래픽이 표시됩니다.

사용 가능한 `visual` 값:

```text
plateImg
screenImg
tubeImg
researchThumb
```

## 5. 배포 전 체크리스트

- [ ] `.pages.yml`이 저장소 루트에 있는지 확인
- [ ] `data/content.json`이 존재하는지 확인
- [ ] `assets/uploads/` 폴더가 존재하는지 확인
- [ ] GitHub Pages Source가 `main` 브랜치/root 또는 현재 배포 브랜치로 설정되어 있는지 확인
- [ ] 운영자 GitHub 계정에 저장소 write 권한이 있는지 확인
- [ ] `CNAME` 값이 실제 연결할 도메인과 맞는지 확인

현재 CNAME:

```text
mycodx.com
```
