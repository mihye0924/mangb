---
author: 조미혜
title: Google 로그인연동
thumbnail: thumbnail.png
refer: https://velog.io/@mjieun/Next.js-authjsNextAuth%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%9D%B8%EC%A6%9D-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B01-%EA%B5%AC%EA%B8%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A1%B0%EA%B1%B4%EB%B6%80-%EB%9D%BC%EC%9A%B0%ED%8A%B8
tags: [next, js]
layout: article
sidebar: false
created: 2025.03.10
avatar: true
---

## 1. 구글 클라우드 플랫폼에 앱 등록

```
https://console.cloud.google.com/auth/overview?inv=1&invt=Abrnyg&project=chatting-app-453302
```

### 구글 클라우드 플랫폼 계정을 생성하고 설정을 진행해보자.

- 구글 클라우드 플랫폼 > 콘솔 > API 및 서비스 > 사용자 인증 정보 접속

구글 프로젝트 생성 후 생성한 프로젝트로 이동
Project Name : My Next App

![](01.png)

### 구글 프로젝트 생성 후 생성한 프로젝트로 이동

- Project Name : My Next App

![](02.png)
![](03.png)
![](04.png)
![](05.png)

### OAuth 동의 화면 설정

- User Type : 외부 (누구나 구글을 통해 로그인할 수 있는 공개 웹사이트)

![](06.png)

### 앱 등록 수정

- OAuth 동의 화면 - 필수 항목 (앱 이름, 사용자 지원 이메일) 입력

![](07.png)

- 범위 - 저장 후 계속

![](08.png)

- 테스트 사용자 - ADD USERS 버튼 눌러 사용자 지원 이메일 추가

![](09.png)

- 요약 - 내용 확인 후 대시보드로 돌아가기

![](10.png)

### OAuth Client ID 생성

- OAuth ?
  Open Authentication 의 약자로 구글, 페이스북, 트위터 등에서 사용되는 표준 인증 프로토콜
  사용자가 구글을 통해 로그인 하려는 경우, 애플리케이션은 사용자를 구글로 리디렉션하고 이후 구글에서 제공되는 인증 절차를 통해 사용자를 식별
  정상 식별된 경우 애플리케이션에 정상 식별되었다는 응답 전달
- 좌측 사용자 인증 정보 탭에서 OAuth Client ID를 생성해보자.

![](11.png)

- 아래 항목 입력 후 OAuth Client ID 생성
  - 애플리케이션 유형 : 웹 애플리케이션
  - 앱 이름 : My Next App
  - 승인된 자바스크립트 원본 : 프로젝트 루트 경로 ( 여기서는 **`http://localhost:3000`**)
  - 승인된 리디렉션 URI : 구글 인증 리다이렉트 경로
    - For production: **`https://{YOUR_DOMAIN}/api/auth/callback/google`**
    - For development: **`http://localhost:3000/api/auth/callback/google`**

![](12.png)

### 생성된 정보 환경 변수에 추가

![](13.png)

```
.env

GOOGLE_CLIENT_ID="YOUR CLIENT ID"
GOOGLE_CLIENT_SECRET="YOUR CLIENT SECRET"
```
