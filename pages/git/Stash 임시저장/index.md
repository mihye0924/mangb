---
author: 조미혜
title: Stash 임시저장
thumbnail: thumbnail.jpg
refer: https://develop-me-z.tistory.com/204
tags: [Git graph, stash]
layout: article
sidebar: false
created: 2025.01.16
avatar: true
---

## 1. git stash란?

git stash는 Working Directory(단 git add 자체가 안된 것은 제외, modified 것은 stash됨)와 Staging Area의 작업물을 임시 저장공간에 저장하는 명령어이다

```
git stash
```

```
git stash save
```

## 2. git stash pop을 이용해 저장된 코드 꺼내기

git stash로 저장된 변경 사항은 다시 git stash pop을 이용해 꺼낼 수 있다. git stash pop을 이용하면 git stash save를 이용해 임시 저장공간에 저장된 파일들이 현재 브랜치의 Working Directory와  Staging Area로 올라온다.

```
git stash pop
```

## 3. git stash apply를 사용해 저장된 코드 안전하게 꺼내기

git stash pop을 사용하면 임시 저장공간에 저장된 파일들이 지워진다. 하지만, 컨플릭이 일어날 것에 대비해서 저장된 변경 사항을 삭제하지 않고 꺼내고 싶을 수 있다. 이때 사용할 수 있는 것이 바로 git stash apply이다.

```
git stash apply
```

git stash apply는 stash된 변경사항을 꺼내면서 임시 저장공간을 삭제하지 않기 때문에 하나의 변경 사항을 다중 브랜치에 적용하고 싶을 때 사용

## 4. git stash apply stash@{[number]} 사용해 특정 스태시 꺼내기

git stash list에서 특정 stash를 꺼내려면 apply 명령어를 사용하면 된다.

```
git stash apply stash@{[number]}
```

## 5. git stash drop stash@{[number]} 사용해 특정 스태시 삭제하기

git stash list에서 특정 stash를 삭제하려면 drop 명령어를 사용하면 된다.

```
git stash drop stash@{[number]}
```
