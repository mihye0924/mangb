---
author: 조미혜
title: 삼성 디버깅
thumbnail: thumbnail.png
refer: https://velog.io/@tmdgus8911/TIL-%ED%81%AC%EB%A1%AC%EC%9C%BC%EB%A1%9C-%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EB%94%94%EB%B0%94%EC%9D%B4%EC%8A%A4-%EB%94%94%EB%B2%84%EA%B9%85
tags: [matter.js]
layout: article
sidebar: false
created: 2024.08.02 10:40:00
avatar: true
---


## 삼성 디버깅 하는 법

1. 휴대폰 설정 변경
디바이스와 PC를 케이블로 연결
설정 > 휴대전화 정보 > 소프트웨어 정보 > 빌드번호 7번터치
설정 > 개발자 옵션 > USB 디버깅을 on
2. chrome
chrome://inspect/#devices
브라우저에 해당 내용을 입력한다.



밑에 디바이스 정보, 브라우저 정보 등등이 뜬다면 성공!

👾 주의
별로 문제 없을것 같은 상황이지만 의외로 케이블 문제가 있었다. 꼭 알맞는 CtoC 케이블을 연결해야지 인식한다.