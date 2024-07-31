---
author: 조미혜
title: 원자로, 운영 구분 짓는 코드
thumbnail: thumbnail.png
refer: 
tags: [HCloud, Vue]
layout: article
sidebar: false
created: 2024.07.29 03:48:00
avatar: true
---

## 원자로, 운영 구분 짓는 코드
::: tip
- useDev() 에 있는 deployEnv 으로 구분하여 arc, prd 인지 체크
:::
 
#### 1) html 영역
```js{4}
export default {
  {
    <a
      class="d-flex align-center text-primary-900"
      :href="`${isProduction ? '/console/' : '/'}docs/${locale}/security_group_rule_import_sample.csv`"
    >
      <VIcon icon="download" class="mr-1" />{{ $t('common_import_csv_sample_download') }}</a
    > 
  }
}
``` 

#### 2) js 영역
```js{4}
export default {
    // [DEV] 검수용
  const { deployEnv } = useDev()
  const isProduction = deployEnv.value === 'arc' || deployEnv.value === 'prd' 
}
```