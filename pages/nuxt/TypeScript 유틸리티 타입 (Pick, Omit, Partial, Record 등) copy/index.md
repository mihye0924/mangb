---
author: 조미혜
title: TypeScript 유틸리티 타입 (Pick, Omit, Partial, Record 등)
thumbnail: thumbnail.png
refer: 
tags: [nuxt, typescript, pick, omit, partial, record]
layout: article
sidebar: false
created: 2024.10.29 11:15:00
avatar: true
---

## omit이란?
- Omit을 선언한 후 첫 번째 제네릭 타입에 대상 타입을 넘기고, 두 번째 제네릭 타입으로 제외할 속성 이름을 문자열 타입 또는 무자열 유니언 타입으로 선언한다.
- Course 에 지정된 타입(rating, reviewsCount, studentCount)을 무시하고 다시 정의하는 형태이다.

```json
export interface Course {
  title: string;
  subtitle: string;
  courseSlug: string;
  content: string;
  thumbnail: string;
  video: string;
  rating: number;
  reviewsCount: number;
  studentCount: number;
  reviewsUrl: string;
  inflearnUrl: string;
  gymcodingUrl: string;
}

export interface CourseWithPath
  extends Omit<Course, 'rating' | 'reviewsCount' | 'studentCount'> {
  path: string;
  rating: string;
  reviewsCount: string;
  studentCount: string;
}

```