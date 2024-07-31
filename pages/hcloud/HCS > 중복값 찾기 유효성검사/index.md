---
author: 조미혜
title: HCS > 중복값 찾기 유효성검사
thumbnail: thumbnail.png
refer: 
tags: [HCloud, Vue]
layout: article
sidebar: false
created: 2024.07.22 05:01:00
avatar: true
---

## HCS > 중복값 찾기 유효성검사
::: tip
- 배열안의 객체 순서가 바뀌기 때문에 깊게 검사를 해야함
:::
 
#### 1) 사용할 테이블
```js{4}
export default {
   {
      id: 'item4',
      code: useDirective(() => {
        const updatedArr = tableRules.items.map((item) => {
          if (item.protocolType === 'ICMP' || item.protocolType === 'Custom Protocol') {
            return {
              ...item,
              delete: '',
              portRange: '-',
              direction: item.direction,
            }
          } else {
            return {
              ...item,
              delete: '',
              portRange: /-/.test(item.portRange) ? item.portRange : Number(item.portRange),
              direction: item.direction,
            }
          }
        })
        const filterdArr = updatedArr.map(({ portRangeDisabled, protocolDisabled, _dynamic, _initial, ...value }) => value)

        //깊게 동일한지 검사하기
        const deepEqual = (obj1, obj2) => {
          if (obj1 === obj2) return true
          if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false
          const keys1 = Object.keys(obj1)
          const keys2 = Object.keys(obj2)
          if (keys1.length !== keys2.length) return false
          for (const key of keys1) {
            if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
              return false
            }
          }
          return true
        }

        function isArrayUnique(arr) {
          return arr.every((item, index) => !arr.find((otherItem, otherIndex) => otherIndex !== index && deepEqual(item, otherItem)))
        }

        const result = isArrayUnique(filterdArr)
        return result
      }, true),
      message: t('hcs_error_duplicated_rule'),
    },
}
```