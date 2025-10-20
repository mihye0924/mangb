---
author: 조미혜
title: Audit > Tooltip 컴포넌트 정의
thumbnail: thumbnail.png
refer: 
tags: [HCloud, Vue]
layout: article
sidebar: false
created: 2024.07.22 05:01:00
avatar: true
---

## Audit > Tooltip 컴포넌트 정의
::: tip
- tooltip 컴포넌트 정의가 안되어 있음 / (열림, 닫기) 기능 추가
:::
 
#### 1) 사용할 테이블
```js{4}
export default {
  {
      title: 'User Name',
      key: 'userName',
      sortable: false,
      control: {
        tag: 'TableContent',
        props: ({ value: name }) => ({
          type: 'auditTooltip',
          prefix: name,
          isLoaded: isCompleted.userInfo[name],
          message: errorMessage.value === '' && userInfo,
          errorMessage: errorMessage.value !== '' && errorMessage.value,
        }),
        events: {
          'click:textInfo': ({ items, item, index, value }) => {
            refetchKeys.userName = value
            userInfoRefetch()
          },
        },
      },
    }, 
}
```

#### 2) 공통 컴포넌트
```js{4}
export default {
  <TextButton
    v-else-if="type === 'auditTooltip'"
    @focus="
      () => {
        emit('click:textInfo')
        isOpen = true
      }
    "
    @blur="isOpen = false"
  >
    <span v-if="prefix">{{ prefix }}</span>
    <div v-if="isLoaded && isOpen" class="c-tooltip tooltip d-inline-block" :class="[`tooltip--neutral-900`, `tooltip--top`]">
      <div class="tooltip__balloon">
        <div class="tooltip__box" />
        <div class="tooltip__text text-neutral-50 text-caption-r">
          <template v-if="errorMessage">{{ errorMessage }}</template>
          <template v-for="(value, key) in message" :key="key">
            <div>{{ key }}: {{ value }}</div>
          </template>
        </div>
      </div>
    </div>
  </TextButton>
}
```